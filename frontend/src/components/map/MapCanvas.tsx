import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, MapPin } from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';
import { INITIAL_LANDMARKS } from '../../data/mockData';

export const MapCanvas: React.FC = () => {
  const {
    filterLayers,
    selectedTrail,
    selectedDestination,
    selectDestination,
    activeView,
    activeDivision,
    flyToTarget,
    isDrawerOpen,
    openDrawer,
  } = useMapStore();

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Coordinates normalized to SVG Canvas viewBox (width: 1000, height: 1000)
  // Bangladesh bounding box roughly: Longitude 88.0°E to 92.7°E, Latitude 20.5°N to 26.7°N
  const geoToSvg = (lng: number, lat: number) => {
    const minLng = 88.0;
    const maxLng = 92.7;
    const minLat = 20.5;
    const maxLat = 26.7;

    const x = ((lng - minLng) / (maxLng - minLng)) * 820 + 90;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 820 + 90;
    return { x, y };
  };

  // Sync with flyToTarget from store (when user clicks division, 'TAKE ME SOMEWHERE', or search result)
  useEffect(() => {
    if (!flyToTarget) return;

    const { longitude, latitude, zoom: targetZoomLevel } = flyToTarget;
    const { x, y } = geoToSvg(longitude, latitude);

    // Calculate pan offset to center target (x, y) on the 1000x1000 SVG viewport
    const scale = Math.min(Math.max((targetZoomLevel / 7.2) * 1.05, 1.1), 2.8);
    const targetPanX = (500 - x) * scale * 0.45;
    const targetPanY = (500 - y) * scale * 0.45;

    setZoom(scale);
    setPan({ x: targetPanX, y: targetPanY });
  }, [flyToTarget]);

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

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    const maxPan = 550 * zoom;
    const newX = Math.min(Math.max(e.clientX - startPan.x, -maxPan), maxPan);
    const newY = Math.min(Math.max(e.clientY - startPan.y, -maxPan), maxPan);
    setPan({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Touch handlers for tablets and mobile devices with Pinch-to-Zoom
  const [pinchDist, setPinchDist] = useState<number | null>(null);
  const [pinchZoomStart, setPinchZoomStart] = useState(1);

  const getDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsPanning(true);
      const touch = e.touches[0];
      setStartPan({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
    } else if (e.touches.length === 2) {
      setIsPanning(false);
      setPinchDist(getDistance(e.touches));
      setPinchZoomStart(zoom);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isPanning) {
      const touch = e.touches[0];
      const maxPan = 550 * zoom;
      const newX = Math.min(Math.max(touch.clientX - startPan.x, -maxPan), maxPan);
      const newY = Math.min(Math.max(touch.clientY - startPan.y, -maxPan), maxPan);
      setPan({ x: newX, y: newY });
    } else if (e.touches.length === 2 && pinchDist !== null) {
      const currentDist = getDistance(e.touches);
      if (currentDist > 0 && pinchDist > 0) {
        const factor = currentDist / pinchDist;
        const newZoom = Math.min(Math.max(pinchZoomStart * factor, 0.8), 3.2);
        setZoom(newZoom);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
    setPinchDist(null);
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.18 : -0.18;
    setZoom((prev) => Math.min(Math.max(prev + zoomDelta, 0.8), 3.2));
  };

  const resetViewport = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-[#d6e5d8] overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      role="region"
      aria-label="Interactive Map of Bangladesh"
    >
      {/* Topographic Map Surface SVG Canvas */}
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-full object-cover transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center center',
        }}
      >
        <defs>
          {/* Subtle terrain gradient */}
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e5efe6" />
            <stop offset="50%" stopColor="#dcebde" />
            <stop offset="100%" stopColor="#d0e3d2" />
          </linearGradient>

          {/* Bay of Bengal gradient */}
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b4d5e8" />
            <stop offset="100%" stopColor="#a3cae0" />
          </linearGradient>

          {/* Mangrove pattern for Sundarbans */}
          <pattern id="mangrovePattern" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="2" fill="#7fa886" opacity="0.6" />
          </pattern>

          {/* Glowing Beacon Filters */}
          <filter id="glow-emerald" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ocean / Bay of Bengal Base Water */}
        <rect width="1000" height="1000" fill="url(#waterGradient)" />

        {/* Bangladesh Mainland Landmass Silhouette */}
        <path
          d="
            M 280 80
            C 340 70, 480 80, 520 90
            C 560 110, 680 120, 720 180
            C 760 220, 840 260, 820 340
            C 810 390, 760 420, 750 480
            C 740 540, 820 620, 850 720
            C 870 790, 840 880, 810 920
            C 760 880, 720 810, 680 780
            C 640 760, 620 790, 580 810
            C 520 830, 440 840, 380 820
            C 320 800, 240 750, 210 680
            C 180 620, 190 540, 220 480
            C 240 430, 210 360, 200 300
            C 190 230, 220 120, 280 80
            Z
          "
          fill="url(#landGradient)"
          stroke="#b2ceb6"
          strokeWidth="3"
        />

        {/* Sundarbans Mangrove Region Coastal Deltas */}
        <path
          d="
            M 240 740
            C 290 750, 360 760, 410 760
            C 440 790, 460 830, 420 840
            C 370 850, 310 830, 260 800
            Z
          "
          fill="#a4caa9"
          stroke="#8cb592"
          strokeWidth="1.5"
        />
        <path
          d="
            M 250 750
            C 300 760, 370 770, 420 770
            C 410 810, 360 820, 280 790
            Z
          "
          fill="url(#mangrovePattern)"
        />

        {/* Major Rivers (Jamuna, Padma, Meghna, Surma) */}
        <path
          d="M 380 90 Q 420 240 450 350 Q 470 420 490 470"
          fill="none"
          stroke="#aed1e5"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 210 490 Q 350 480 490 470 Q 570 510 620 570 Q 660 650 670 770"
          fill="none"
          stroke="#aed1e5"
          strokeWidth="15"
          strokeLinecap="round"
        />
        <path
          d="M 680 200 Q 660 320 620 440 Q 600 510 620 570"
          fill="none"
          stroke="#aed1e5"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Geographic labels */}
        <text
          x="460"
          y="795"
          fill="#58859e"
          fontSize="13"
          fontFamily="system-ui"
          fontWeight="600"
          letterSpacing="2"
          opacity="0.75"
        >
          Padma river
        </text>

        <text
          x="300"
          y="785"
          fill="#3b6946"
          fontSize="12"
          fontFamily="system-ui"
          fontWeight="700"
          letterSpacing="1"
          opacity="0.8"
        >
          Sundarbans
        </text>

        {/* Active Connected Thematic Trail or Planner Route */}
        {(selectedTrail || activeView === 'planner') && (
          <g>
            <path
              d={
                selectedTrail === 'buddhist'
                  ? 'M 290 185 Q 320 230 346 275 Q 380 285 415 290 Q 370 340 325 385'
                  : selectedTrail === 'sylhet'
                  ? 'M 665 395 Q 680 340 695 280 Q 740 420 765 545'
                  : selectedTrail === 'sundarbans'
                  ? 'M 472 650 Q 420 720 370 780 Q 450 795 535 805'
                  : 'M 515 478 Q 630 360 765 240 Q 770 450 820 660'
              }
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="8 8"
              className="trail-animated"
              opacity="0.9"
            />
            {/* Glowing route dots */}
            {(selectedTrail === 'buddhist'
              ? [{ x: 290, y: 185, label: 'Kantajew' }, { x: 346, y: 275, label: 'Paharpur' }, { x: 415, y: 290, label: 'Mahasthan' }, { x: 325, y: 385, label: 'Puthiya' }]
              : selectedTrail === 'sylhet'
              ? [{ x: 665, y: 395, label: 'Sreemangal' }, { x: 695, y: 280, label: 'Ratargul' }, { x: 765, y: 545, label: 'Jaflong' }]
              : selectedTrail === 'sundarbans'
              ? [{ x: 472, y: 650, label: 'Bagerhat' }, { x: 370, y: 780, label: 'Kotka' }, { x: 535, y: 805, label: 'Dublar Char' }]
              : [
                  { x: 515, y: 478, label: 'Ahsan Manzil' },
                  { x: 575, y: 420, label: 'Sonargaon' },
                  { x: 640, y: 350, label: 'Lalbagh' },
                  { x: 710, y: 290, label: 'Mainamati' },
                  { x: 765, y: 240, label: 'Chittagong' },
                ]
            ).map((pt, idx) => (
              <g key={idx} transform={`translate(${pt.x}, ${pt.y})`}>
                <circle
                  r="6"
                  fill="#ffffff"
                  stroke="#10b981"
                  strokeWidth="3"
                  filter="url(#glow-emerald)"
                />
                <circle r="2.5" fill="#059669" />
              </g>
            ))}
          </g>
        )}

        {/* Interactive Custom Glowing Landmark Pin Beacons */}
        {visibleLandmarks.map((item) => {
          const { x, y } = geoToSvg(item.longitude, item.latitude);
          const isSelected = selectedDestination?.id === item.id;
          const isAhsanManzil = item.id === 'poi-ahsan-manzil';
          const isUnesco = item.heritageDetail?.unescoStatus === 'WORLD_HERITAGE_SITE';
          const isNature = item.categoryType === 'NATURE';
          const isHeritage = item.categoryType === 'HERITAGE';

          let auraColor = '#38bdf8';
          let strokeColor = '#0284c7';
          let pinColor = '#0284c7';
          let glowFilter = 'url(#glow-emerald)';

          if (isAhsanManzil) {
            auraColor = '#c084fc';
            strokeColor = '#a855f7';
            pinColor = '#9333ea';
            glowFilter = 'url(#glow-purple)';
          } else if (isUnesco) {
            auraColor = '#fbbf24';
            strokeColor = '#d97706';
            pinColor = '#b45309';
            glowFilter = 'url(#glow-gold)';
          } else if (isNature) {
            auraColor = '#34d399';
            strokeColor = '#10b981';
            pinColor = '#059669';
            glowFilter = 'url(#glow-emerald)';
          } else if (isHeritage) {
            auraColor = '#fb923c';
            strokeColor = '#ea580c';
            pinColor = '#c2410c';
            glowFilter = 'url(#glow-gold)';
          }

          return (
            <g
              key={item.id}
              transform={`translate(${x}, ${y})`}
              className="cursor-pointer group"
              onClick={() => selectDestination(item)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.name}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  selectDestination(item);
                }
              }}
            >
              {/* Outer Pulsing Aura Ring */}
              <circle
                r={isSelected ? '28' : '20'}
                fill={auraColor}
                opacity={isSelected ? '0.45' : '0.2'}
                className={isSelected ? 'animate-ping' : ''}
              />

              {/* Glowing Inner Halo */}
              <circle
                r={isSelected ? '18' : '14'}
                fill="#ffffff"
                stroke={strokeColor}
                strokeWidth={isSelected ? '3.5' : '2'}
                filter={glowFilter}
                className="transition-transform group-hover:scale-125"
              />

              {/* Center Beacon Icon Pin */}
              <circle
                r="8"
                fill={pinColor}
              />

              {/* Tooltip on Hover */}
              <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                <rect
                  x="-75"
                  y="-46"
                  width="150"
                  height="34"
                  rx="17"
                  fill="#0f172a"
                  opacity="0.95"
                />
                <text
                  x="0"
                  y="-31"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {item.name}
                </text>
                <text
                  x="0"
                  y="-19"
                  textAnchor="middle"
                  fill="#34d399"
                  fontSize="8.5"
                  fontFamily="system-ui"
                  fontWeight="600"
                >
                  {item.district?.name || 'Bangladesh'} {item.bnName ? `· ${item.bnName}` : ''}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* Map Attribution Brand Label - Centered at bottom */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-600 font-semibold bg-white/80 px-3.5 py-1 rounded-full border border-white/90 shadow-md pointer-events-none backdrop-blur-md whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <span>ExploreBD Geospatial Surface · WGS84</span>
      </div>

      {/* Floating Re-Open Drawer Button (Shown if drawer is closed but landmark is selected) */}
      {!isDrawerOpen && selectedDestination && activeView === 'explore' && (
        <button
          onClick={openDrawer}
          className="absolute bottom-3 sm:bottom-4 right-3 sm:right-5 z-20 glass-panel px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-xl flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-slate-800 hover:scale-105 transition-all cursor-pointer pointer-events-auto border border-emerald-400/40"
          title="Open Selected Landmark Details"
        >
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
          <span className="truncate max-w-[160px] sm:max-w-none">View {selectedDestination.name}</span>
        </button>
      )}

      {/* Floating Map Zoom / Reset Controls (Bottom Left) */}
      <div className="absolute bottom-4 left-3 sm:left-5 z-20 flex flex-col gap-1 sm:gap-1.5 glass-panel p-1 sm:p-1.5 rounded-2xl shadow-xl pointer-events-auto border border-white/80">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.3, 3.2))}
          className="p-1.5 sm:p-2 rounded-xl text-slate-700 hover:bg-white hover:text-emerald-700 transition-colors cursor-pointer"
          title="Zoom in"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.3, 0.8))}
          className="p-1.5 sm:p-2 rounded-xl text-slate-700 hover:bg-white hover:text-emerald-700 transition-colors cursor-pointer"
          title="Zoom out"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={resetViewport}
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
