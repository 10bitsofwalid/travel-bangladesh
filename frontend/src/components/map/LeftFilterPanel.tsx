import React from 'react';
import { useMapStore } from '../../store/useMapStore';
import { Compass, Sparkles, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export const LeftFilterPanel: React.FC = () => {
  const {
    filterLayers,
    toggleFilterLayer,
    selectedTrail,
    setSelectedTrail,
    isLeftPanelOpen,
    toggleLeftPanel,
  } = useMapStore();

  const trails = [
    { id: 'mughal', label: 'MUGHAL HERITAGE TRAIL', color: 'from-amber-500 to-rose-500' },
    { id: 'buddhist', label: 'BUDDHIST ARCHAEOLOGY TRAIL', color: 'from-amber-500 to-orange-500' },
    { id: 'sylhet', label: 'SYLHET TEA & CLOUD FORESTS', color: 'from-emerald-500 to-teal-500' },
    { id: 'sundarbans', label: 'SUNDARBANS DELTA ADVENTURE', color: 'from-cyan-500 to-blue-500' },
  ];

  if (!isLeftPanelOpen) {
    return (
      <button
        onClick={toggleLeftPanel}
        className="absolute top-[100px] sm:top-[124px] left-3 sm:left-5 z-20 glass-panel p-2 sm:p-2.5 rounded-2xl shadow-xl flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-slate-800 hover:scale-105 transition-all cursor-pointer pointer-events-auto border border-white/80"
        title="Open Filter & Trails Panel"
        aria-label="Open Filters"
      >
        <Filter className="w-4 h-4 text-emerald-600" />
        <span className="hidden sm:inline">Filters</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
      </button>
    );
  }

  return (
    <aside
      className="absolute top-[100px] sm:top-[120px] left-3 sm:left-5 z-20 w-[calc(100vw-24px)] max-w-[280px] sm:w-[290px] lg:w-[310px] glass-panel rounded-3xl p-4 sm:p-5 shadow-2xl space-y-3.5 sm:space-y-4 pointer-events-auto select-none transition-all duration-300 animate-in fade-in slide-in-from-left-4 max-h-[calc(100vh-260px)] overflow-y-auto border border-white/85"
      aria-label="Map Filters and Trails"
    >
      {/* Header with Collapse Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-extrabold text-slate-800 tracking-wider uppercase flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-emerald-600" />
          FILTER LAYERS
        </h3>
        <button
          onClick={toggleLeftPanel}
          className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Minimize Filter Panel"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Layers Toggles */}
      <div className="space-y-3">
        {/* Nature */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 tracking-wide">
            NATURE
          </span>
          <div
            onClick={() => toggleFilterLayer('nature')}
            className={`switch-track ${filterLayers.nature ? 'active-emerald' : ''}`}
            role="switch"
            aria-checked={filterLayers.nature}
            tabIndex={0}
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
            className={`switch-track ${filterLayers.history ? 'active-emerald' : ''}`}
            role="switch"
            aria-checked={filterLayers.history}
            tabIndex={0}
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
            className={`switch-track ${filterLayers.culture ? 'active-emerald' : ''}`}
            role="switch"
            aria-checked={filterLayers.culture}
            tabIndex={0}
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
            className={`switch-track ${filterLayers.unesco ? 'active-emerald' : ''}`}
            role="switch"
            aria-checked={filterLayers.unesco}
            tabIndex={0}
          >
            <div className="switch-thumb" />
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-200/60" />

      {/* Thematic Trails Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[11px] font-extrabold text-slate-800 tracking-wider uppercase flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            THEMATIC TRAILS
          </h3>
          {selectedTrail && (
            <button
              onClick={() => setSelectedTrail(null)}
              className="text-[10px] text-emerald-600 hover:text-emerald-800 font-bold underline cursor-pointer"
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
                className={`w-full text-left px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl text-[11px] sm:text-xs font-bold tracking-wide transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-lg scale-[1.02] ring-2 ring-emerald-400/40'
                    : 'bg-white/50 text-slate-700 hover:bg-white border border-slate-200/60'
                }`}
              >
                <span className="leading-snug">{trail.label}</span>
                {isActive && (
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1.5 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
