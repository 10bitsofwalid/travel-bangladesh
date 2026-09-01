import React from 'react';
import { Compass, Trees, Landmark, Search, Sparkles, MapPin } from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';

export const HeaderNav: React.FC = () => {
  const { filter, setFilterType, toggleSearch, isSearchOpen } = useMapStore();

  return (
    <header className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
      {/* Brand Logo & Tagline */}
      <div className="flex items-center gap-3 glass-panel px-4 py-2.5 rounded-2xl pointer-events-auto shadow-2xl transition-transform hover:scale-[1.01]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-amber-600 flex items-center justify-center shadow-lg shadow-emerald-950/50">
          <Compass className="w-6 h-6 text-white animate-pulse-slow" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-display font-extrabold text-xl tracking-tight text-white">
              Explore<span className="text-emerald-400">BD</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              v1.0
            </span>
          </div>
          <p className="text-[11px] text-slate-400 tracking-wide font-medium">
            Geospatial Heritage & Tourism Platform
          </p>
        </div>
      </div>

      {/* Center Theme / Mode Filter Pills */}
      <div className="hidden md:flex items-center gap-1.5 glass-panel p-1.5 rounded-2xl pointer-events-auto shadow-2xl">
        <button
          onClick={() => setFilterType('ALL')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
            filter.type === 'ALL'
              ? 'bg-white/15 text-white shadow-inner border border-white/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-slate-300" />
          <span>All Wonders</span>
        </button>

        <button
          onClick={() => setFilterType('NATURE')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
            filter.type === 'NATURE'
              ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 shadow-lg shadow-emerald-950/40'
              : 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10'
          }`}
        >
          <Trees className="w-3.5 h-3.5 text-emerald-400" />
          <span>Nature & Wild</span>
        </button>

        <button
          onClick={() => setFilterType('HERITAGE')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
            filter.type === 'HERITAGE'
              ? 'bg-amber-500/25 text-amber-300 border border-amber-400/40 shadow-lg shadow-amber-950/40'
              : 'text-slate-400 hover:text-amber-300 hover:bg-amber-500/10'
          }`}
        >
          <Landmark className="w-3.5 h-3.5 text-amber-400" />
          <span>History & Heritage</span>
        </button>
      </div>

      {/* Right Controls: Search Trigger & Quick Stats */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          onClick={toggleSearch}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-panel text-xs font-medium text-slate-300 hover:text-white hover:border-slate-500/40 transition-all ${
            isSearchOpen ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200' : ''
          }`}
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="hidden sm:inline">Search spots & districts...</span>
          <kbd className="hidden lg:inline text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-400">
            ⌘K
          </kbd>
        </button>

        <div className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-2xl glass-panel-subtle text-[11px] text-slate-400">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>Bangladesh (8 Divisions / 64 Districts)</span>
        </div>
      </div>
    </header>
  );
};
