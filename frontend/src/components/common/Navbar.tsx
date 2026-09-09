import React, { useEffect, useState } from 'react';
import { Search, Sparkles, User, Plus, MapPin, ArrowLeft, CheckCircle2 } from 'lucide-react';
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
    setDivisionFilter,
    flyToLocation,
    toastMessage,
  } = useMapStore();

  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
    }
  }, []);

  const handleLogoClick = () => {
    setActiveView('explore');
    setDivisionFilter(null);
    flyToLocation(90.3563, 23.6850, 7.2);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filter.searchQuery.trim()) {
      toggleSearch();
    }
  };

  return (
    <>
      <header className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 z-30 flex items-center justify-between pointer-events-none transition-all gap-2">
        {/* Dynamic Header Pill: Brand Logo OR Back to Map + Section Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-3 glass-panel px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full pointer-events-auto shadow-xl border border-white/80 shrink-0">
          {activeView !== 'explore' ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setActiveView('explore')}
                className="p-1 sm:p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-700 flex items-center justify-center cursor-pointer"
                title="Return to Map"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-pink-500 via-emerald-400 to-cyan-500 flex items-center justify-center shadow-sm shrink-0">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                </div>
                <span className="font-extrabold text-[10px] sm:text-xs tracking-wider text-slate-900 uppercase truncate max-w-[140px] sm:max-w-none">
                  EXPLOREBD <span className="text-slate-400 font-light mx-0.5 sm:mx-1">|</span>{' '}
                  {activeView === 'account' ? 'MY ACCOUNT' : 'PLANNER'}
                </span>
              </div>
            </div>
          ) : (
            <div
              onClick={handleLogoClick}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group"
              title="Reset to Bangladesh National Map"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-pink-500 via-emerald-400 to-cyan-500 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="font-display font-bold text-sm sm:text-base tracking-tight text-slate-900">
                Explore<span className="text-emerald-600">BD</span>
              </span>
            </div>
          )}
        </div>

        {/* Main Bar Center & Right (Only visible in Explore view or compact in others) */}
        {activeView === 'explore' && (
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 pointer-events-auto shrink-0">
            {/* Search Trigger on Mobile (< sm) */}
            <button
              onClick={toggleSearch}
              className="sm:hidden w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-700 hover:text-emerald-600 shadow-xl border border-white/80 cursor-pointer shrink-0"
              title="Search landmarks"
              aria-label="Search landmarks"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Search Input Bar on Tablet & Desktop (>= sm) */}
            <div className="relative hidden sm:flex items-center">
              <div className="glass-panel rounded-full flex items-center px-3 py-1.5 sm:px-3.5 sm:py-2 md:py-2.5 w-44 md:w-64 lg:w-80 xl:w-96 shadow-xl focus-within:ring-2 focus-within:ring-emerald-400/50 transition-all border border-white/80">
                <Search className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={filter.searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search landmarks..."
                  className="bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none w-full font-medium"
                />
                <button
                  onClick={toggleSearch}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono ml-1.5 border border-slate-200 hover:bg-slate-200 transition-colors shrink-0 cursor-pointer hidden md:inline"
                  title="Open Global Search"
                >
                  {isMac ? '⌘K' : 'Ctrl+K'}
                </button>
              </div>
            </div>

            {/* Rainbow Glowing "⭐ TAKE ME SOMEWHERE" Button */}
            <button
              onClick={takeMeSomewhere}
              className="rainbow-glow-border px-2.5 sm:px-3.5 md:px-5 py-1.5 sm:py-2 md:py-2.5 flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[11px] sm:text-xs font-bold text-slate-800 shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer shrink-0"
              title="Discover a random fascinating landmark in Bangladesh!"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse shrink-0" />
              <span className="tracking-wide hidden lg:inline">TAKE ME SOMEWHERE</span>
              <span className="tracking-wide hidden sm:inline lg:hidden">EXPLORE</span>
            </button>

            {/* User Profile Button */}
            <button
              onClick={() => setActiveView('account')}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full glass-panel flex items-center justify-center text-slate-700 hover:text-emerald-600 hover:scale-105 active:scale-95 shadow-xl transition-all border border-white/80 shrink-0 cursor-pointer"
              title="My Account & Contributions"
              aria-label="My Account"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* "+ SUBMIT A SPOT" Button */}
            <button
              onClick={() => setIsSubmitSpotOpen(true)}
              className="glass-panel px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-full flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold text-slate-800 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] shadow-xl transition-all border border-white/80 shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 font-bold" />
              <span className="hidden md:inline">SUBMIT A SPOT</span>
              <span className="hidden sm:inline md:hidden">SUBMIT</span>
            </button>
          </div>
        )}

        {/* When in Account or Planner, provide a right-hand back to map button */}
        {activeView !== 'explore' && (
          <div className="flex items-center gap-2 pointer-events-auto shrink-0">
            <button
              onClick={() => setActiveView('explore')}
              className="glass-panel px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold text-slate-800 hover:bg-white/95 shadow-xl transition-all cursor-pointer border border-white/80"
            >
              Back to Map
            </button>
          </div>
        )}
      </header>

      {/* Floating System Toast Alert */}
      {toastMessage && (
        <div className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300 px-4 w-full max-w-sm text-center">
          <div className="glass-panel bg-slate-900/90 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-2xl flex items-center justify-center gap-2 border border-emerald-400/40 text-xs font-semibold backdrop-blur-md mx-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};
