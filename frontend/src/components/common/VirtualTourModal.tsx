import React, { useState, useEffect, useRef } from 'react';
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

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Synthesized natural breeze ambient soundscape using Web Audio API
  useEffect(() => {
    if (!isVirtualTourOpen) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      return;
    }

    if (!isMuted) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Buffer for gentle pink/brown noise
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 350;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.12;
        gainNodeRef.current = gainNode;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start();
      } catch {
        // Fallback gracefully if Web Audio is blocked
      }
    } else if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }

    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, [isVirtualTourOpen, isMuted]);

  if (!isVirtualTourOpen) return null;

  const destId = selectedDestination?.id || 'poi-ahsan-manzil';

  const getHotspots = () => {
    switch (destId) {
      case 'poi-sixty-dome':
        return [
          {
            id: 'domes',
            title: '77 Sultanate Domes',
            desc: '70 low circular domed bays flanking 7 central traditional Bengali chauchala curved vaults.',
            positionPercent: 28,
          },
          {
            id: 'pillars',
            title: '60 Slender Stone Pillars',
            desc: 'Carved imported stone pillars supporting the multi-bay vaulted prayer chamber.',
            positionPercent: 52,
          },
          {
            id: 'tughlaq',
            title: 'Tughlaq-Bengal Tapering Walls',
            desc: 'Six-foot-thick tapering brick walls built to withstand heavy coastal monsoons and delta humidity.',
            positionPercent: 78,
          },
        ];
      case 'poi-paharpur':
        return [
          {
            id: 'cruciform',
            title: '22-Meter Central Cruciform Shrine',
            desc: 'Monumental stepped terraced stupa that served as the architectural prototype for Pagan and Borobudur.',
            positionPercent: 28,
          },
          {
            id: 'plaques',
            title: '2,800 Terracotta Relief Plaques',
            desc: 'Friezes depicting everyday Pala life, archers, dancing deities, elephants, and lotus blossoms.',
            positionPercent: 52,
          },
          {
            id: 'cells',
            title: '177 Monastic Cells (Bhikshu Kothis)',
            desc: 'Vast square quadrangle housing centuries of visiting Buddhist scholars, including Atiśa Dipankara.',
            positionPercent: 78,
          },
        ];
      case 'poi-lalbagh':
        return [
          {
            id: 'pari-bibi',
            title: 'Tomb of Pari Bibi (Iran Dukht)',
            desc: 'Central white marble chamber roofed by an octagonal copper-plated dome, surrounded by Rajmahal black basalt.',
            positionPercent: 28,
          },
          {
            id: 'hammam',
            title: 'Diwan-i-Aam & Subterranean Hammam',
            desc: 'Two-storied residence with Mughal boiling cauldrons and terracotta pipes that heated the bath chambers.',
            positionPercent: 52,
          },
          {
            id: 'mosque',
            title: '3-Domed Fortress Mosque',
            desc: 'Consecrated by Subahdar Shaista Khan in 1679 with classic fluted minarets and cusped arches.',
            positionPercent: 78,
          },
        ];
      case 'poi-sundarbans':
        return [
          {
            id: 'mangroves',
            title: 'Pneumatophore Forest Roots',
            desc: 'Vertical breathing roots of Sundari and Golpata trees protruding through saline tidal mudflats.',
            positionPercent: 25,
          },
          {
            id: 'tiger-tracks',
            title: 'Royal Bengal Tiger Corridor',
            desc: 'Kotka tidal creek crossing frequented by wild tigers, spotted deer herds, and wild boars.',
            positionPercent: 52,
          },
          {
            id: 'estuary',
            title: 'Bay of Bengal Brackish Confluence',
            desc: 'Where delta freshwater meets the sea, supporting endangered Irrawaddy and Ganges river dolphins.',
            positionPercent: 80,
          },
        ];
      default:
        return [
          {
            id: 'dome',
            title: 'Grand Octagonal Dome',
            desc: 'The central crowning feature reconstructed after the 1888 tornado, towering 27.5 meters above ground.',
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
    }
  };

  const hotspots = getHotspots();
  const panoramaImage = selectedDestination?.gallery?.[0] || selectedDestination?.coverImage || 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=2400&q=85';

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setRotation((prev) => (prev + delta * 0.3) % 360);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const delta = e.touches[0].clientX - startX;
    setRotation((prev) => (prev + delta * 0.3) % 360);
    setStartX(e.touches[0].clientX);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in select-none"
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      <div className="relative w-full max-w-5xl h-[88vh] sm:h-[82vh] rounded-3xl overflow-hidden glass-panel border border-white/40 shadow-2xl flex flex-col">
        {/* Top Floating Control Bar */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-30 flex items-center justify-between pointer-events-none gap-2">
          <div className="glass-panel px-3 sm:px-4 py-1.5 sm:py-2 rounded-full pointer-events-auto flex items-center gap-1.5 sm:gap-2 shadow-lg border border-white/80 shrink-0 min-w-0">
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 animate-spin-slow shrink-0" />
            <span className="text-[11px] sm:text-xs font-extrabold text-slate-800 tracking-wider uppercase truncate max-w-[170px] sm:max-w-none">
              360° PANORAMA: {selectedDestination?.name || 'AHSAN MANZIL'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto shrink-0">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-panel flex items-center justify-center text-slate-700 hover:text-emerald-600 transition-colors shadow-md border border-white/80 cursor-pointer"
              title={isMuted ? 'Unmute Ambient Breeze Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />}
            </button>
            <button
              onClick={() => setIsVirtualTourOpen(false)}
              className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors shadow-md border border-white/80 cursor-pointer"
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
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {/* Panoramic wide cylinder image simulating continuous 360 wrapping */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-75 ease-out pointer-events-none"
            style={{
              transform: `scale(${zoomLevel})`,
            }}
          >
            {/* Render seamless dual panorama to simulate full infinite rotation */}
            <div
              className="flex w-[320%] max-w-none h-full select-none"
              style={{
                transform: `translateX(${((rotation % 100) * 4.5)}px)`,
              }}
            >
              <img
                src={panoramaImage}
                alt={`${selectedDestination?.name || 'Landmark'} 360 Panorama Left`}
                className="w-1/2 h-full object-cover select-none"
                draggable={false}
              />
              <img
                src={panoramaImage}
                alt={`${selectedDestination?.name || 'Landmark'} 360 Panorama Right`}
                className="w-1/2 h-full object-cover select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Interactive Hotspots */}
          <div className="absolute inset-0 pointer-events-none">
            {hotspots.map((spot) => {
              const adjustedPos = ((spot.positionPercent + (rotation * 0.2)) % 100 + 100) % 100;
              const isVisible = adjustedPos > 8 && adjustedPos < 92;

              if (!isVisible) return null;

              return (
                <div
                  key={spot.id}
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-auto"
                  style={{ left: `${adjustedPos}%` }}
                >
                  <button
                    onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                    className="group relative flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-white border-2 border-white shadow-xl hover:scale-125 transition-transform cursor-pointer"
                    title={`Explore ${spot.title}`}
                  >
                    <Info className="w-4 h-4" />
                    <span className="absolute -inset-1 rounded-full bg-emerald-400 animate-ping opacity-50 pointer-events-none" />
                  </button>

                  {/* Hotspot Popup */}
                  {activeHotspot === spot.id && (
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 glass-panel p-3.5 rounded-2xl shadow-2xl border border-white/85 text-left z-20 animate-in fade-in zoom-in-95">
                      <h4 className="text-xs font-bold text-slate-900">{spot.title}</h4>
                      <p className="text-[11px] text-slate-600 mt-1 leading-snug">{spot.desc}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Drag instruction overlay hint */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 glass-panel px-3 sm:px-4 py-1 sm:py-1.5 rounded-full pointer-events-none text-[10px] sm:text-[11px] font-semibold text-slate-700 shadow-md border border-white/80 whitespace-nowrap max-w-[calc(100vw-32px)] truncate text-center">
            <span className="hidden sm:inline">Click & drag horizontally to look around 360° · Click green nodes to inspect features</span>
            <span className="sm:hidden">Drag horizontally to look around 360°</span>
          </div>
        </div>

        {/* Bottom Zoom & Orbit Controls */}
        <div className="px-3 sm:px-6 py-2.5 sm:py-3 bg-white/75 border-t border-white/60 flex items-center justify-between text-xs text-slate-700">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setZoomLevel((prev) => Math.min(prev + 0.2, 1.8))}
              className="p-1.5 sm:p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 shadow-sm cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((prev) => Math.max(prev - 0.2, 0.8))}
              className="p-1.5 sm:p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 shadow-sm cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => {
                setRotation(0);
                setZoomLevel(1);
              }}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 shadow-sm font-semibold flex items-center gap-1 sm:gap-1.5 cursor-pointer text-xs"
            >
              <RotateCw className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="font-mono text-[10px] sm:text-[11px] text-slate-500 font-semibold hidden md:block">
            PANORAMIC SPHERICAL VIEW · OLD DHAKA HERITAGE ARCHIVE
          </div>
        </div>
      </div>
    </div>
  );
};
