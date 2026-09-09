import React, { useState } from 'react';
import { Play, Star, X, Calendar, Ticket, Navigation, Check } from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';

export const DestinationDrawer: React.FC = () => {
  const {
    selectedDestination,
    isDrawerOpen,
    closeDrawer,
    setActiveView,
    setIsVirtualTourOpen,
  } = useMapStore();

  const [activeTab, setActiveTab] = useState<'bestTime' | 'entry' | 'routes'>('bestTime');
  const [isAddedToItinerary, setIsAddedToItinerary] = useState(false);

  if (!isDrawerOpen || !selectedDestination) return null;

  const handleAddToItinerary = () => {
    setIsAddedToItinerary(true);
    setTimeout(() => setIsAddedToItinerary(false), 2500);
  };

  const handleBookGuide = () => {
    setActiveView('planner');
  };

  return (
    <aside
      className="absolute top-24 right-5 bottom-6 w-[380px] lg:w-[410px] glass-panel rounded-3xl shadow-2xl flex flex-col overflow-hidden z-20 pointer-events-auto select-none transition-all duration-300 animate-in fade-in slide-in-from-right-8"
      aria-label="Landmark Details"
    >
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4">
        {/* Hero Card Image with Title Overlay */}
        <div className="relative h-56 rounded-2xl overflow-hidden shadow-md group">
          <img
            src={selectedDestination.coverImage}
            alt={selectedDestination.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={closeDrawer}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md"
            aria-label="Close Drawer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Bottom Title & Subtitle Overlay */}
          <div className="absolute bottom-3 left-4 right-4">
            <h2 className="text-xl font-extrabold text-white tracking-wide uppercase drop-shadow-md">
              {selectedDestination.name}
            </h2>
            <p className="text-[11px] font-semibold text-slate-200 tracking-wider uppercase mt-0.5 drop-shadow-sm">
              {selectedDestination.subtitle || `${selectedDestination.category?.name || 'HERITAGE'} | ${selectedDestination.district?.name || 'BANGLADESH'}`}
            </p>
          </div>
        </div>

        {/* Historical Chronicles */}
        <div className="space-y-1">
          <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider">
            HISTORICAL CHRONICLES
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            {selectedDestination.chronicles || selectedDestination.summary}
          </p>
        </div>

        {/* The Palace's Lore */}
        <div className="space-y-1">
          <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider">
            THE PALACE'S LORE
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            {selectedDestination.lore || selectedDestination.description}
          </p>
        </div>

        {/* Action & Media Row: 360° Tour, Historical Timeline Chips, Local Reviews */}
        <div className="grid grid-cols-3 gap-2 items-center pt-1">
          {/* 360° Virtual Tour Pill Button */}
          <button
            onClick={() => setIsVirtualTourOpen(true)}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white/60 hover:bg-white border border-slate-200/80 shadow-sm transition-all group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 transition-all shadow-sm">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span className="text-[9px] font-bold text-slate-800 mt-1 uppercase tracking-tight">
              360° Virtual Tour
            </span>
          </button>

          {/* Historical Timeline Mini Preview */}
          <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white/60 border border-slate-200/80 shadow-sm">
            <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
              HISTORICAL TIMELINE
            </span>
            <div className="flex items-center gap-1">
              {selectedDestination.gallery.slice(0, 3).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="timeline"
                  className="w-6 h-6 rounded-md object-cover border border-slate-300"
                />
              ))}
              {selectedDestination.gallery.length === 0 && (
                <div className="text-[10px] font-mono text-slate-500 font-bold">
                  1678 · 1888
                </div>
              )}
            </div>
          </div>

          {/* Local Reviews ⭐⭐⭐⭐⭐ */}
          <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white/60 border border-slate-200/80 shadow-sm">
            <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
              LOCAL REVIEWS
            </span>
            <div className="flex items-center gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[9px] font-bold text-slate-700 mt-0.5">
              5.0 ({selectedDestination.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Quick Tabs: BEST TIME TO VISIT | ENTRY DETAILS | TRAVEL ROUTES */}
        <div className="pt-1">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
            <button
              onClick={() => setActiveTab('bestTime')}
              className={`pb-1 transition-colors ${
                activeTab === 'bestTime'
                  ? 'text-emerald-700 border-b-2 border-emerald-500 font-black'
                  : 'hover:text-slate-900'
              }`}
            >
              BEST TIME TO VISIT
            </button>
            <button
              onClick={() => setActiveTab('entry')}
              className={`pb-1 transition-colors ${
                activeTab === 'entry'
                  ? 'text-emerald-700 border-b-2 border-emerald-500 font-black'
                  : 'hover:text-slate-900'
              }`}
            >
              ENTRY DETAILS
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`pb-1 transition-colors ${
                activeTab === 'routes'
                  ? 'text-emerald-700 border-b-2 border-emerald-500 font-black'
                  : 'hover:text-slate-900'
              }`}
            >
              TRAVEL ROUTES
            </button>
          </div>

          {/* Tab Content Box */}
          <div className="p-2.5 bg-white/50 rounded-xl mt-2 text-xs text-slate-700">
            {activeTab === 'bestTime' && (
              <div className="flex items-start gap-2">
                <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{selectedDestination.bestTimeToVisit || 'October to March (Mild weather)'}</span>
              </div>
            )}
            {activeTab === 'entry' && (
              <div className="flex items-start gap-2">
                <Ticket className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{selectedDestination.entryFee || 'Open 10:30 AM – 5:30 PM (Closed Thursdays)'}</span>
              </div>
            )}
            {activeTab === 'routes' && (
              <div className="flex items-start gap-2">
                <Navigation className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                <span>{selectedDestination.travelRoutesSummary || 'Easily accessible via local rickshaws and boats from Sadarghat terminal.'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons: ADD TO ITINERARY | BOOK GUIDE */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleAddToItinerary}
            className={`py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm ${
              isAddedToItinerary
                ? 'bg-emerald-600 text-white'
                : 'bg-white/80 hover:bg-white text-slate-800 border border-slate-200'
            }`}
          >
            {isAddedToItinerary ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>ADDED!</span>
              </>
            ) : (
              <span>ADD TO ITINERARY</span>
            )}
          </button>
          <button
            onClick={handleBookGuide}
            className="py-2.5 px-3 rounded-full text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <span>BOOK GUIDE</span>
          </button>
        </div>

        {/* User Contributions Section */}
        <div className="space-y-2 pt-2 border-t border-slate-200/60">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-extrabold text-slate-800 tracking-wide">
              user contributions
            </h4>
            <span className="text-[10px] text-slate-400 font-medium cursor-pointer hover:text-slate-600">
              recent all
            </span>
          </div>

          {/* Photo Thumbnails */}
          <div className="grid grid-cols-4 gap-1.5">
            {selectedDestination.gallery.concat([
              'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=200&q=80',
              'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=200&q=80',
              'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=200&q=80',
              'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=200&q=80',
            ]).slice(0, 4).map((imgUrl, idx) => (
              <div
                key={idx}
                className="h-14 rounded-xl overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-pointer border border-white"
              >
                <img
                  src={imgUrl}
                  alt={`contribution-${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Recent Comment Card */}
          <div className="p-2.5 bg-white/60 rounded-2xl border border-slate-200/80 flex items-start gap-2.5 mt-2">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"
              alt="reviewer"
              className="w-7 h-7 rounded-full object-cover border border-slate-300 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-slate-700">
                recent the comments
              </div>
              <p className="text-[11px] text-slate-600 leading-snug line-clamp-2 mt-0.5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed da eiusmod iannil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
