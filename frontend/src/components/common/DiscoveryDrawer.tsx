import React from 'react';
import { X, MapPin, Calendar, Compass, ShieldCheck, ExternalLink, Sparkles, Footprints } from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';

export const DiscoveryDrawer: React.FC = () => {
  const { selectedDestination, isDrawerOpen, closeDrawer } = useMapStore();

  if (!isDrawerOpen || !selectedDestination) {
    return null;
  }

  const isHeritage = selectedDestination.heritageDetail !== undefined;

  return (
    <aside
      className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:top-24 sm:w-[420px] max-h-[85vh] sm:max-h-none z-40 flex flex-col glass-panel rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-6 sm:slide-in-from-right-6 pointer-events-auto"
      aria-label="Destination Details"
    >
      {/* Cover Image Header */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-950">
        <img
          src={selectedDestination.coverImage}
          alt={selectedDestination.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />

        {/* Close Button */}
        <button
          onClick={closeDrawer}
          className="absolute top-3 right-3 p-2 rounded-full glass-panel text-slate-300 hover:text-white hover:bg-white/20 transition-all shadow-lg"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category Badge & UNESCO Indicator */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md ${
              isHeritage
                ? 'bg-amber-500/80 text-amber-950 border border-amber-300'
                : 'bg-emerald-500/80 text-emerald-950 border border-emerald-300'
            }`}
          >
            {isHeritage ? 'Historical Heritage' : 'Natural Wonder'}
          </span>

          {selectedDestination.heritageDetail?.unescoStatus === 'WORLD_HERITAGE_SITE' && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-600/90 text-white border border-blue-400/50 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              UNESCO World Heritage
            </span>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 overflow-y-auto space-y-4">
        {/* Title & Bengali Script */}
        <div>
          <h2 className="text-2xl font-display font-extrabold text-white leading-tight">
            {selectedDestination.name}
          </h2>
          {selectedDestination.bnName && (
            <p className="text-emerald-400 font-serif text-lg mt-0.5">
              {selectedDestination.bnName}
            </p>
          )}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>
              {selectedDestination.district?.name ?? 'Bangladesh'}, {selectedDestination.division?.name}
            </span>
          </div>
        </div>

        {/* Summary Description */}
        <p className="text-sm text-slate-300 leading-relaxed">
          {selectedDestination.summary}
        </p>

        {/* Quick Travel Facts */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          {selectedDestination.bestTimeToVisit && (
            <div className="glass-panel-subtle p-3 rounded-xl">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Best Season</span>
              </div>
              <p className="text-xs font-semibold text-slate-200 mt-1">
                {selectedDestination.bestTimeToVisit}
              </p>
            </div>
          )}

          {selectedDestination.difficulty && (
            <div className="glass-panel-subtle p-3 rounded-xl">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <Footprints className="w-3.5 h-3.5 text-emerald-400" />
                <span>Difficulty</span>
              </div>
              <p className="text-xs font-semibold text-slate-200 mt-1">
                {selectedDestination.difficulty}
              </p>
            </div>
          )}
        </div>

        {/* Heritage Section if Available */}
        {selectedDestination.heritageDetail && (
          <div className="p-4 rounded-2xl glass-panel-amber border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Historical Context
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 font-mono">
                {selectedDestination.heritageDetail.verificationStatus.replace(/_/g, ' ')}
              </span>
            </div>

            {selectedDestination.heritageDetail.periodEra && (
              <p className="text-xs text-amber-100/90 font-medium">
                <strong className="text-amber-300 font-semibold">Era / Dynasty:</strong>{' '}
                {selectedDestination.heritageDetail.periodEra}
              </p>
            )}

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedDestination.heritageDetail.historicalSignificance}
            </p>

            {selectedDestination.heritageDetail.sources.length > 0 && (
              <div className="pt-2 border-t border-amber-500/20">
                <p className="text-[10px] font-semibold text-amber-300/80 mb-1">
                  Historical Citations & References:
                </p>
                <ul className="space-y-1">
                  {selectedDestination.heritageDetail.sources.map((src, idx) => (
                    <li key={idx} className="text-[11px] text-slate-300 flex items-center gap-1">
                      <span className="text-amber-400 font-mono">•</span>
                      <span>{src.title} ({src.author ?? 'Archives'})</span>
                      {src.url && (
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-400 hover:underline inline-flex items-center ml-1"
                        >
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Action Bar */}
      <div className="p-4 border-t border-white/10 glass-panel-subtle flex items-center gap-3">
        <button
          onClick={() => {
            alert(`Planning route to ${selectedDestination.name}... (Task 7 Itinerary Integration)`);
          }}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60"
        >
          <Compass className="w-4 h-4" />
          <span>Add to Trip Plan</span>
        </button>
      </div>
    </aside>
  );
};
