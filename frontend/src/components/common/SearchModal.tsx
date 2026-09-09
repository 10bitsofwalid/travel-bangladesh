import React, { useEffect, useRef } from 'react';
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

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in select-none">
      <div className="w-full max-w-xl glass-panel rounded-3xl p-5 shadow-2xl border border-white/90 space-y-4">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-slate-200/80 pb-3">
          <Search className="w-5 h-5 text-emerald-600" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search natural spots, heritage sites, eras, or districts in Bangladesh..."
            value={filter.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
          />
          {filter.searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={toggleSearch}
            className="text-xs font-mono px-2 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div className="space-y-1.5 max-h-60 overflow-y-auto">
            {results.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  selectDestination(item);
                  flyToLocation(item.longitude, item.latitude);
                  toggleSearch();
                }}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-white/60 hover:bg-white border border-slate-200/80 cursor-pointer transition-all shadow-sm group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm shrink-0">
                    <img
                      src={item.coverImage}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {item.name}
                      </h4>
                      {item.bnName && (
                        <span className="text-[10px] text-emerald-600 font-serif">
                          {item.bnName}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <span>{item.district?.name}, {item.division?.name}</span>
                      {item.heritageDetail?.unescoStatus === 'WORLD_HERITAGE_SITE' && (
                        <span className="text-[9px] font-bold px-1 rounded bg-blue-100 text-blue-700">
                          UNESCO
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>
            ))}
          </div>
        )}

        {/* Quick Search Suggestions */}
        <div className="space-y-2">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Popular Historical & Natural Destinations
          </p>
          <div className="flex flex-wrap gap-2">
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-white/70 hover:bg-white text-slate-700 border border-slate-200/80 shadow-sm transition-all"
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
