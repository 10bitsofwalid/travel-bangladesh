import React, { useEffect, useRef } from 'react';
import { Search, X, MapPin, Sparkles } from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, toggleSearch, filter, setSearchQuery } = useMapStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
      if (e.key === 'Escape' && isSearchOpen) {
        toggleSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, toggleSearch]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl glass-panel rounded-3xl p-5 shadow-2xl border border-white/10 space-y-4">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <Search className="w-5 h-5 text-emerald-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search natural spots, heritage sites, or districts in Bangladesh..."
            value={filter.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          {filter.searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={toggleSearch}
            className="text-xs font-mono px-2 py-1 rounded-lg bg-white/10 text-slate-300 hover:bg-white/20"
          >
            ESC
          </button>
        </div>

        {/* Quick Search Suggestions */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Popular Searches
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'Sajek Valley',
              'Sundarbans',
              'Paharpur',
              'Sixty Dome Mosque',
              'Tanguar Haor',
              'Lalbagh Fort',
              'Sylhet Tea Gardens',
              'Cox’s Bazar',
            ].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  toggleSearch();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs glass-panel-subtle text-slate-300 hover:text-emerald-300 hover:border-emerald-500/30 transition-all"
              >
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{term}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
