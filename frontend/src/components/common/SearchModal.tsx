import React, { useEffect, useRef, useState } from 'react';
import { Search, X, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';
import { INITIAL_LANDMARKS } from '../../data/mockData';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    toggleSearch,
    filter,
    setSearchQuery,
    selectDestination,
    flyToLocation,
  } = useMapStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results = filter.searchQuery.trim()
    ? INITIAL_LANDMARKS.filter((item) => {
        const q = filter.searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          (item.bnName && item.bnName.toLowerCase().includes(q)) ||
          (item.district?.name && item.district.name.toLowerCase().includes(q)) ||
          (item.division?.name && item.division.name.toLowerCase().includes(q)) ||
          (item.heritageDetail?.periodEra && item.heritageDetail.periodEra.toLowerCase().includes(q)) ||
          (item.heritageDetail?.architecturalStyle && item.heritageDetail.architecturalStyle.toLowerCase().includes(q)) ||
          (item.category?.name && item.category.name.toLowerCase().includes(q)) ||
          item.summary.toLowerCase().includes(q)
        );
      })
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
      if (e.key === 'Escape' && isSearchOpen) {
        toggleSearch();
      }
      if (isSearchOpen && results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % results.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const target = results[selectedIndex] || results[0];
          if (target) {
            selectDestination(target);
            flyToLocation(target.longitude, target.latitude, 9.5);
            toggleSearch();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, toggleSearch, results, selectedIndex, selectDestination, flyToLocation]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-24 px-3 sm:px-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) toggleSearch();
      }}
    >
      <div className="w-full max-w-xl glass-panel rounded-3xl p-4 sm:p-5 shadow-2xl border border-white/90 space-y-3 sm:space-y-4 max-h-[88vh] flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center gap-2 sm:gap-3 border-b border-slate-200/80 pb-2.5 sm:pb-3 shrink-0">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search natural spots, heritage sites, eras, or districts..."
            value={filter.searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium min-w-0"
          />
          {filter.searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
          <button
            onClick={toggleSearch}
            className="text-[10px] sm:text-xs font-mono px-2 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 cursor-pointer shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div className="space-y-1.5 max-h-52 sm:max-h-64 overflow-y-auto pr-1">
            {results.map((item, idx) => {
              const isHighlighted = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    selectDestination(item);
                    flyToLocation(item.longitude, item.latitude, 9.5);
                    toggleSearch();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-2xl border cursor-pointer transition-all shadow-sm group ${
                    isHighlighted
                      ? 'bg-white border-emerald-400 ring-2 ring-emerald-400/30'
                      : 'bg-white/60 hover:bg-white border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm shrink-0">
                      <img
                        src={item.coverImage}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                          {item.name}
                        </h4>
                        {item.bnName && (
                          <span className="text-[10px] text-emerald-600 font-serif shrink-0">
                            {item.bnName}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1.5 truncate">
                        <span>{item.district?.name}, {item.division?.name}</span>
                        {item.heritageDetail?.unescoStatus === 'WORLD_HERITAGE_SITE' && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 shrink-0">
                            UNESCO
                          </span>
                        )}
                        {item.heritageDetail?.periodEra && (
                          <span className="text-[10px] text-slate-400 italic truncate">
                            • {item.heritageDetail.periodEra}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state if search term entered but no results */}
        {filter.searchQuery.trim() && results.length === 0 && (
          <div className="p-4 text-center text-xs text-slate-500">
            No landmarks found matching "{filter.searchQuery}". Try searching by division, era, or category.
          </div>
        )}

        {/* Quick Search Suggestions */}
        <div className="space-y-2 pt-1 border-t border-slate-200/60">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Popular Historical & Natural Destinations
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Ahsan Manzil',
              'Lalbagh Fort',
              'Somapura Mahavihara',
              'Sixty Dome Mosque',
              'Sundarbans',
              'Mahasthangarh',
              'Kantajew Temple',
              'Panam City',
              'Sajek Valley',
              'Kuakata',
            ].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs bg-white/70 hover:bg-white text-slate-700 border border-slate-200/80 shadow-sm transition-all cursor-pointer hover:border-emerald-300"
              >
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>{term}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
