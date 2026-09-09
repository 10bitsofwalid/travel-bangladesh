import React, { useState } from 'react';
import { X, Volume2, VolumeX, RotateCw, ZoomIn, ZoomOut, Compass, Info } from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';

export const VirtualTourModal: React.FC = () => {
  const { isVirtualTourOpen, setIsVirtualTourOpen, selectedDestination } = useMapStore();
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  if (!isVirtualTourOpen) return null;

  const hotspots = [
    {
      id: 'dome',
      title: 'Grand Octagonal Dome',
      desc: 'The central crowning feature constructed after the 1888 tornado, towering 27.5 meters above ground.',
      positionPercent: 28,
    },
    {
      id: 'stairs',
      title: 'Ceremonial Marble Staircase',
      desc: 'Grand stairs descending toward the Buriganga river where Nawab family flotillas docked.',
      positionPercent: 52,
    },
    {
      id: 'rangmahal',
      title: 'Rangmahal & Durbar Hall',
      desc: 'The eastern royal wing with polished wooden floors and ancestral portrait galleries.',
      positionPercent: 78,
    },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setRotation((prev) => (prev + delta * 0.25) % 360);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-in fade-in select-none"
      onMouseUp={handleMouseUp}
    >
      <div className="relative w-full max-w-5xl h-[80vh] rounded-3xl overflow-hidden glass-panel border border-white/40 shadow-2xl flex flex-col">
        {/* Top Floating Control Bar */}
        <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
          <div className="glass-panel px-4 py-2 rounded-full pointer-events-auto flex items-center gap-2 shadow-lg">
            <Compass className="w-4 h-4 text-emerald-600 animate-spin-slow" />
            <span className="text-xs font-extrabold text-slate-800 tracking-wider uppercase">
              360° VIRTUAL PANORAMA: {selectedDestination?.name || 'AHSAN MANZIL'}
            </span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-700 hover:text-emerald-600 transition-colors shadow-md"
              title={isMuted ? 'Unmute Ambient Sound' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>
            <button
              onClick={() => setIsVirtualTourOpen(false)}
              className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors shadow-md"
              title="Close Virtual Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 360 Interactive Panorama Canvas Viewport */}
        <div
          className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden bg-slate-950 flex items-center justify-center"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        >
          {/* Panoramic wide cylinder image simulating 360 */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-75 ease-out pointer-events-none"
            style={{
              transform: `scale(${zoomLevel})`,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=2400&q=85"
              alt="Ahsan Manzil 360 Panorama"
              className="w-[260%] max-w-none h-full object-cover select-none"
              style={{
                transform: `translateX(${rotation * 4}px)`,
              }}
              draggable={false}
            />
          </div>

          {/* Interactive Hotspots */}
          <div className="absolute inset-0 pointer-events-none">
            {hotspots.map((spot) => {
              const adjustedPos = (spot.positionPercent + rotation * 0.15) % 100;
              const isVisible = adjustedPos > 10 && adjustedPos < 90;

              if (!isVisible) return null;

              return (
                <div
                  key={spot.id}
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-auto"
                  style={{ left: `${adjustedPos}%` }}
                >
                  <button
                    onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                    className="group relative flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/90 text-white border-2 border-white shadow-xl hover:scale-125 transition-transform"
                  >
                    <Info className="w-4 h-4" />
                    <span className="absolute -inset-1 rounded-full bg-emerald-400 animate-ping opacity-50 pointer-events-none" />
                  </button>

                  {/* Hotspot Popup */}
                  {activeHotspot === spot.id && (
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 glass-panel p-3.5 rounded-2xl shadow-2xl border border-white/80 text-left z-20 animate-in fade-in zoom-in-95">
                      <h4 className="text-xs font-bold text-slate-900">{spot.title}</h4>
                      <p className="text-[11px] text-slate-600 mt-1 leading-snug">{spot.desc}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Drag instruction overlay hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-panel px-4 py-1.5 rounded-full pointer-events-none text-[11px] font-semibold text-slate-700 shadow-md">
            Click & drag horizontally to look around 360° · Click green nodes to explore
          </div>
        </div>

        {/* Bottom Zoom & Orbit Controls */}
        <div className="px-6 py-3 bg-white/70 border-t border-white/60 flex items-center justify-between text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((prev) => Math.min(prev + 0.2, 1.8))}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 shadow-sm"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((prev) => Math.max(prev - 0.2, 0.8))}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 shadow-sm"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setRotation(0);
                setZoomLevel(1);
              }}
              className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 shadow-sm font-semibold flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Reset View</span>
            </button>
          </div>

          <div className="font-mono text-[11px] text-slate-500 font-semibold">
            PANORAMIC SPHERICAL VIEW · OLD DHAKA HERITAGE ARCHIVE
          </div>
        </div>
      </div>
    </div>
  );
};
