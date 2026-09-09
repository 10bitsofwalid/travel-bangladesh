import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
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
  } = useMapStore();

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y,
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const resetViewport = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative w-full h-full bg-[#d6e5d8] overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Topographic Map Surface SVG Canvas */}
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-full object-cover transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center center',
        }}
      >
        <defs>
          {/* Subtle terrain gradient */}
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2ede3" />
            <stop offset="50%" stopColor="#d8e8da" />
            <stop offset="100%" stopColor="#cce0ce" />
          </linearGradient>

          {/* Mangrove pattern for Sundarbans */}
          <pattern id="mangrovePattern" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="2" fill="#7fa886" opacity="0.6" />
          </pattern>

          {/* Glowing Beacon Filters */}
          <filter id="glow-emerald" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ocean / Bay of Bengal Base Water */}
        <rect width="1000" height="1000" fill="#b9d7e8" />

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

        {/* River Networks (Jamuna, Padma, Meghna, Surma) */}
        {/* Jamuna River Flowing South */}
        <path
          d="M 380 90 Q 420 240 450 350 Q 470 420 490 470"
          fill="none"
          stroke="#b4d5e7"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Padma River Flowing Southeast */}
        <path
          d="M 210 490 Q 350 480 490 470 Q 570 510 620 570 Q 660 650 670 770"
          fill="none"
          stroke="#b4d5e7"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Meghna & Surma River */}
        <path
          d="M 680 200 Q 660 320 620 440 Q 600 510 620 570"
          fill="none"
          stroke="#b4d5e7"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Soft Geographic Labels */}
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
            {/* Dotted glowing connecting highway route path */}
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
              opacity="0.85"
            />
            {/* Glowing route dots */}
            {(selectedTrail === 'buddhist'
              ? [{ x: 290, y: 185 }, { x: 346, y: 275 }, { x: 415, y: 290 }, { x: 325, y: 385 }]
              : selectedTrail === 'sylhet'
              ? [{ x: 665, y: 395 }, { x: 695, y: 280 }, { x: 765, y: 545 }]
              : selectedTrail === 'sundarbans'
              ? [{ x: 472, y: 650 }, { x: 370, y: 780 }, { x: 535, y: 805 }]
              : [
                  { x: 515, y: 478 },
                  { x: 575, y: 420 },
                  { x: 640, y: 350 },
                  { x: 710, y: 290 },
                  { x: 765, y: 240 },
                ]
            ).map((pt, idx) => (
              <circle
                key={idx}
                cx={pt.x}
                cy={pt.y}
                r="4"
                fill="#ffffff"
                stroke="#10b981"
                strokeWidth="2.5"
                filter="url(#glow-emerald)"
              />
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
            glowFilter = 'url(#glow-emerald)';
          } else if (isNature) {
            auraColor = '#34d399';
            strokeColor = '#10b981';
            pinColor = '#059669';
            glowFilter = 'url(#glow-emerald)';
          } else if (isHeritage) {
            auraColor = '#fb923c';
            strokeColor = '#ea580c';
            pinColor = '#c2410c';
            glowFilter = 'url(#glow-purple)';
          }

          return (
            <g
              key={item.id}
              transform={`translate(${x}, ${y})`}
              className="cursor-pointer group"
              onClick={() => selectDestination(item)}
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

      {/* Map Attribution Brand Label */}
      <div className="absolute bottom-4 left-5 z-20 flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold bg-white/60 px-3 py-1 rounded-full border border-white/80 shadow-sm pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        <span>ExploreBD Geospatial Surface · WGS84</span>
      </div>

      {/* Floating Map Zoom / Reset Controls (Bottom Left) */}
      <div className="absolute bottom-12 left-5 z-20 flex flex-col gap-1.5 glass-panel p-1.5 rounded-2xl shadow-xl pointer-events-auto">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.3, 3))}
          className="p-2 rounded-xl text-slate-700 hover:bg-white transition-colors"
          title="Zoom in"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.3, 0.8))}
          className="p-2 rounded-xl text-slate-700 hover:bg-white transition-colors"
          title="Zoom out"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={resetViewport}
          className="p-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-white transition-colors"
          title="Reset Map"
          aria-label="Reset Map"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
