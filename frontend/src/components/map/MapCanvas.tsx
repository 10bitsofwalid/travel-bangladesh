import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapPin, ZoomIn, ZoomOut, RotateCcw, Trees, Landmark } from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';
import { Destination } from '../../types';

// Curated seed landmarks across Bangladesh for initial exploration
const INITIAL_LANDMARKS: Destination[] = [
  {
    id: 'poi-sajek',
    name: 'Sajek Valley',
    bnName: 'সাজেক ভ্যালি',
    slug: 'sajek-valley',
    summary: 'The Queen of Hills nestled in Rangamati, floating above clouds with breathtaking mountain vistas.',
    description: 'Sajek Valley is an all-season getaway known for its scenic hills, cloud-kissed cottages, and indigenous tribal culture.',
    divisionId: 'div-chittagong',
    districtId: 'dist-rangamati',
    categoryId: 'cat-hills',
    latitude: 23.3820,
    longitude: 92.2938,
    elevation: 550,
    coverImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    bestTimeToVisit: 'September to February (Cloud season)',
    difficulty: 'EASY',
    isFeatured: true,
    division: { id: 'div-chittagong', name: 'Chittagong', bnName: 'চট্টগ্রাম', slug: 'chittagong', latitude: 22.3569, longitude: 91.8325 },
    district: { id: 'dist-rangamati', divisionId: 'div-chittagong', name: 'Rangamati', bnName: 'রাঙ্গামাটি', slug: 'rangamati', latitude: 22.6533, longitude: 92.1789 },
  },
  {
    id: 'poi-paharpur',
    name: 'Somapura Mahavihara',
    bnName: 'সোমপুর মহাবিহার (পাহাড়পুর)',
    slug: 'somapura-mahavihara-paharpur',
    summary: '8th-century UNESCO World Heritage Buddhist monastic complex founded by King Dharmapala.',
    description: 'One of the most important archaeological sites in South Asia, featuring a grand central stupa and 177 monastic cells.',
    divisionId: 'div-rajshahi',
    districtId: 'dist-naogaon',
    categoryId: 'cat-archaeology',
    latitude: 25.0315,
    longitude: 88.9770,
    coverImage: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    bestTimeToVisit: 'November to February',
    difficulty: 'EASY',
    isFeatured: true,
    division: { id: 'div-rajshahi', name: 'Rajshahi', bnName: 'রাজশাহী', slug: 'rajshahi', latitude: 24.3745, longitude: 88.6042 },
    district: { id: 'dist-naogaon', divisionId: 'div-rajshahi', name: 'Naogaon', bnName: 'নওগাঁ', slug: 'naogaon', latitude: 24.7936, longitude: 88.9318 },
    heritageDetail: {
      id: 'hd-paharpur',
      periodEra: 'Pala Dynasty (late 8th – 12th century CE)',
      builtYear: 'c. 781–821 CE',
      architecturalStyle: 'Cruciform Terracotta Buddhist Stupa',
      historicalSignificance: 'Somapura Mahavihara was a premier center of Buddhist learning in Ancient Bengal, influencing architectural traditions as far as Burma and Java.',
      unescoStatus: 'WORLD_HERITAGE_SITE',
      verificationStatus: 'VERIFIED_BY_EXPERT',
      verifiedBy: 'Department of Archaeology & UNESCO World Heritage Centre',
      sources: [
        { title: 'Excavations at Paharpur', author: 'K. N. Dikshit', year: '1938' },
        { title: 'UNESCO World Heritage List: Ruins of the Buddhist Vihara at Paharpur', url: 'https://whc.unesco.org/en/list/322' }
      ]
    }
  },
  {
    id: 'poi-sundarbans',
    name: 'Sundarbans Mangrove Forest',
    bnName: 'সুন্দরবন ম্যানগ্রোভ বন',
    slug: 'sundarbans-national-park',
    summary: 'The world’s largest contiguous mangrove forest and sanctuary of the Royal Bengal Tiger.',
    description: 'A labyrinth of tidal waterways, mudflats, and salt-tolerant mangrove trees declared a UNESCO World Heritage Site.',
    divisionId: 'div-khulna',
    districtId: 'dist-bagerhat',
    categoryId: 'cat-forest',
    latitude: 21.9497,
    longitude: 89.1833,
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    bestTimeToVisit: 'November to March',
    difficulty: 'MODERATE',
    isFeatured: true,
    division: { id: 'div-khulna', name: 'Khulna', bnName: 'খুলনা', slug: 'khulna', latitude: 22.8456, longitude: 89.5403 },
    district: { id: 'dist-bagerhat', divisionId: 'div-khulna', name: 'Bagerhat', bnName: 'বাগেরহাট', slug: 'bagerhat', latitude: 22.6602, longitude: 89.7895 },
  },
  {
    id: 'poi-sixty-dome',
    name: 'Sixty Dome Mosque (Shait Gumbad)',
    bnName: 'ষাট গম্বুজ মসজিদ',
    slug: 'sixty-dome-mosque-bagerhat',
    summary: '15th-century UNESCO World Heritage Sultanate brick mosque built by Saint Khan Jahan Ali.',
    description: 'An architectural marvel featuring 77 low domes, 11 arched doorways, and massive brick masonry.',
    divisionId: 'div-khulna',
    districtId: 'dist-bagerhat',
    categoryId: 'cat-religious-heritage',
    latitude: 22.6742,
    longitude: 89.7419,
    coverImage: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    bestTimeToVisit: 'October to March',
    difficulty: 'EASY',
    isFeatured: true,
    division: { id: 'div-khulna', name: 'Khulna', bnName: 'খুলনা', slug: 'khulna', latitude: 22.8456, longitude: 89.5403 },
    district: { id: 'dist-bagerhat', divisionId: 'div-khulna', name: 'Bagerhat', bnName: 'বাগেরহাট', slug: 'bagerhat', latitude: 22.6602, longitude: 89.7895 },
    heritageDetail: {
      id: 'hd-sixty-dome',
      periodEra: 'Bengal Sultanate (15th century)',
      builtYear: '1459 CE',
      architecturalStyle: 'Khan Jahani Tughlaq-Bengal Fusion',
      historicalSignificance: 'The Mosque City of Bagerhat represents the unique urban architectural mastery of the historic Khalifatabad settlement.',
      unescoStatus: 'WORLD_HERITAGE_SITE',
      verificationStatus: 'VERIFIED_BY_EXPERT',
      verifiedBy: 'UNESCO World Heritage Committee',
      sources: [
        { title: 'Historic Mosque City of Bagerhat', url: 'https://whc.unesco.org/en/list/321' }
      ]
    }
  },
  {
    id: 'poi-tanguar-haor',
    name: 'Tanguar Haor Wetland',
    bnName: 'টাঙ্গুয়ার হাওর',
    slug: 'tanguar-haor-sunamganj',
    summary: 'A pristine Ramsar wetland ecosystem sheltering millions of migratory Siberian waterfowl.',
    description: 'Surrounded by the Meghalaya hills, Tanguar Haor transforms into an immense inland sea in monsoon and crystal lagoons in winter.',
    divisionId: 'div-sylhet',
    districtId: 'dist-sunamganj',
    categoryId: 'cat-wetlands',
    latitude: 25.1235,
    longitude: 91.0772,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    bestTimeToVisit: 'Monsoon (July-Sep for houseboat) / Winter (Dec-Feb for birds)',
    difficulty: 'MODERATE',
    isFeatured: true,
    division: { id: 'div-sylhet', name: 'Sylhet', bnName: 'সিলেট', slug: 'sylhet', latitude: 24.8949, longitude: 91.8687 },
    district: { id: 'dist-sunamganj', divisionId: 'div-sylhet', name: 'Sunamganj', bnName: 'সুনামগঞ্জ', slug: 'sunamganj', latitude: 25.0715, longitude: 91.3992 },
  },
  {
    id: 'poi-lalbagh',
    name: 'Lalbagh Fort',
    bnName: 'লালবাগ কেল্লা',
    slug: 'lalbagh-fort-dhaka',
    summary: '17th-century Mughal fort complex overlooking the historic Buriganga river in Old Dhaka.',
    description: 'Commissioned by Mughal Prince Muhammad Azam, housing the famous Tomb of Pari Bibi and Mughal hammam.',
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    categoryId: 'cat-forts',
    latitude: 23.7196,
    longitude: 90.3882,
    coverImage: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    bestTimeToVisit: 'Year round (Mornings)',
    difficulty: 'EASY',
    isFeatured: false,
    division: { id: 'div-dhaka', name: 'Dhaka', bnName: 'ঢাকা', slug: 'dhaka', latitude: 23.8103, longitude: 90.4125 },
    district: { id: 'dist-dhaka', divisionId: 'div-dhaka', name: 'Dhaka', bnName: 'ঢাকা', slug: 'dhaka', latitude: 23.8103, longitude: 90.4125 },
    heritageDetail: {
      id: 'hd-lalbagh',
      periodEra: 'Mughal Empire (Subah Bangla)',
      builtYear: '1678 CE',
      architecturalStyle: 'Mughal Imperial Brick and Marble',
      historicalSignificance: 'The epicentre of Mughal administration in Bengal under Subahdar Shaista Khan.',
      unescoStatus: 'TENTATIVE_LIST',
      verificationStatus: 'VERIFIED_BY_EXPERT',
      sources: [{ title: 'Dacca: A Record of its Antiquities', author: 'Ahmad Hasan Dani' }]
    }
  }
];

export const MapCanvas: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [hasMapboxToken, setHasMapboxToken] = useState(false);

  const {
    viewport,
    filter,
    selectDestination,
    selectedDestination,
    setViewport,
  } = useMapStore();

  const token = import.meta.env.VITE_MAPBOX_TOKEN || '';

  // Filter landmarks based on active filter
  const filteredLandmarks = INITIAL_LANDMARKS.filter((item) => {
    if (filter.type === 'NATURE' && item.heritageDetail !== undefined) return false;
    if (filter.type === 'HERITAGE' && item.heritageDetail === undefined) return false;
    if (filter.divisionSlug && item.division?.slug !== filter.divisionSlug) return false;
    if (filter.searchQuery.trim()) {
      const q = filter.searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchBn = item.bnName?.toLowerCase().includes(q);
      const matchDistrict = item.district?.name.toLowerCase().includes(q);
      if (!matchName && !matchBn && !matchDistrict) return false;
    }
    return true;
  });

  // Initialize Mapbox GL JS map
  useEffect(() => {
    if (!mapContainer.current) return;

    const isValidToken = token && !token.includes('demo') && token.startsWith('pk.');
    setHasMapboxToken(Boolean(isValidToken));

    if (isValidToken) {
      mapboxgl.accessToken = token;

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [viewport.longitude, viewport.latitude],
        zoom: viewport.zoom,
        pitch: viewport.pitch,
        bearing: viewport.bearing,
        maxBounds: [
          [87.8, 20.3], // SW
          [93.0, 27.0], // NE
        ],
      });

      map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'bottom-right');

      map.on('load', () => {
        setMapLoaded(true);
      });

      map.on('moveend', () => {
        const center = map.getCenter();
        setViewport({
          longitude: center.lng,
          latitude: center.lat,
          zoom: map.getZoom(),
        });
      });

      mapRef.current = map;

      return () => {
        map.remove();
      };
    } else {
      // Mock interactive map mode for demo/development when Mapbox token is not configured
      setMapLoaded(true);
    }
  }, [token]);

  // Sync viewport changes with Mapbox camera
  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      mapRef.current.flyTo({
        center: [viewport.longitude, viewport.latitude],
        zoom: viewport.zoom,
        essential: true,
        duration: 1600,
      });
    }
  }, [viewport.longitude, viewport.latitude, viewport.zoom, mapLoaded]);

  // Render HTML custom pins on Mapbox if live map is active
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    filteredLandmarks.forEach((item) => {
      const isHeritage = item.heritageDetail !== undefined;
      const el = document.createElement('div');
      el.className = 'cursor-pointer group relative';
      el.innerHTML = `
        <div class="flex items-center justify-center w-9 h-9 rounded-2xl shadow-xl transition-all duration-300 transform group-hover:scale-125 ${
          isHeritage
            ? 'bg-amber-500 text-amber-950 shadow-amber-500/40 border-2 border-amber-200'
            : 'bg-emerald-500 text-emerald-950 shadow-emerald-500/40 border-2 border-emerald-200'
        }">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
      `;

      el.addEventListener('click', () => {
        selectDestination(item);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([item.longitude, item.latitude])
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  }, [filteredLandmarks, mapLoaded, selectDestination]);

  return (
    <div className="relative w-full h-full bg-dark-900 overflow-hidden">
      {/* Real Mapbox Container or High-End Visual Cartographic Canvas */}
      {hasMapboxToken ? (
        <div ref={mapContainer} className="w-full h-full" />
      ) : (
        /* Cinematic Vector Geospatial Viewport for Bangladesh */
        <div className="relative w-full h-full bg-gradient-to-b from-[#090e17] via-[#0d1626] to-[#070b12] flex items-center justify-center">
          {/* Spatial Grid Pattern Background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(#10b981 0.75px, transparent 0.75px), radial-gradient(#d97706 0.75px, #090e17 0.75px)',
              backgroundSize: '32px 32px',
              backgroundPosition: '0 0, 16px 16px',
            }}
          />

          {/* Bangladesh Cartographic Silhouette Glow */}
          <div className="relative w-[90vw] max-w-[840px] h-[75vh] flex items-center justify-center">
            <div className="absolute w-full h-full rounded-[60px] bg-gradient-to-tr from-emerald-950/30 via-slate-900/40 to-amber-950/20 blur-3xl" />

            {/* Interactive Coordinate Pins on Canvas */}
            <div className="relative w-full h-full border border-white/5 rounded-3xl p-6 glass-panel-subtle flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Map Canvas Header HUD */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-[11px] text-emerald-300">
                    GEOSPATIAL ENGINE: ACTIVE (BANGLADESH WGS84)
                  </span>
                </div>
                <div className="font-mono text-[10px] text-slate-400">
                  BOUNDS: [88.0°E, 20.5°N] → [92.7°E, 26.7°N]
                </div>
              </div>

              {/* Geographic Landmarks Grid / Interactive Pins */}
              <div className="my-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 py-4 z-10 overflow-y-auto max-h-[58vh]">
                {filteredLandmarks.map((item) => {
                  const isHeritage = item.heritageDetail !== undefined;
                  const isSelected = selectedDestination?.id === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => selectDestination(item)}
                      className={`group relative p-3.5 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                        isSelected
                          ? isHeritage
                            ? 'glass-panel-amber border-amber-400/60 ring-2 ring-amber-400/30'
                            : 'glass-panel-emerald border-emerald-400/60 ring-2 ring-emerald-400/30'
                          : 'glass-panel hover:border-slate-400/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                            isHeritage
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          }`}
                        >
                          {isHeritage ? (
                            <Landmark className="w-5 h-5" />
                          ) : (
                            <Trees className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white truncate group-hover:text-emerald-300 transition-colors">
                              {item.name}
                            </h3>
                            {item.isFeatured && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                                FEATURED
                              </span>
                            )}
                          </div>
                          {item.bnName && (
                            <p className="text-xs text-slate-400 font-serif truncate">
                              {item.bnName}
                            </p>
                          )}
                          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span className="truncate">
                              {item.district?.name}, {item.division?.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* HUD Map Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-white/5 text-[11px] text-slate-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                    <span>Nature & Eco-Trails</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                    <span>Archaeology & Heritage</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400">
                  Click any landmark to open the Discovery Drawer
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Map Controls (Bottom Left) */}
      <div className="absolute bottom-6 left-6 z-30 flex flex-col gap-2 pointer-events-auto">
        <div className="glass-panel p-1.5 rounded-2xl flex flex-col gap-1 shadow-2xl">
          <button
            onClick={() => setViewport({ zoom: Math.min(viewport.zoom + 0.8, 14) })}
            className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            title="Zoom in"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport({ zoom: Math.max(viewport.zoom - 0.8, 5.5) })}
            className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            title="Zoom out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() =>
              setViewport({
                longitude: 90.3563,
                latitude: 23.6850,
                zoom: 7.2,
                pitch: 20,
                bearing: 0,
              })
            }
            className="p-2.5 rounded-xl text-slate-300 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all"
            title="Reset to Bangladesh Center"
            aria-label="Reset Map"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
