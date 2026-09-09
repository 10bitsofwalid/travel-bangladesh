import React from 'react';
import { useMapStore } from '../../store/useMapStore';
import { Compass, Sparkles } from 'lucide-react';

export const LeftFilterPanel: React.FC = () => {
  const {
    filterLayers,
    toggleFilterLayer,
    selectedTrail,
    setSelectedTrail,
  } = useMapStore();

  const trails = [
    { id: 'mughal', label: 'MUGHAL HERITAGE TRAIL', color: 'from-amber-500 to-rose-500' },
    { id: 'sylhet', label: 'SYLHET TEA ROUTE', color: 'from-emerald-500 to-teal-500' },
    { id: 'sundarbans', label: 'SUNDARBANS ADVENTURE', color: 'from-cyan-500 to-blue-500' },
  ];

  return (
    <aside className="absolute top-24 left-5 z-20 w-64 glass-panel rounded-3xl p-5 shadow-2xl space-y-6 pointer-events-auto select-none transition-all">
      {/* Filter Layers Section */}
      <div>
        <h3 className="text-[11px] font-extrabold text-slate-800 tracking-wider uppercase mb-3.5">
          FILTER LAYERS
        </h3>
        <div className="space-y-3">
          {/* Nature */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 tracking-wide">
              NATURE
            </span>
            <div
              onClick={() => toggleFilterLayer('nature')}
              className={`switch-track ${filterLayers.nature ? 'active' : ''}`}
            >
              <div className="switch-thumb" />
            </div>
          </div>

          {/* History */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 tracking-wide">
              HISTORY
            </span>
            <div
              onClick={() => toggleFilterLayer('history')}
              className={`switch-track ${filterLayers.history ? 'active' : ''}`}
            >
              <div className="switch-thumb" />
            </div>
          </div>

          {/* Culture */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 tracking-wide">
              CULTURE
            </span>
            <div
              onClick={() => toggleFilterLayer('culture')}
              className={`switch-track ${filterLayers.culture ? 'active' : ''}`}
            >
              <div className="switch-thumb" />
            </div>
          </div>

          {/* UNESCO Sites */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 tracking-wide">
              UNESCO SITES
            </span>
            <div
              onClick={() => toggleFilterLayer('unesco')}
              className={`switch-track ${filterLayers.unesco ? 'active' : ''}`}
            >
              <div className="switch-thumb" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-200/60" />

      {/* Thematic Trails Section */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-[11px] font-extrabold text-slate-800 tracking-wider uppercase flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            THEMATIC TRAILS
          </h3>
          {selectedTrail && (
            <button
              onClick={() => setSelectedTrail(null)}
              className="text-[10px] text-slate-400 hover:text-slate-600 underline font-medium"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-2">
          {trails.map((trail) => {
            const isActive = selectedTrail === trail.id;
            return (
              <button
                key={trail.id}
                onClick={() => setSelectedTrail(trail.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold tracking-wide transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-lg scale-[1.02]'
                    : 'bg-white/40 text-slate-700 hover:bg-white/80 border border-slate-200/50'
                }`}
              >
                <span className="truncate">{trail.label}</span>
                {isActive && (
                  <Sparkles className="w-3 h-3 text-emerald-400 shrink-0 ml-1.5 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
