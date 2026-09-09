import React from 'react';
import { Search, Sparkles, User, Plus, MapPin, ArrowLeft } from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    toggleSearch,
    setIsSubmitSpotOpen,
    takeMeSomewhere,
    filter,
    setSearchQuery,
  } = useMapStore();

  return (
    <header className="absolute top-5 left-5 right-5 z-30 flex items-center justify-between pointer-events-none transition-all">
      {/* Dynamic Header Pill: Brand Logo OR Back to Map + Section Breadcrumb */}
      <div className="flex items-center gap-3 glass-panel px-4 py-2.5 rounded-full pointer-events-auto shadow-xl">
        {activeView !== 'explore' ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('explore')}
              className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-700 flex items-center justify-center"
              title="Return to Map"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 via-emerald-400 to-cyan-500 flex items-center justify-center shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-extrabold text-xs tracking-wider text-slate-900 uppercase">
                EXPLOREBD <span className="text-slate-400 font-light mx-1">|</span>{' '}
                {activeView === 'account' ? 'MY ACCOUNT' : 'PLANNER'}
              </span>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setActiveView('explore')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 via-emerald-400 to-cyan-500 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-base tracking-tight text-slate-900">
              Explore<span className="text-emerald-600">BD</span>
            </span>
          </div>
        )}
      </div>

      {/* Main Bar Center & Right (Only visible in Explore view or compact in others) */}
      {activeView === 'explore' && (
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Search Input Bar */}
          <div className="relative flex items-center">
            <div className="glass-panel rounded-full flex items-center px-4 py-2.5 w-72 md:w-96 shadow-xl focus-within:ring-2 focus-within:ring-emerald-400/40 transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="text"
                value={filter.searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search landmarks, historical sites..."
                className="bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none w-full font-medium"
              />
              <button
                onClick={toggleSearch}
                className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono ml-2 border border-slate-200 hover:bg-slate-200 transition-colors"
                title="Open Global Search (⌘K)"
              >
                ⌘K
              </button>
            </div>
          </div>

          {/* Rainbow Glowing "⭐ TAKE ME SOMEWHERE" Button */}
          <button
            onClick={takeMeSomewhere}
            className="rainbow-glow-border px-5 py-2.5 flex items-center gap-2 text-xs font-bold text-slate-800 shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
            title="Discover a random fascinating landmark in Bangladesh!"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span className="tracking-wide">TAKE ME SOMEWHERE</span>
          </button>

          {/* User Profile Button */}
          <button
            onClick={() => setActiveView('account')}
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-700 hover:text-emerald-600 hover:scale-105 active:scale-95 shadow-xl transition-all"
            title="My Account & Contributions"
          >
            <User className="w-4 h-4" />
          </button>

          {/* "+ SUBMIT A SPOT" Button */}
          <button
            onClick={() => setIsSubmitSpotOpen(true)}
            className="glass-panel px-4 py-2.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] shadow-xl transition-all"
          >
            <Plus className="w-4 h-4 text-emerald-600 font-bold" />
            <span>SUBMIT A SPOT</span>
          </button>
        </div>
      )}

      {/* When in Account or Planner, provide a right-hand back to map button */}
      {activeView !== 'explore' && (
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setActiveView('explore')}
            className="glass-panel px-4 py-2 rounded-full text-xs font-bold text-slate-800 hover:bg-white/90 shadow-xl transition-all"
          >
            Back to Map
          </button>
        </div>
      )}
    </header>
  );
};
