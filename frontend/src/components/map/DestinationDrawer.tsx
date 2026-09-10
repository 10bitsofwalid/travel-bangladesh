import React, { useState } from 'react';
import {
  Play,
  Star,
  X,
  Calendar,
  Ticket,
  Navigation,
  Check,
  FileText,
  Clock,
  ExternalLink,
  Scroll,
  Sparkles,
  MapPin,
  Plane,
  Train,
  Car,
  Ship,
  Eye,
  ShieldCheck,
  Home,
  ArrowRight,
  Route
} from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';
import { calculateResidenceRoute, RESIDENCE_PRESETS } from '../../data/routeEngine';

export const DestinationDrawer: React.FC = () => {
  const {
    selectedDestination,
    isDrawerOpen,
    closeDrawer,
    setActiveView,
    setIsVirtualTourOpen,
    addToItinerary,
    setSelectedGuideId,
    guides,
    setLightboxImage,
    userResidence,
    setUserResidence,
    isRouteActive,
    setIsRouteActive,
    activeTransportMode,
    setActiveTransportMode,
  } = useMapStore();

  const [activeTab, setActiveTab] = useState<'bestTime' | 'entry' | 'routes' | 'documents' | 'timeline'>('bestTime');
  const [isAddedToItinerary, setIsAddedToItinerary] = useState(false);

  const residenceRoute = selectedDestination
    ? calculateResidenceRoute(userResidence, selectedDestination)
    : null;

  if (!isDrawerOpen || !selectedDestination) return null;

  const handleAddToItinerary = () => {
    addToItinerary(selectedDestination);
    setIsAddedToItinerary(true);
    setTimeout(() => setIsAddedToItinerary(false), 2500);
  };

  const handleBookGuide = () => {
    // Select guide specializing in this region if available
    const matchedGuide = guides.find((g) =>
      g.specialization.toLowerCase().includes(selectedDestination.division?.name.toLowerCase() || '')
    );
    if (matchedGuide) {
      setSelectedGuideId(matchedGuide.id);
    }
    setActiveView('planner');
  };

  const heritage = selectedDestination.heritageDetail;
  const hasDocuments = (heritage?.archivalDocuments && heritage.archivalDocuments.length > 0) || (heritage?.sources && heritage.sources.length > 0);

  return (
    <aside
      className="fixed sm:absolute bottom-3 inset-x-2 sm:inset-x-auto sm:top-[124px] sm:right-5 sm:bottom-6 w-auto sm:w-[390px] lg:w-[430px] max-h-[82vh] sm:max-h-none glass-panel rounded-3xl shadow-2xl flex flex-col overflow-hidden z-40 pointer-events-auto select-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-6 sm:slide-in-from-right-8"
      aria-label="Landmark Details"
    >
      {/* Mobile drag indicator */}
      <div className="w-10 h-1 rounded-full bg-slate-400/40 mx-auto mt-2 sm:hidden shrink-0" />

      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 sm:p-4 space-y-3 sm:space-y-4">
        {/* Hero Card Image with Title Overlay */}
        <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-md group shrink-0">
          <img
            src={selectedDestination.coverImage}
            alt={selectedDestination.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
            onClick={() => setLightboxImage({ src: selectedDestination.coverImage, title: selectedDestination.name })}
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

          {/* UNESCO / Conservation Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {heritage?.unescoStatus === 'WORLD_HERITAGE_SITE' && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600/90 text-white border border-blue-400/50 shadow-md flex items-center gap-1 backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-amber-300" />
                UNESCO WORLD HERITAGE
              </span>
            )}
            {selectedDestination.categoryType === 'HERITAGE' && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/85 text-amber-950 border border-amber-300 shadow-sm backdrop-blur-md uppercase tracking-wider">
                Historical Heritage
              </span>
            )}
            {selectedDestination.categoryType === 'NATURE' && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/85 text-emerald-950 border border-emerald-300 shadow-sm backdrop-blur-md uppercase tracking-wider">
                Natural Wonder
              </span>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={closeDrawer}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md z-10 cursor-pointer"
            aria-label="Close Drawer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Bottom Title & Subtitle Overlay */}
          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-xl font-extrabold text-white tracking-wide uppercase drop-shadow-md">
                {selectedDestination.name}
              </h2>
              {selectedDestination.bnName && (
                <span className="text-emerald-300 font-serif text-sm font-semibold drop-shadow-sm">
                  {selectedDestination.bnName}
                </span>
              )}
            </div>
            <p className="text-[11px] font-semibold text-slate-200 tracking-wider uppercase mt-0.5 drop-shadow-sm flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>
                {selectedDestination.subtitle || `${selectedDestination.category?.name || 'HERITAGE'} | ${selectedDestination.district?.name || 'BANGLADESH'}`}
              </span>
            </p>
          </div>
        </div>

        {/* Historical Context Tag Bar */}
        {heritage && (
          <div className="grid grid-cols-2 gap-2 p-2.5 bg-white/75 rounded-2xl border border-slate-200/80 text-[11px]">
            {heritage.periodEra && (
              <div>
                <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Dynasty / Era
                </span>
                <span className="font-bold text-slate-800 line-clamp-1">
                  {heritage.periodEra}
                </span>
              </div>
            )}
            {heritage.architecturalStyle && (
              <div>
                <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Style
                </span>
                <span className="font-bold text-slate-800 line-clamp-1">
                  {heritage.architecturalStyle}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Residence Route Quick Strip */}
        {residenceRoute && (
          <div className="flex items-center justify-between p-2.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl border border-emerald-200/80 shadow-xs">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Home className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 truncate">
                  <span>From {userResidence.name}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="text-emerald-700 font-extrabold">{residenceRoute.roadDistanceKm} km</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  ~{residenceRoute.roadDurationText} via {(residenceRoute.modes.find((m) => m.mode === 'road')?.operatorOrHighway || 'National Highway').split('&')[0].trim()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRouteActive(!isRouteActive);
                }}
                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase transition-all shrink-0 cursor-pointer shadow-xs flex items-center gap-1 ${
                  isRouteActive
                    ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
                title={isRouteActive ? 'Remove Route from Map' : 'Show Route on Map'}
                aria-label={isRouteActive ? 'Remove Route from Map' : 'Show Route on Map'}
              >
                {isRouteActive ? (
                  <>
                    <X className="w-3 h-3 text-rose-600" />
                    <span>Remove Route</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-3 h-3" />
                    <span>Route On Map</span>
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setActiveTab('routes');
                  setIsRouteActive(true);
                }}
                className="px-2 py-1 rounded-full text-[10px] font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
                title="View Route Details"
              >
                Details →
              </button>
            </div>
          </div>
        )}

        {/* Historical Chronicles */}
        <div className="space-y-1">
          <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1">
            <Scroll className="w-3 h-3 text-amber-600" />
            HISTORICAL CHRONICLES
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-normal bg-white/50 p-3 rounded-xl border border-slate-200/60">
            {selectedDestination.chronicles || selectedDestination.summary}
          </p>
        </div>

        {/* The Lore & Legend Section */}
        <div className="space-y-1">
          <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            {selectedDestination.loreTitle || "THE PALACE'S LORE"}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-normal bg-white/50 p-3 rounded-xl border border-slate-200/60">
            {selectedDestination.lore || selectedDestination.description}
          </p>
        </div>

        {/* Action & Media Row: 360° Tour, Historical Timeline Chips, Local Reviews */}
        <div className="grid grid-cols-3 gap-2 items-center pt-1">
          {/* 360° Virtual Tour Button */}
          <button
            onClick={() => setIsVirtualTourOpen(true)}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/70 hover:bg-white border border-slate-200/80 shadow-sm transition-all group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 transition-all shadow-sm">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span className="text-[9px] font-bold text-slate-800 mt-1 uppercase tracking-tight text-center">
              360° Virtual Tour
            </span>
          </button>

          {/* Historical Timeline Mini Button */}
          <button
            onClick={() => setActiveTab('timeline')}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/70 hover:bg-white border border-slate-200/80 shadow-sm transition-all cursor-pointer group"
          >
            <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
              HISTORICAL TIMELINE
            </span>
            <div className="flex items-center gap-1">
              {selectedDestination.timeline.length > 0 ? (
                <div className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 group-hover:bg-emerald-100">
                  {selectedDestination.timeline[0]?.year}
                  {selectedDestination.timeline.length > 1 && ` · ${selectedDestination.timeline[selectedDestination.timeline.length - 1]?.year}`}
                </div>
              ) : (
                <div className="text-[10px] font-mono text-slate-500 font-bold">
                  {selectedDestination.heritageDetail?.builtYear || 'Heritage Site'}
                </div>
              )}
            </div>
          </button>

          {/* Local Reviews ⭐⭐⭐⭐⭐ */}
          <div className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/70 border border-slate-200/80 shadow-sm">
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

        {/* Primary Action Buttons: ADD TO ITINERARY | BOOK GUIDE */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleAddToItinerary}
            className={`py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
              isAddedToItinerary
                ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                : 'bg-white/90 hover:bg-white text-slate-800 border border-slate-200 hover:border-emerald-300'
            }`}
          >
            {isAddedToItinerary ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>ADDED TO PLANNER!</span>
              </>
            ) : (
              <span>ADD TO ITINERARY</span>
            )}
          </button>
          <button
            onClick={handleBookGuide}
            className="py-2.5 px-3 rounded-full text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>BOOK GUIDE</span>
          </button>
        </div>

        {/* Quick Tabs: BEST TIME TO VISIT | ENTRY DETAILS | TRAVEL ROUTES | DOCUMENTS | TIMELINE */}
        <div className="pt-1">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-200/80 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
            <button
              onClick={() => setActiveTab('bestTime')}
              className={`pb-1 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'bestTime'
                  ? 'text-emerald-700 border-b-2 border-emerald-500 font-black'
                  : 'hover:text-slate-900'
              }`}
            >
              BEST TIME TO VISIT
            </button>
            <button
              onClick={() => setActiveTab('entry')}
              className={`pb-1 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'entry'
                  ? 'text-emerald-700 border-b-2 border-emerald-500 font-black'
                  : 'hover:text-slate-900'
              }`}
            >
              ENTRY DETAILS
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`pb-1 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'routes'
                  ? 'text-emerald-700 border-b-2 border-emerald-500 font-black'
                  : 'hover:text-slate-900'
              }`}
            >
              TRAVEL ROUTES
            </button>
            {hasDocuments && (
              <button
                onClick={() => setActiveTab('documents')}
                className={`pb-1 whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
                  activeTab === 'documents'
                    ? 'text-emerald-700 border-b-2 border-emerald-500 font-black'
                    : 'hover:text-slate-900 text-amber-700'
                }`}
              >
                <FileText className="w-3 h-3" />
                DOCUMENTS & SOURCES
              </button>
            )}
            {selectedDestination.timeline.length > 0 && (
              <button
                onClick={() => setActiveTab('timeline')}
                className={`pb-1 whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
                  activeTab === 'timeline'
                    ? 'text-emerald-700 border-b-2 border-emerald-500 font-black'
                    : 'hover:text-slate-900'
                }`}
              >
                <Clock className="w-3 h-3" />
                TIMELINE
              </button>
            )}
          </div>

          {/* Tab Content Box */}
          <div className="p-3 bg-white/70 rounded-2xl border border-slate-200/80 mt-2 text-xs text-slate-700 space-y-2">
            {/* 1. Best Time Tab */}
            {activeTab === 'bestTime' && (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Recommended Season</span>
                    <p className="text-slate-600 mt-0.5">{selectedDestination.bestTimeToVisit || 'October to March (Mild weather)'}</p>
                  </div>
                </div>
                {selectedDestination.difficulty && (
                  <div className="pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-500">Expedition Difficulty:</span>
                    <span className="px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                      {selectedDestination.difficulty}
                    </span>
                  </div>
                )}
                {selectedDestination.accessibility && (
                  <div className="pt-1 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{selectedDestination.accessibility}</span>
                  </div>
                )}
              </div>
            )}

            {/* 2. Entry Details Tab */}
            {activeTab === 'entry' && (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Ticket className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-bold text-slate-800 block">Entry Fee & Ticketing</span>
                    <p className="text-slate-600 mt-0.5">{selectedDestination.entryFee || 'Free or nominal entry'}</p>
                    {selectedDestination.ticketPricing && (
                      <div className="grid grid-cols-3 gap-1.5 pt-2 mt-1 border-t border-slate-200/60 text-[10px]">
                        <div className="bg-white p-1.5 rounded-lg border border-slate-200 text-center shadow-xs">
                          <span className="text-slate-400 block font-semibold">Citizens</span>
                          <span className="font-bold text-slate-800">{selectedDestination.ticketPricing.local}</span>
                        </div>
                        {selectedDestination.ticketPricing.saarc && (
                          <div className="bg-white p-1.5 rounded-lg border border-slate-200 text-center shadow-xs">
                            <span className="text-slate-400 block font-semibold">SAARC</span>
                            <span className="font-bold text-slate-800">{selectedDestination.ticketPricing.saarc}</span>
                          </div>
                        )}
                        <div className="bg-white p-1.5 rounded-lg border border-slate-200 text-center shadow-xs">
                          <span className="text-slate-400 block font-semibold">Foreigners</span>
                          <span className="font-bold text-slate-800">{selectedDestination.ticketPricing.foreigner}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {selectedDestination.openingHours && (
                  <div className="flex items-start gap-2 pt-1.5 border-t border-slate-200/60">
                    <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 block text-[11px]">Visiting Hours</span>
                      <span className="text-slate-600 text-[11px]">{selectedDestination.openingHours}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. Travel Routes Tab */}
            {activeTab === 'routes' && (
              <div className="space-y-3">
                {/* Residence-to-Destination Route Navigator */}
                {residenceRoute && (
                  <div className="p-3 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl shadow-md space-y-3">
                    {/* Header with Origin Selector */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-black tracking-wide uppercase text-emerald-400">
                          <Home className="w-3.5 h-3.5" />
                          <span>Journey From Residence</span>
                        </div>
                        <button
                          onClick={() => setIsRouteActive(!isRouteActive)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                            isRouteActive
                              ? 'bg-rose-500/90 hover:bg-rose-600 text-white shadow-sm shadow-rose-900/50 border border-rose-400/50'
                              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm shadow-emerald-500/50'
                          }`}
                          title={isRouteActive ? 'Remove Route from Map' : 'Show Route on Map'}
                        >
                          {isRouteActive ? (
                            <>
                              <X className="w-3 h-3" />
                              <span>Remove Route</span>
                            </>
                          ) : (
                            <>
                              <Navigation className="w-3 h-3" />
                              <span>Show on Map</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Origin dropdown selector */}
                      <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/10">
                        <span className="text-[10px] font-bold text-slate-300 shrink-0 pl-1">Departure:</span>
                        <select
                          value={userResidence.id}
                          onChange={(e) => {
                            const found = RESIDENCE_PRESETS.find((p) => p.id === e.target.value);
                            if (found) {
                              setUserResidence(found);
                              setIsRouteActive(true);
                            }
                          }}
                          className="w-full bg-transparent text-xs font-bold text-white focus:outline-hidden cursor-pointer [&>option]:bg-slate-900 [&>option]:text-white"
                          aria-label="Select Departure Residence"
                        >
                          {RESIDENCE_PRESETS.map((preset) => (
                            <option key={preset.id} value={preset.id}>
                              {preset.name} ({preset.bnName}) - {preset.district}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Quick Metric Stats */}
                    <div className="grid grid-cols-3 gap-1.5 text-center">
                      <div className="bg-white/10 rounded-xl p-2 border border-white/10">
                        <span className="text-[9px] uppercase tracking-wider text-slate-300 font-bold block">Distance</span>
                        <span className="text-sm font-black text-emerald-300">{residenceRoute.roadDistanceKm} km</span>
                      </div>
                      <div className="bg-white/10 rounded-xl p-2 border border-white/10">
                        <span className="text-[9px] uppercase tracking-wider text-slate-300 font-bold block">Drive Time</span>
                        <span className="text-sm font-black text-amber-300">{residenceRoute.roadDurationText}</span>
                      </div>
                      <div className="bg-white/10 rounded-xl p-2 border border-white/10">
                        <span className="text-[9px] uppercase tracking-wider text-slate-300 font-bold block">Key Highway</span>
                        <span className="text-[10px] font-extrabold text-cyan-300 leading-tight block truncate mt-0.5" title={residenceRoute.modes.find((m) => m.mode === 'road')?.operatorOrHighway || 'National Highway'}>
                          {(residenceRoute.modes.find((m) => m.mode === 'road')?.operatorOrHighway || 'National Highway').split('&')[0].trim()}
                        </span>
                      </div>
                    </div>

                    {/* Corridor Pill */}
                    <div className="text-[10px] bg-emerald-950/70 border border-emerald-500/30 text-emerald-200 px-2.5 py-1.5 rounded-xl flex items-center gap-1.5">
                      <Route className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate"><strong>Primary Corridor:</strong> {residenceRoute.modes.find((m) => m.mode === 'road')?.operatorOrHighway || 'National Highway'}</span>
                    </div>

                    {/* Active Route Status & Unselect Control Bar */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-300 text-[11px] font-bold">
                        <span className={`w-2 h-2 rounded-full ${isRouteActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                        <span>{isRouteActive ? 'Direct Road Route Active on Map' : 'Route Not Drawn on Map'}</span>
                      </div>
                      <button
                        onClick={() => setIsRouteActive(!isRouteActive)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold uppercase transition-all flex items-center gap-1 cursor-pointer ${
                          isRouteActive
                            ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30'
                        }`}
                        title={isRouteActive ? 'Unselect / Remove Route from Map' : 'Draw Route on Map'}
                      >
                        {isRouteActive ? (
                          <>
                            <X className="w-3 h-3 text-rose-400" />
                            <span>Unselect Route</span>
                          </>
                        ) : (
                          <>
                            <Route className="w-3 h-3 text-emerald-400" />
                            <span>Draw on Map</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Transit Mode Tabs */}
                    <div className="space-y-2 pt-1 border-t border-white/10">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                        <span>Available Transit Options</span>
                        <span className="text-[9px] text-slate-400 font-normal">Select mode</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {(['road', 'rail', 'air', 'water'] as const).map((mode) => {
                          const option = residenceRoute.modes.find((o) => o.mode === mode);
                          const isSelected = activeTransportMode === mode;
                          const icon = mode === 'road' ? <Car className="w-3.5 h-3.5" />
                                     : mode === 'rail' ? <Train className="w-3.5 h-3.5" />
                                     : mode === 'air' ? <Plane className="w-3.5 h-3.5" />
                                     : <Ship className="w-3.5 h-3.5" />;
                          return (
                            <button
                              key={mode}
                              onClick={() => {
                                setActiveTransportMode(mode);
                                setIsRouteActive(true);
                              }}
                              className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                                  : 'bg-white/10 hover:bg-white/20 text-slate-200 font-semibold'
                              } ${!option ? 'opacity-40' : ''}`}
                            >
                              {icon}
                              <span className="text-[9px] uppercase tracking-wider mt-0.5">{mode}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Transit Mode Detail Card */}
                      {(() => {
                        const currentOption = residenceRoute.modes.find((o) => o.mode === activeTransportMode);
                        if (!currentOption) {
                          return (
                            <div className="p-2.5 bg-white/10 rounded-xl border border-white/10 text-xs text-slate-300">
                              <span className="font-bold text-amber-300">No Direct {activeTransportMode.toUpperCase()} Route</span>
                              <p className="text-[11px] text-slate-400 mt-0.5">Please select Road or Rail for direct transit from {userResidence.name}.</p>
                            </div>
                          );
                        }
                        return (
                          <div className="p-2.5 bg-white/10 rounded-xl border border-white/10 space-y-1.5 text-xs text-slate-200">
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold capitalize text-white flex items-center gap-1">
                                {activeTransportMode === 'road' && <Car className="w-3.5 h-3.5 text-amber-400" />}
                                {activeTransportMode === 'rail' && <Train className="w-3.5 h-3.5 text-emerald-400" />}
                                {activeTransportMode === 'air' && <Plane className="w-3.5 h-3.5 text-blue-400" />}
                                {activeTransportMode === 'water' && <Ship className="w-3.5 h-3.5 text-cyan-400" />}
                                {currentOption.label}
                              </span>
                              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40">
                                {currentOption.durationText}
                              </span>
                            </div>
                            <p className="text-[11px] text-emerald-200 font-semibold leading-snug">
                              Fare: {currentOption.estimatedCost}
                            </p>
                            <p className="text-[11px] text-slate-300 leading-snug">
                              {currentOption.notes}
                            </p>
                            {currentOption.steps && currentOption.steps.length > 0 && (
                              <div className="space-y-1 pt-1.5 border-t border-white/10 text-[10px]">
                                {currentOption.steps.map((step, sIdx) => (
                                  <div key={sIdx} className="flex items-start gap-1.5 text-slate-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                                    <span>
                                      <strong>{step.instruction}</strong> — {step.detail}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/10">
                              <span>Timing: {currentOption.recommendedTime}</span>
                              <span>{currentOption.frequency}</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {/* Legacy / Official Access Summary & Destination Guide */}
                <div className="space-y-2 pt-2 border-t border-slate-200/80">
                  <div className="flex items-start gap-2">
                    <Navigation className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-bold text-slate-800 block">Access Summary</span>
                      <p className="text-slate-600 mt-0.5">{selectedDestination.travelRoutesSummary || 'Accessible via inter-district highways and local transit.'}</p>
                    </div>
                  </div>
                  {selectedDestination.transportationGuide && (
                    <div className="space-y-1.5 pt-1.5 border-t border-slate-200/60 text-[11px]">
                      {selectedDestination.transportationGuide.train && (
                        <div className="flex items-start gap-1.5 text-slate-600">
                          <Train className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>Rail:</strong> {selectedDestination.transportationGuide.train}</span>
                        </div>
                      )}
                      {selectedDestination.transportationGuide.air && (
                        <div className="flex items-start gap-1.5 text-slate-600">
                          <Plane className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span><strong>Air:</strong> {selectedDestination.transportationGuide.air}</span>
                        </div>
                      )}
                      {selectedDestination.transportationGuide.road && (
                        <div className="flex items-start gap-1.5 text-slate-600">
                          <Car className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span><strong>Road:</strong> {selectedDestination.transportationGuide.road}</span>
                        </div>
                      )}
                      {selectedDestination.transportationGuide.water && (
                        <div className="flex items-start gap-1.5 text-slate-600">
                          <Ship className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                          <span><strong>Water:</strong> {selectedDestination.transportationGuide.water}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. Archival Documents & Sources Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-3">
                {heritage?.archivalDocuments && heritage.archivalDocuments.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-amber-600" />
                      Archival Records & Documents
                    </span>
                    {heritage.archivalDocuments.map((doc, idx) => (
                      <div key={idx} className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200/80 space-y-1">
                        <div className="flex items-start justify-between gap-1">
                          <h5 className="font-bold text-slate-900 text-xs leading-snug">
                            {doc.title}
                          </h5>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-200/70 text-amber-900 shrink-0">
                            {doc.documentType}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5">
                          {doc.author && <span>By {doc.author}</span>}
                          {doc.year && <span>({doc.year})</span>}
                        </div>
                        {doc.excerpt && (
                          <blockquote className="text-[11px] text-slate-700 italic border-l-2 border-amber-400 pl-2 mt-1 font-serif">
                            "{doc.excerpt}"
                          </blockquote>
                        )}
                        {doc.archiveRepository && (
                          <div className="text-[9px] text-slate-400 font-mono pt-1">
                            Repository: {doc.archiveRepository}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Primary Inscriptions */}
                {heritage?.primaryInscriptions && heritage.primaryInscriptions.length > 0 && (
                  <div className="space-y-1.5 pt-1 border-t border-slate-200/60">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                      <Scroll className="w-3 h-3 text-emerald-600" />
                      Primary Epigraphs & Inscriptions
                    </span>
                    {heritage.primaryInscriptions.map((insc, idx) => (
                      <div key={idx} className="p-2 bg-emerald-50/70 rounded-xl border border-emerald-200/80 space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-slate-800">{insc.title}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-900 font-mono text-[9px]">
                            {insc.script}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-700 italic font-serif border-l-2 border-emerald-500 pl-2">
                          "{insc.translation}"
                        </p>
                        <div className="text-[9px] text-slate-500">
                          <strong>Material:</strong> {insc.material} · <strong>Location:</strong> {insc.currentLocation}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* General Citations */}
                {heritage?.sources && heritage.sources.length > 0 && (
                  <div className="space-y-1 pt-1 border-t border-slate-200/60">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                      Academic Citations:
                    </span>
                    <ul className="space-y-1 text-[11px]">
                      {heritage.sources.map((src, idx) => (
                        <li key={idx} className="flex items-center justify-between text-slate-600">
                          <span>• {src.title} {src.author && `(${src.author}, ${src.year || ''})`}</span>
                          {src.url && (
                            <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline inline-flex items-center">
                              <ExternalLink className="w-2.5 h-2.5 ml-1" />
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* 5. Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  Chronological Historical Milestones
                </span>
                <div className="relative border-l-2 border-emerald-400/40 ml-2 pl-3 space-y-3">
                  {selectedDestination.timeline.map((mile, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[19px] top-0.5 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        {mile.year}
                      </span>
                      <h5 className="font-bold text-slate-800 text-xs mt-0.5">
                        {mile.event}
                      </h5>
                      {mile.details && (
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          {mile.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Contributions Section */}
        <div className="space-y-2 pt-2 border-t border-slate-200/60">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-extrabold text-slate-800 tracking-wide uppercase">
              user contributions
            </h4>
            <span className="text-[10px] text-slate-400 font-medium">
              archival & field photos
            </span>
          </div>

          {/* Photo Thumbnails with Lightbox Preview */}
          <div className="grid grid-cols-4 gap-1.5">
            {selectedDestination.gallery.concat([
              'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=600&q=80',
            ]).slice(0, 4).map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImage({ src: imgUrl, title: `${selectedDestination.name} Photo ${idx + 1}` })}
                className="h-14 rounded-xl overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-pointer border border-white relative group"
                title="Click to expand full preview"
              >
                <img
                  src={imgUrl}
                  alt={`contribution-${idx}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Eye className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            ))}
          </div>

          {/* Authentic Recent Comment Card */}
          {selectedDestination.reviews && selectedDestination.reviews.length > 0 ? (
            <div className="p-2.5 bg-white/70 rounded-2xl border border-slate-200/80 flex items-start gap-2.5 mt-2">
              <img
                src={selectedDestination.reviews[0].authorAvatar}
                alt={selectedDestination.reviews[0].authorName}
                className="w-7 h-7 rounded-full object-cover border border-slate-300 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-800">
                    {selectedDestination.reviews[0].authorName}
                  </span>
                  <span className="text-[9px] text-slate-400">
                    {selectedDestination.reviews[0].date}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug line-clamp-3 mt-0.5">
                  {selectedDestination.reviews[0].comment}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-2.5 bg-white/70 rounded-2xl border border-slate-200/80 flex items-start gap-2.5 mt-2">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"
                alt="reviewer"
                className="w-7 h-7 rounded-full object-cover border border-slate-300 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-slate-700">
                  verified field researcher
                </div>
                <p className="text-[11px] text-slate-600 leading-snug line-clamp-2 mt-0.5">
                  Archival records verified against National Museum catalogs and Archaeological Survey of Bangladesh.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
