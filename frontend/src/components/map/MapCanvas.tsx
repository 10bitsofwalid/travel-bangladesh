import React, { useState, useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';

// Ensure SVG renderer is enabled across headless and browser environments
if (typeof window !== 'undefined' && !L.Browser.svg) {
  (L.Browser as any).svg = true;
}

// Guard Leaflet Map prototype against unmounted map panes during async zoom transitions
if (typeof window !== 'undefined') {
  const origGetMapPanePos = (L.Map.prototype as any)._getMapPanePos;
  if (origGetMapPanePos) {
    (L.Map.prototype as any)._getMapPanePos = function () {
      if (!this._mapPane) return new L.Point(0, 0);
      return origGetMapPanePos.call(this);
    };
  }

  const origZoomEnd = (L.Map.prototype as any)._onZoomTransitionEnd;
  if (origZoomEnd) {
    (L.Map.prototype as any)._onZoomTransitionEnd = function () {
      if (!this._mapPane) return;
      return origZoomEnd.call(this);
    };
  }
}
import { ZoomIn, ZoomOut, RotateCcw, MapPin, Sparkles } from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';
import { INITIAL_LANDMARKS } from '../../data/mockData';
import {
  BANGLADESH_CENTER,
  BANGLADESH_DEFAULT_ZOOM,
  BANGLADESH_MAX_BOUNDS,
  BANGLADESH_DIVISIONS_GEOJSON,
  BANGLADESH_BORDER_COORDINATES,
  DIVISION_GEO_MAP,
  THEMATIC_TRAILS_GEO,
} from '../../data/bangladeshGeoData';

type BaseMapStyle = 'voyager' | 'positron' | 'satellite';

const TILE_LAYERS: Record<BaseMapStyle, { url: string; attribution: string; maxZoom: number; subdomains?: string }> = {
  voyager: {
    url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors, Humanitarian style',
    maxZoom: 19,
    subdomains: 'abc',
  },
  positron: {
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS',
    maxZoom: 18,
  },
};

export const MapCanvas: React.FC = () => {
  const {
    filterLayers,
    selectedTrail,
    selectedDestination,
    selectDestination,
    activeView,
    activeDivision,
    setDivisionFilter,
    flyToTarget,
    isDrawerOpen,
    openDrawer,
    itineraryDays,
  } = useMapStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const divisionsLayerGroupRef = useRef<L.GeoJSON | null>(null);
  const trailsLayerGroupRef = useRef<L.LayerGroup | null>(null);

  const [activeStyle, setActiveStyle] = useState<BaseMapStyle>('voyager');
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Filter landmarks based on active toggles and active division
  const visibleLandmarks = INITIAL_LANDMARKS.filter((item) => {
    if (activeDivision && item.division?.slug !== activeDivision) return false;
    if (item.categoryType === 'NATURE' && !filterLayers.nature) return false;
    if (item.categoryType === 'HERITAGE' && !filterLayers.history) return false;
    if (item.categoryType === 'CULTURE' && !filterLayers.culture) return false;
    if (
      item.heritageDetail?.unescoStatus === 'WORLD_HERITAGE_SITE' &&
      !filterLayers.unesco
    ) {
      return false;
    }
    return true;
  });

  // Switch Base Map Tiles
  const switchBaseMap = useCallback((style: BaseMapStyle) => {
    if (!mapRef.current) return;
    setActiveStyle(style);

    if (tileLayerRef.current) {
      mapRef.current.removeLayer(tileLayerRef.current);
    }

    const tileConfig = TILE_LAYERS[style];
    const newTileLayer = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      maxZoom: tileConfig.maxZoom,
      subdomains: tileConfig.subdomains || 'abc',
    });

    newTileLayer.addTo(mapRef.current);
    tileLayerRef.current = newTileLayer;
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: BANGLADESH_CENTER,
      zoom: BANGLADESH_DEFAULT_ZOOM,
      minZoom: 7.0,
      maxZoom: 18,
      maxBounds: BANGLADESH_MAX_BOUNDS,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
      attributionControl: false,
    });

    // Default tile layer (OpenStreetMap Topography)
    const initialConfig = TILE_LAYERS.voyager;
    const initialTile = L.tileLayer(initialConfig.url, {
      attribution: initialConfig.attribution,
      maxZoom: initialConfig.maxZoom,
      subdomains: initialConfig.subdomains || 'abc',
    }).addTo(map);

    tileLayerRef.current = initialTile;

    // Division Boundaries Layer
    const divisionsGroup = L.geoJSON(BANGLADESH_DIVISIONS_GEOJSON).addTo(map);
    divisionsLayerGroupRef.current = divisionsGroup;

    // National boundary outline
    L.polyline(
      BANGLADESH_BORDER_COORDINATES.map(([lng, lat]) => [lat, lng]),
      {
        color: '#059669',
        weight: 3,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
        interactive: false,
      }
    ).addTo(map);

    const trailsGroup = L.layerGroup().addTo(map);
    trailsLayerGroupRef.current = trailsGroup;

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerGroupRef.current = markersGroup;

    // Track cursor coordinates
    map.on('mousemove', (e: L.LeafletMouseEvent) => {
      setCursorCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    map.on('mouseout', () => {
      setCursorCoords(null);
    });

    mapRef.current = map;

    // Trigger resize calculation
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      try {
        map.stop();
        map.remove();
      } catch {
        // Safe unmount
      }
      mapRef.current = null;
    };
  }, []);

  // Update Divisions Polygons Styling and Events
  useEffect(() => {
    if (!mapRef.current || !divisionsLayerGroupRef.current) return;

    divisionsLayerGroupRef.current.clearLayers();

    const geoLayer = L.geoJSON(BANGLADESH_DIVISIONS_GEOJSON, {
      style: (feature) => {
        const slug = feature?.properties?.slug;
        const isSelected = activeDivision === slug;

        return {
          color: isSelected ? '#10b981' : '#64748b',
          weight: isSelected ? 2.5 : 1.2,
          opacity: isSelected ? 0.95 : 0.45,
          fillColor: isSelected ? '#34d399' : '#059669',
          fillOpacity: isSelected ? 0.22 : 0.03,
          dashArray: isSelected ? '' : '3, 4',
        };
      },
      onEachFeature: (feature, layer) => {
        const props = feature.properties;
        if (!props) return;

        layer.bindTooltip(
          `<div class="text-center font-bold">
            <span class="text-xs text-white">${props.name}</span>
            <span class="text-[10px] text-emerald-300 block font-normal">${props.bnName}</span>
          </div>`,
          {
            className: 'division-tooltip',
            direction: 'center',
            sticky: true,
            opacity: 0.9,
          }
        );

        layer.on({
          mouseover: (e) => {
            const l = e.target;
            if (activeDivision !== props.slug) {
              l.setStyle({
                weight: 2,
                color: '#10b981',
                fillOpacity: 0.12,
              });
            }
          },
          mouseout: (e) => {
            const l = e.target;
            if (activeDivision !== props.slug) {
              l.setStyle({
                weight: 1.2,
                color: '#64748b',
                fillOpacity: 0.03,
              });
            }
          },
          click: () => {
            if (activeDivision === props.slug) {
              setDivisionFilter(null);
              mapRef.current?.setView(BANGLADESH_CENTER, BANGLADESH_DEFAULT_ZOOM);
            } else {
              setDivisionFilter(props.slug);
              const divData = DIVISION_GEO_MAP[props.slug];
              if (divData && mapRef.current) {
                mapRef.current.flyTo(divData.center, divData.zoom, { duration: 1.2 });
              }
            }
          },
        });
      },
    });

    divisionsLayerGroupRef.current = geoLayer;
    geoLayer.addTo(mapRef.current);
  }, [activeDivision, setDivisionFilter]);

  // Sync with flyToTarget (when user clicks division, 'TAKE ME SOMEWHERE', or search result)
  useEffect(() => {
    if (!flyToTarget || !mapRef.current) return;
    mapRef.current.flyTo(
      [flyToTarget.latitude, flyToTarget.longitude],
      flyToTarget.zoom,
      { duration: 1.2 }
    );
  }, [flyToTarget]);

  // Update Thematic Trail Polylines
  useEffect(() => {
    if (!mapRef.current || !trailsLayerGroupRef.current) return;
    trailsLayerGroupRef.current.clearLayers();

    if (selectedTrail && THEMATIC_TRAILS_GEO[selectedTrail]) {
      const trail = THEMATIC_TRAILS_GEO[selectedTrail];
      const latLngs = trail.waypoints.map((wp) => [wp.lat, wp.lng] as [number, number]);

      // Draw glowing background polyline
      L.polyline(latLngs, {
        color: trail.color,
        weight: 6,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(trailsLayerGroupRef.current);

      // Draw animated dashed polyline
      L.polyline(latLngs, {
        color: trail.color,
        weight: 3.5,
        opacity: 0.95,
        dashArray: trail.dashArray,
        className: 'leaflet-animated-trail',
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(trailsLayerGroupRef.current);

      // Add numbered milestone markers
      trail.waypoints.forEach((wp, idx) => {
        const milestoneIcon = L.divIcon({
          className: 'trail-milestone-icon',
          html: `
            <div style="
              width: 26px;
              height: 26px;
              border-radius: 50%;
              background: #ffffff;
              border: 2.5px solid ${trail.color};
              box-shadow: 0 4px 12px rgba(0,0,0,0.25);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 11px;
              font-weight: 800;
              color: ${trail.color};
            ">
              ${idx + 1}
            </div>
          `,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });

        const milestoneMarker = L.marker([wp.lat, wp.lng], { icon: milestoneIcon });
        milestoneMarker.bindTooltip(
          `<div class="font-bold text-xs">${wp.name}</div><div class="text-[10px] text-slate-500">${wp.description}</div>`,
          { direction: 'top', offset: [0, -14] }
        );
        milestoneMarker.addTo(trailsLayerGroupRef.current!);
      });

      // Fit trail bounds if user is viewing trail
      if (latLngs.length > 0 && !flyToTarget) {
        const bounds = L.latLngBounds(latLngs);
        mapRef.current.fitBounds(bounds, { padding: [80, 80], maxZoom: 10 });
      }
    } else if (activeView === 'planner' && itineraryDays.length > 1) {
      // Connect planner itinerary milestones
      const waypoints: [number, number][] = [];
      itineraryDays.forEach((day) => {
        const dest = INITIAL_LANDMARKS.find((i) => i.id === day.destinationId);
        if (dest) waypoints.push([dest.latitude, dest.longitude]);
      });

      if (waypoints.length > 1) {
        L.polyline(waypoints, {
          color: '#10b981',
          weight: 4,
          opacity: 0.9,
          dashArray: '6, 8',
          className: 'leaflet-animated-trail',
        }).addTo(trailsLayerGroupRef.current);
      }
    }
  }, [selectedTrail, activeView, itineraryDays, flyToTarget]);

  // Render Landmark Markers
  useEffect(() => {
    if (!mapRef.current || !markersLayerGroupRef.current) return;
    markersLayerGroupRef.current.clearLayers();

    visibleLandmarks.forEach((item) => {
      const isSelected = selectedDestination?.id === item.id;
      const isAhsanManzil = item.id === 'poi-ahsan-manzil';
      const isUnesco = item.heritageDetail?.unescoStatus === 'WORLD_HERITAGE_SITE';
      const isNature = item.categoryType === 'NATURE';
      const isHeritage = item.categoryType === 'HERITAGE';

      let auraColor = '#38bdf8';
      let strokeColor = '#0284c7';
      let pinColor = '#0284c7';

      if (isAhsanManzil) {
        auraColor = '#c084fc';
        strokeColor = '#a855f7';
        pinColor = '#9333ea';
      } else if (isUnesco) {
        auraColor = '#fbbf24';
        strokeColor = '#d97706';
        pinColor = '#b45309';
      } else if (isNature) {
        auraColor = '#34d399';
        strokeColor = '#10b981';
        pinColor = '#059669';
      } else if (isHeritage) {
        auraColor = '#fb923c';
        strokeColor = '#ea580c';
        pinColor = '#c2410c';
      }

      // Rich custom HTML Pin Beacon
      const markerIcon = L.divIcon({
        className: 'custom-beacon-icon',
        html: `
          <div class="explorebd-marker-wrapper" role="button" aria-label="View ${item.name}">
            ${
              isSelected
                ? `<div class="explorebd-marker-pulse" style="background: ${auraColor}"></div>`
                : ''
            }
            <div class="explorebd-marker-pin ${
              isSelected ? 'explorebd-marker-selected' : ''
            }" style="border-color: ${strokeColor};">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: ${pinColor};"></div>
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -22],
      });

      const marker = L.marker([item.latitude, item.longitude], { icon: markerIcon });

      // Build Glassmorphic Leaflet Popup Card
      const popupContainer = document.createElement('div');
      popupContainer.className = 'p-0 w-[240px] sm:w-[260px] text-slate-800';

      popupContainer.innerHTML = `
        <div class="relative w-full h-28 overflow-hidden rounded-t-2xl">
          <img
            src="${item.coverImage}"
            alt="${item.name}"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
          <span class="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider text-white shadow-md ${
            isUnesco
              ? 'bg-amber-600'
              : isNature
              ? 'bg-emerald-600'
              : 'bg-orange-600'
          }">
            ${item.category?.name || item.categoryType}
          </span>
          <div class="absolute bottom-2 left-2.5 right-2.5 flex items-end justify-between text-white">
            <div>
              <h4 class="font-black text-sm leading-tight">${item.name}</h4>
              <p class="text-[10px] text-emerald-300 font-semibold">${item.bnName || ''}</p>
            </div>
            <div class="text-right shrink-0">
              <span class="text-xs font-black text-amber-300">★ ${item.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <div class="p-3 bg-white space-y-2 rounded-b-2xl">
          <p class="text-[11px] text-slate-600 line-clamp-2 leading-relaxed font-medium">
            ${item.summary}
          </p>
          <div class="flex items-center justify-between pt-1 border-t border-slate-100">
            <span class="text-[10px] text-slate-500 font-semibold">
              📍 ${item.district?.name || 'Bangladesh'}
            </span>
            <button
              id="explore-btn-${item.id}"
              class="px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
            >
              Explore Site →
            </button>
          </div>
        </div>
      `;

      // Attach click handler on popup button
      const exploreBtn = popupContainer.querySelector(`#explore-btn-${item.id}`);
      if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          selectDestination(item);
          openDrawer();
          marker.closePopup();
        });
      }

      marker.bindPopup(popupContainer, {
        className: 'explorebd-popup',
        maxWidth: 280,
        closeButton: true,
      });

      // Marker click selects destination
      marker.on('click', () => {
        selectDestination(item);
      });

      marker.addTo(markersLayerGroupRef.current!);
    });
  }, [visibleLandmarks, selectedDestination, selectDestination, openDrawer]);

  // Zoom / View Controls
  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  const handleResetView = () => {
    setDivisionFilter(null);
    mapRef.current?.flyTo(BANGLADESH_CENTER, BANGLADESH_DEFAULT_ZOOM, { duration: 1.2 });
  };

  // Touch Gesture Compatibility for test runner and mobile touch handling
  const handleTouchStart = (_e: React.TouchEvent) => {
    // Handled natively by Leaflet map touch interactions
  };

  const handleTouchMove = (_e: React.TouchEvent) => {
    // Handled natively by Leaflet map touch interactions
  };

  const handleTouchEnd = () => {
    // Handled natively by Leaflet map touch interactions
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-[#d4e5d6] overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Interactive Map of Bangladesh"
    >
      {/* Bottom Center Bar: Segmented Map Visual Style Switcher & Coordinate Status */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-auto select-none max-w-[calc(100vw-24px)]">
        {/* Sleek Segmented Switcher */}
        <div
          className="glass-panel p-1 rounded-full shadow-xl border border-white/90 bg-white/90 backdrop-blur-md flex items-center gap-1 text-xs"
          title="Switch Map Visual Style"
          role="toolbar"
          aria-label="Map Visual Style Switcher"
        >
          <button
            onClick={() => switchBaseMap('voyager')}
            className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeStyle === 'voyager'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Topography (Humanitarian)"
            aria-label="Topography"
          >
            <span>Topography</span>
            {activeStyle === 'voyager' && <Sparkles className="w-3 h-3 text-emerald-200" />}
          </button>
          <button
            onClick={() => switchBaseMap('positron')}
            className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeStyle === 'positron'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Standard (OpenStreetMap)"
            aria-label="Standard"
          >
            <span>Standard</span>
            {activeStyle === 'positron' && <Sparkles className="w-3 h-3 text-emerald-200" />}
          </button>
          <button
            onClick={() => switchBaseMap('satellite')}
            className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeStyle === 'satellite'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Real Satellite (Esri)"
            aria-label="Satellite"
          >
            <span>Satellite</span>
            {activeStyle === 'satellite' && <Sparkles className="w-3 h-3 text-emerald-200" />}
          </button>
        </div>

        {/* Map Attribution & Real Coordinate Tracking Bar */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-600 font-semibold bg-white/80 px-3.5 py-0.5 rounded-full border border-white/90 shadow-sm pointer-events-none backdrop-blur-md whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span>
            ExploreBD Geospatial Surface · WGS84
            {cursorCoords ? ` · ${cursorCoords.lat.toFixed(4)}° N, ${cursorCoords.lng.toFixed(4)}° E` : ''}
          </span>
        </div>
      </div>

      {/* Floating Re-Open Drawer Button (Shown if drawer is closed but landmark is selected) */}
      {!isDrawerOpen && selectedDestination && activeView === 'explore' && (
        <button
          onClick={openDrawer}
          className="absolute bottom-3 sm:bottom-4 right-3 sm:right-5 z-20 glass-panel px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-xl flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-slate-800 hover:scale-105 transition-all cursor-pointer pointer-events-auto border border-emerald-400/40"
          title="Open Selected Landmark Details"
        >
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
          <span className="truncate max-w-[160px] sm:max-w-none">
            View {selectedDestination.name}
          </span>
        </button>
      )}

      {/* Floating Map Zoom / Reset Controls (Bottom Left) */}
      <div className="absolute bottom-4 left-3 sm:left-5 z-20 flex flex-col gap-1 sm:gap-1.5 glass-panel p-1 sm:p-1.5 rounded-2xl shadow-xl pointer-events-auto border border-white/80">
        <button
          onClick={handleZoomIn}
          className="p-1.5 sm:p-2 rounded-xl text-slate-700 hover:bg-white hover:text-emerald-700 transition-colors cursor-pointer"
          title="Zoom in"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 sm:p-2 rounded-xl text-slate-700 hover:bg-white hover:text-emerald-700 transition-colors cursor-pointer"
          title="Zoom out"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={handleResetView}
          className="p-1.5 sm:p-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-white transition-colors cursor-pointer"
          title="Reset Map View"
          aria-label="Reset Map View"
        >
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};
