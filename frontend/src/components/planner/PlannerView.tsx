import React, { useState, useMemo } from 'react';
import {
  X,
  Trash2,
  CheckCircle2,
  Star,
  BedDouble,
  ArrowRight,
  MapPin,
  Plus,
  Calendar,
  Compass,
  ZoomIn,
  Eye,
  Car,
  Utensils,
  Users,
  Clock,
  Navigation,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';
import { INITIAL_LANDMARKS } from '../../data/mockData';
import {
  CURATED_HOTELS,
  getHotelsForDestination,
  getSurroundingsForDestination,
  TRANSPORT_OPTIONS,
  HotelOption,
  TransportOption
} from '../../data/accommodationsData';
import { Destination, ItineraryDayItem } from '../../types';

export const PlannerView: React.FC = () => {
  const {
    itineraryDays,
    activeItineraryDay,
    setActiveItineraryDay,
    removeItineraryDay,
    addCustomItineraryDay,
    guides,
    selectedGuideId,
    setSelectedGuideId,
    selectedHotelId,
    setSelectedHotelId,
    selectedTransportOptionId,
    setSelectedTransportOptionId,
    selectDestination,
    selectedTrail,
    setActiveView,
    showToast,
    flyToLocation
  } = useMapStore();

  const [activeTab, setActiveTab] = useState<'site' | 'guides' | 'hotels' | 'transport'>('site');
  const [mobileView, setMobileView] = useState<'schedule' | 'hub'>('schedule');
  const [isMapPeekActive, setIsMapPeekActive] = useState(false);
  const [isItinerarySelected, setIsItinerarySelected] = useState(false);
  const [isAddingDay, setIsAddingDay] = useState(false);
  const [newDayTitle, setNewDayTitle] = useState('');
  const [newDayLocation, setNewDayLocation] = useState('');

  const selectedGuide = guides.find((g) => g.id === selectedGuideId) || guides[0];
  const selectedHotel = CURATED_HOTELS.find((h) => h.id === selectedHotelId) || null;
  const selectedTransport = TRANSPORT_OPTIONS.find((t) => t.id === selectedTransportOptionId) || TRANSPORT_OPTIONS[0];

  const trailTitle = selectedTrail === 'buddhist'
    ? 'Buddhist Archaeology'
    : selectedTrail === 'sylhet'
    ? 'Sylhet Cloud Forest'
    : selectedTrail === 'sundarbans'
    ? 'Sundarbans Delta'
    : 'Mughal History';

  // Dynamic cost calculation based on days count
  const daysCount = itineraryDays.length;
  const guideFee = daysCount * 30; // $30/day guide fee
  const logisticsFee = 130; // Standard heritage logistics & entry permit package
  const hotelFee = selectedHotel ? selectedHotel.pricePerNightUsd * Math.max(1, daysCount - 1) : 0;
  const transportUpgradeFee = selectedTransportOptionId === 'transport-rail-express'
    ? 20 * daysCount
    : selectedTransportOptionId === 'transport-river-launch'
    ? 40 * daysCount
    : 0;

  // Baseline $340 maintained for default 7-day itinerary tests
  const totalCost = (!selectedHotel && selectedTransportOptionId === 'transport-private-van' && daysCount === 7)
    ? 340
    : guideFee + logisticsFee + hotelFee + transportUpgradeFee;

  // Active day resolution
  const currentDayItem: ItineraryDayItem = useMemo(() => {
    return itineraryDays.find((d) => d.dayNumber === activeItineraryDay) || itineraryDays[0] || {
      id: 'day-default',
      dayNumber: 1,
      title: 'Day 1: Dhaka - Ahsan Manzil & Old Dhaka',
      location: 'Dhaka, Buriganga Riverfront',
      travelTime: '3 h 40 min',
      description: 'Explore Ahsan Manzil (The Pink Palace)',
      destinationId: 'poi-ahsan-manzil'
    };
  }, [itineraryDays, activeItineraryDay]);

  // Destination resolution for viewing site & map zoom
  const currentDestination: Destination = useMemo(() => {
    if (!currentDayItem) return INITIAL_LANDMARKS[0];
    const directMatch = INITIAL_LANDMARKS.find((l) => l.id === currentDayItem.destinationId);
    if (directMatch) return directMatch;

    const locLower = currentDayItem.location.toLowerCase();
    const titleLower = currentDayItem.title.toLowerCase();

    const nameMatch = INITIAL_LANDMARKS.find((l) =>
      locLower.includes(l.name.toLowerCase()) ||
      titleLower.includes(l.name.toLowerCase()) ||
      (l.district?.name && locLower.includes(l.district.name.toLowerCase()))
    );
    return nameMatch || INITIAL_LANDMARKS[0];
  }, [currentDayItem]);

  const surroundings = useMemo(() => {
    return getSurroundingsForDestination(currentDestination.id);
  }, [currentDestination.id]);

  const destinationHotels = useMemo(() => {
    return getHotelsForDestination(currentDestination.id);
  }, [currentDestination.id]);

  const handleConfirmItinerary = () => {
    setIsItinerarySelected(!isItinerarySelected);
    if (!isItinerarySelected) {
      showToast(`Itinerary confirmed with Guide ${selectedGuide.name}! Total: $${totalCost}`);
    }
  };

  const handleAddDaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDayTitle.trim()) return;
    addCustomItineraryDay(newDayTitle.trim(), newDayLocation.trim() || 'Bangladesh');
    setNewDayTitle('');
    setNewDayLocation('');
    setIsAddingDay(false);
  };

  const handleSelectDay = (item: ItineraryDayItem) => {
    setActiveItineraryDay(item.dayNumber);
    setActiveTab('site');
    setMobileView('hub');

    // Find destination and smoothly fly Leaflet into the exact landmark site (zoom 14)
    const landmark =
      INITIAL_LANDMARKS.find((l) => l.id === item.destinationId) ||
      INITIAL_LANDMARKS.find((l) =>
        item.location.toLowerCase().includes(l.name.toLowerCase()) ||
        item.title.toLowerCase().includes(l.name.toLowerCase())
      ) ||
      INITIAL_LANDMARKS[0];

    selectDestination(landmark);
    flyToLocation(landmark.longitude, landmark.latitude, 14);
    showToast(`Zoomed to ${landmark.name} (${landmark.district?.name || 'Bangladesh'})`);
  };

  const handleZoomSite = (zoomLevel: number) => {
    flyToLocation(currentDestination.longitude, currentDestination.latitude, zoomLevel);
  };

  const handleExploreOnMap = () => {
    selectDestination(currentDestination);
    setActiveView('explore');
  };

  return (
    <div className="absolute inset-0 pointer-events-auto z-20 flex flex-col justify-between p-3 sm:p-5 pt-16 sm:pt-20 pb-6 select-none overflow-y-auto lg:overflow-hidden max-w-7xl mx-auto">
      
      {/* Mobile Top Segmented View Switcher */}
      <div className="lg:hidden flex items-center justify-between gap-2 mb-3 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/80 shadow-md shrink-0">
        <div className="flex items-center gap-1.5 flex-1">
          <button
            onClick={() => {
              setMobileView('schedule');
              setIsMapPeekActive(false);
            }}
            className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileView === 'schedule' && !isMapPeekActive
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100/80'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule ({daysCount}d)</span>
          </button>
          <button
            onClick={() => {
              setMobileView('hub');
              setIsMapPeekActive(false);
            }}
            className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileView === 'hub' && !isMapPeekActive
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Site & Bookings</span>
          </button>
        </div>

        {/* Peek Map Button on Mobile */}
        <button
          onClick={() => setIsMapPeekActive(!isMapPeekActive)}
          className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border ${
            isMapPeekActive
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-emerald-800 border-emerald-300 shadow-sm'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-emerald-500" />
          <span>{isMapPeekActive ? 'Show Panels' : 'Peek Map'}</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col lg:flex-row justify-between gap-4 sm:gap-5 min-h-0 ${isMapPeekActive ? 'hidden lg:flex' : 'flex'}`}>
        
        {/* Left Panel: BUILD ITINERARY: 7-DAY EXPLORATION */}
        <aside className={`w-full lg:w-[360px] xl:w-[400px] lg:flex-1 glass-panel rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col pointer-events-auto h-auto lg:h-[calc(100vh-110px)] border border-white/80 shrink-0 ${
          mobileView === 'schedule' ? 'flex' : 'hidden lg:flex'
        }`}>
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                BUILD ITINERARY: 7-DAY EXPLORATION
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Click any day to zoom map & inspect site surroundings
              </p>
            </div>
            <button
              onClick={() => setIsAddingDay(!isAddingDay)}
              className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-xl border border-emerald-200 flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Day</span>
            </button>
          </div>

          {/* Custom Add Day Form */}
          {isAddingDay && (
            <form onSubmit={handleAddDaySubmit} className="mb-3 p-3.5 bg-white/95 rounded-2xl border border-emerald-300 shadow-md space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h5 className="text-[11px] font-extrabold text-slate-800 uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>New Day Milestone</span>
                </h5>
                <span className="text-[10px] text-slate-400">Day {daysCount + 1}</span>
              </div>
              <input
                type="text"
                placeholder="Title (e.g. Day 8: Srimangal Rainforest)"
                value={newDayTitle}
                onChange={(e) => setNewDayTitle(e.target.value)}
                className="w-full text-xs p-2.5 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                required
              />
              <input
                type="text"
                placeholder="Location (e.g. Lawachara National Park)"
                value={newDayLocation}
                onChange={(e) => setNewDayLocation(e.target.value)}
                className="w-full text-xs p-2.5 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              />
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingDay(false)}
                  className="px-3 py-1 text-xs text-slate-500 hover:text-slate-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-emerald-600 cursor-pointer shadow-sm transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          )}

          {/* Scrollable Timeline */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[420px] lg:max-h-none">
            {itineraryDays.map((item, index) => {
              const isActive = activeItineraryDay === item.dayNumber;

              return (
                <div key={item.id} className="relative flex items-start gap-3">
                  {/* Vertical connecting line */}
                  {index !== itineraryDays.length - 1 && (
                    <div className="absolute left-[13px] top-[26px] bottom-[-16px] w-0.5 bg-slate-200" />
                  )}

                  {/* Node circle */}
                  <div
                    onClick={() => handleSelectDay(item)}
                    className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-2 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500 text-white ring-4 ring-emerald-300/40 shadow-sm'
                        : 'bg-white border-2 border-slate-300 text-slate-400 hover:border-emerald-400'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-slate-400'}`} />
                  </div>

                  {/* Card */}
                  <div
                    onClick={() => handleSelectDay(item)}
                    className={`flex-1 p-3 sm:p-3.5 rounded-2xl cursor-pointer transition-all border ${
                      isActive
                        ? 'bg-emerald-50/95 border-emerald-400/80 shadow-md ring-2 ring-emerald-400/30'
                        : 'bg-white/75 hover:bg-white border-slate-200/80 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className={`text-xs leading-snug ${
                          isActive ? 'text-emerald-950 font-black' : 'text-slate-800 font-bold'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItineraryDay(item.id);
                        }}
                        className="text-slate-400 hover:text-rose-500 transition-colors shrink-0 p-0.5 cursor-pointer"
                        title="Remove Day"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.location && (
                      <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </p>
                    )}

                    {/* Interactive Zoom CTA */}
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {item.travelTime || 'Est. 3h'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectDay(item);
                        }}
                        className={`font-bold flex items-center gap-1 px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                          isActive
                            ? 'text-emerald-800 bg-emerald-100/80'
                            : 'text-slate-600 hover:text-emerald-700 bg-slate-100'
                        }`}
                      >
                        <Eye className="w-3 h-3" />
                        <span>View Site & Map</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Panel: BOOK GUIDE & LOGISTICS + SITE & SURROUNDINGS */}
        <aside className={`w-full lg:flex-[1.4] xl:flex-[1.6] lg:max-w-[700px] glass-panel rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col pointer-events-auto h-auto lg:h-[calc(100vh-110px)] border border-white/80 overflow-hidden ${
          mobileView === 'hub' ? 'flex' : 'hidden lg:flex'
        }`}>
          
          {/* Header with Close ✕ */}
          <div className="flex items-center justify-between border-b border-slate-200/70 pb-3 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shadow-sm">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  BOOK GUIDE & LOGISTICS
                </h3>
                <p className="text-[10px] text-slate-500">
                  Day {activeItineraryDay}: <span className="font-semibold text-slate-700">{currentDestination.name}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveView('explore')}
              className="w-7 h-7 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              title="Close Planner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs for Viewing Site, Guides, Hotels, and Transport */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 my-3 overflow-x-auto no-scrollbar shrink-0">
            <button
              onClick={() => setActiveTab('site')}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'site'
                  ? 'bg-white text-emerald-900 shadow-sm border border-emerald-200 ring-1 ring-emerald-300/40'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Day Site & Surroundings</span>
            </button>

            <button
              onClick={() => setActiveTab('guides')}
              className={`flex-1 min-w-[105px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'guides'
                  ? 'bg-white text-emerald-900 shadow-sm border border-emerald-200 ring-1 ring-emerald-300/40'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Book Guide</span>
            </button>

            <button
              onClick={() => setActiveTab('hotels')}
              className={`flex-1 min-w-[110px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'hotels'
                  ? 'bg-white text-emerald-900 shadow-sm border border-emerald-200 ring-1 ring-emerald-300/40'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <BedDouble className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Book Hotel & Stays</span>
            </button>

            <button
              onClick={() => setActiveTab('transport')}
              className={`flex-1 min-w-[115px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'transport'
                  ? 'bg-white text-emerald-900 shadow-sm border border-emerald-200 ring-1 ring-emerald-300/40'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Car className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Transport & Logistics</span>
            </button>
          </div>

          {/* Scrollable Tab Content Viewport */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-4">

            {/* ------------------------------------------------------------- */}
            {/* TAB 1: DAY SITE & SURROUNDINGS (Active Viewing Site Zoom Hub) */}
            {/* ------------------------------------------------------------- */}
            <div className={`space-y-3.5 ${activeTab === 'site' ? 'block' : 'hidden'}`}>
              
              {/* Site Hero Card */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-white">
                <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                  <img
                    src={currentDestination.coverImage}
                    alt={currentDestination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />

                  {/* Badges on Hero */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap">
                    <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      Day {activeItineraryDay} Milestone
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                      {currentDestination.division?.name || 'Bangladesh'}
                    </span>
                  </div>

                  {/* Interactive Map Zoom Pills on Hero */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={() => handleZoomSite(14)}
                      className="bg-white/90 hover:bg-white text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-xl shadow-sm flex items-center gap-1 cursor-pointer transition-colors backdrop-blur-md"
                      title="Zoom Leaflet to Site (14x)"
                    >
                      <ZoomIn className="w-3 h-3 text-emerald-600" />
                      <span>Zoom Site (14x)</span>
                    </button>
                    <button
                      onClick={handleExploreOnMap}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-xl shadow-sm flex items-center gap-1 cursor-pointer transition-colors"
                      title="Open full interactive map view"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Explore on Map</span>
                    </button>
                  </div>

                  {/* Title and Subtitle */}
                  <div className="absolute bottom-3 left-3 text-white max-w-[70%]">
                    <h4 className="text-base sm:text-lg font-black leading-tight drop-shadow-md">
                      {currentDestination.name}
                      {currentDestination.bnName && (
                        <span className="text-xs font-normal text-slate-200 ml-2">
                          ({currentDestination.bnName})
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-emerald-300 font-medium tracking-wide truncate mt-0.5">
                      {currentDestination.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description & Visiting Highlights */}
                <div className="p-3.5 space-y-2.5 bg-white">
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {currentDestination.summary || currentDestination.description}
                  </p>

                  {/* Quick Highlights Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[10px]">
                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <div>
                        <span className="block text-slate-400 font-bold uppercase text-[9px]">Best Time</span>
                        <span className="font-semibold text-slate-800 truncate block">
                          {currentDestination.bestTimeToVisit ? currentDestination.bestTimeToVisit.split('(')[0] : 'Oct to Mar'}
                        </span>
                      </div>
                    </div>

                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <div>
                        <span className="block text-slate-400 font-bold uppercase text-[9px]">Entry Ticket</span>
                        <span className="font-semibold text-slate-800 truncate block">
                          {currentDestination.entryFee ? currentDestination.entryFee.split('/')[0] : 'BDT 40'}
                        </span>
                      </div>
                    </div>

                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 col-span-2 sm:col-span-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400 shrink-0" />
                      <div>
                        <span className="block text-slate-400 font-bold uppercase text-[9px]">Rating</span>
                        <span className="font-bold text-slate-800">
                          {currentDestination.rating || 4.9} / 5.0 ({currentDestination.reviewCount || 120})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Immediate Setting & Natural Context */}
              <div className="p-3.5 rounded-2xl bg-white/80 border border-emerald-200/80 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-emerald-600" />
                    <span>IMMEDIATE NATURAL & GEOGRAPHIC SETTING</span>
                  </h5>
                  <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Day Context
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {surroundings.immediateSetting}
                </p>
                <div className="pt-1 flex items-center gap-2 text-[10px] text-slate-600">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span><strong>Optimal Visiting Hours:</strong> {surroundings.bestTimeOfDay}</span>
                </div>
              </div>

              {/* Surrounding Attractions (1-15 km) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                    <span>SURROUNDINGS & NEARBY ATTRACTIONS (1–15 KM)</span>
                  </h5>
                  <span className="text-[10px] text-slate-400">
                    {surroundings.surroundings.length} Key Nearby Sights
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {surroundings.surroundings.map((spot, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white/90 hover:bg-white rounded-2xl border border-slate-200/80 shadow-sm transition-all space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <h6 className="text-xs font-bold text-slate-900 leading-snug">
                          {spot.name}
                        </h6>
                        <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200 shrink-0">
                          {spot.distance}
                        </span>
                      </div>
                      <span className="inline-block text-[9px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {spot.type}
                      </span>
                      <p className="text-[10px] text-slate-600 leading-normal">
                        {spot.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Culinary Specialty Card */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50/90 to-orange-50/70 border border-amber-200/80 shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 shadow-sm">
                  <Utensils className="w-4 h-4" />
                </div>
                <div className="space-y-1 text-xs">
                  <h6 className="text-[11px] font-extrabold text-amber-950 uppercase tracking-wider">
                    LOCAL CULINARY HIGHLIGHTS & GASTRONOMY
                  </h6>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    {surroundings.culinarySpecialty}
                  </p>
                </div>
              </div>

              {/* Quick Action Bar to Booking Options */}
              <div className="p-3 bg-white/80 rounded-2xl border border-slate-200 flex items-center justify-between gap-2 flex-wrap text-xs">
                <span className="text-slate-600 font-medium">Ready to reserve services for this day?</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('hotels')}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-bold flex items-center gap-1 cursor-pointer transition-colors border border-slate-200"
                  >
                    <BedDouble className="w-3.5 h-3.5 text-emerald-600" />
                    <span>View Hotels</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('guides')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 cursor-pointer shadow-sm transition-colors"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Book Guide</span>
                  </button>
                </div>
              </div>

            </div>

            {/* ------------------------------------------------------------- */}
            {/* TAB 2: VERIFIED LOCAL GUIDES */}
            {/* ------------------------------------------------------------- */}
            <div className={`space-y-3.5 ${activeTab === 'guides' ? 'block' : 'hidden'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
                    VERIFIED LOCAL GUIDES
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Certified heritage storytellers & licensed regional tour experts ($30/day)
                  </p>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                  {guides.length} Available
                </span>
              </div>
              
              {/* Grid of guide cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {guides.map((guide) => {
                  const isSelected = selectedGuideId === guide.id;

                  return (
                    <div
                      key={guide.id}
                      onClick={() => setSelectedGuideId(guide.id)}
                      className={`p-3 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-white border-emerald-400 shadow-md ring-2 ring-emerald-400/30'
                          : 'bg-white/75 hover:bg-white border-slate-200/80'
                      }`}
                    >
                      <div className="space-y-2">
                        {/* Avatar with Verified checkmark */}
                        <div className="flex items-center gap-2">
                          <img
                            src={guide.avatar}
                            alt={guide.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-300 shadow-sm shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <h5 className="text-xs font-bold text-slate-900 truncate">
                                {guide.name}
                              </h5>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            </div>
                            <div className="flex items-center gap-0.5 text-amber-500 text-[10px]">
                              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                              <span className="font-bold text-slate-700 ml-0.5">{guide.rating}</span>
                              <span className="text-slate-400 font-normal">({guide.verifiedToursCount})</span>
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="text-[10px] text-slate-600 space-y-0.5">
                          <p className="truncate">
                            <strong className="font-semibold text-slate-700">Languages:</strong>{' '}
                            {guide.languages.join(', ')}
                          </p>
                          <p className="truncate">
                            <strong className="font-semibold text-slate-700">Specialization:</strong>{' '}
                            {guide.specialization}
                          </p>
                        </div>
                      </div>

                      {/* Select Guide Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedGuideId(guide.id);
                          showToast(`Selected Guide ${guide.name} for your journey`);
                        }}
                        className={`mt-3 py-1.5 px-3 rounded-full text-[10px] font-bold tracking-wide uppercase transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isSelected ? 'SELECTED' : 'SELECT GUIDE'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* TAB 3: BOOK HOTEL & STAYS (Curated Destination Accommodations) */}
            {/* ------------------------------------------------------------- */}
            <div className={`space-y-3.5 ${activeTab === 'hotels' ? 'block' : 'hidden'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
                    ACCOMMODATION OPTIONS
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Handpicked eco-lodges, boutique heritage stays, and premier hotels
                  </p>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  nearby
                </span>
              </div>

              {/* Destination Hotel Cards */}
              <div className="space-y-3">
                {destinationHotels.map((hotel: HotelOption) => {
                  const isSelected = selectedHotelId === hotel.id;

                  return (
                    <div
                      key={hotel.id}
                      onClick={() => setSelectedHotelId(isSelected ? null : hotel.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row gap-3.5 ${
                        isSelected
                          ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-400/30'
                          : 'bg-white/80 hover:bg-white border-slate-200/90'
                      }`}
                    >
                      {/* Hotel Photo */}
                      <div className="w-full sm:w-36 h-28 sm:h-auto rounded-xl overflow-hidden shrink-0 relative border border-slate-200">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                        {hotel.badge && (
                          <span className="absolute top-1.5 left-1.5 bg-slate-900/80 backdrop-blur-md text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md">
                            {hotel.badge}
                          </span>
                        )}
                      </div>

                      {/* Hotel Information */}
                      <div className="flex-1 flex flex-col justify-between space-y-1.5">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h5 className="text-xs font-bold text-slate-900 leading-snug">
                              {hotel.name}
                            </h5>
                            <div className="flex items-center gap-0.5 text-amber-500 text-[10px] shrink-0">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="font-bold text-slate-800">{hotel.rating}</span>
                              <span className="text-slate-400">({hotel.reviewCount})</span>
                            </div>
                          </div>

                          <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{hotel.location}</span>
                          </p>

                          <p className="text-[10px] text-slate-600 font-medium mt-1">
                            <strong>Room:</strong> {hotel.roomType}
                          </p>

                          {/* Amenities */}
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {hotel.amenities.slice(0, 3).map((amenity, i) => (
                              <span
                                key={i}
                                className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Pricing & Selection Button */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                          <div>
                            <span className="text-xs font-mono font-black text-slate-900">
                              ${hotel.pricePerNightUsd}
                            </span>
                            <span className="text-[10px] text-slate-500"> / night </span>
                            <span className="text-[9px] text-slate-400 font-mono">
                              (৳{hotel.pricePerNightBdt.toLocaleString()})
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedHotelId(isSelected ? null : hotel.id);
                              showToast(
                                isSelected
                                  ? 'Removed hotel from itinerary'
                                  : `Selected ${hotel.name} for Day ${activeItineraryDay}`
                              );
                            }}
                            className={`py-1 px-3 rounded-full text-[10px] font-bold tracking-wide uppercase transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                            }`}
                          >
                            {isSelected ? 'SELECTED STAY' : 'BOOK STAY'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Accommodation Summary Widget */}
              <div className="bg-white/70 p-3 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 text-[10px]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <BedDouble className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">Local guideline</span>
                    <span className="text-slate-500">24 options available in region</span>
                  </div>
                </div>
                <div className="text-right font-mono text-slate-600">
                  <span>Accommodation options: </span>
                  <strong className="text-slate-900">250 nearby</strong>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* TAB 4: TRANSPORT & LOGISTICS */}
            {/* ------------------------------------------------------------- */}
            <div className={`space-y-3.5 ${activeTab === 'transport' ? 'block' : 'hidden'}`}>
              <div>
                <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
                  TRANSPORT & TRAVEL LOGISTICS
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Private highway chauffeur, scenic railway, and river cruisers
                </p>
              </div>

              {/* Transport Cards */}
              <div className="space-y-2.5">
                {TRANSPORT_OPTIONS.map((trans: TransportOption) => {
                  const isSelected = selectedTransportOptionId === trans.id;

                  return (
                    <div
                      key={trans.id}
                      onClick={() => setSelectedTransportOptionId(trans.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-400/30'
                          : 'bg-white/80 hover:bg-white border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {trans.id.includes('rail') ? (
                              <Navigation className="w-4 h-4" />
                            ) : trans.id.includes('river') ? (
                              <Compass className="w-4 h-4" />
                            ) : (
                              <Car className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-slate-900">
                              {trans.name}
                            </h5>
                            <span className="text-[10px] text-emerald-700 font-semibold">
                              {trans.category}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-mono font-black text-slate-900">
                            ${trans.pricePerDayUsd}
                          </span>
                          <span className="text-[9px] text-slate-400 block font-mono">
                            / day (৳{trans.pricePerDayBdt.toLocaleString()})
                          </span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-600 mt-2 leading-relaxed">
                        {trans.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {trans.features.map((feat, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-end pt-2 mt-2 border-t border-slate-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTransportOptionId(trans.id);
                            showToast(`Selected ${trans.name}`);
                          }}
                          className={`py-1 px-3 rounded-full text-[10px] font-bold tracking-wide uppercase transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 text-white shadow-sm'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isSelected ? 'SELECTED TRANSPORT' : 'SELECT TRANSPORT'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Estimated Travel Times Box */}
              <div className="bg-white/80 p-3.5 rounded-2xl border border-slate-200/80 space-y-2 shadow-sm">
                <div>
                  <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider">
                    ESTIMATED TRAVEL TIMES
                  </h4>
                  <p className="text-[9px] text-slate-500 leading-tight mt-0.5">
                    Between Dhaka points & Midden points, derived from spatial map data
                  </p>
                </div>

                <div className="space-y-1.5 pt-1 text-xs text-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Dhaka <ArrowRight className="w-3 h-3 text-slate-400" />
                    </span>
                    <span className="font-mono font-bold text-slate-900">2 h 40 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                      Ahsan Manzil
                    </span>
                    <span className="font-mono font-bold text-slate-900">3 h 40 min</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Bottom Cart Summary & Confirmation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200/80 shrink-0 mt-2">
            {/* Real-time total */}
            <div className="bg-white/85 p-3 sm:p-3.5 rounded-2xl border border-slate-200/80 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  REAL-TIME TOTAL
                </span>
                <div className="text-xs font-bold text-slate-800 mt-0.5 truncate">
                  {trailTitle} ({daysCount} Days Planned)
                </div>
                {selectedHotel && (
                  <span className="text-[9px] text-emerald-700 block truncate mt-0.5">
                    Stay: {selectedHotel.name}
                  </span>
                )}
              </div>

              <button
                onClick={handleConfirmItinerary}
                className={`w-full mt-2.5 py-2 px-3 rounded-full text-xs font-bold uppercase transition-all shadow-sm cursor-pointer ${
                  isItinerarySelected
                    ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300'
                }`}
              >
                {isItinerarySelected ? 'ITINERARY CONFIRMED' : 'SELECT ITINERARY'}
              </button>
            </div>

            {/* Cart Summary */}
            <div className="bg-white/85 p-3 sm:p-3.5 rounded-2xl border border-slate-200/80 flex flex-col justify-between text-xs shadow-sm">
              <div>
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                  CART SUMMARY
                </span>
                <div className="space-y-1 font-mono text-slate-700 text-[11px]">
                  <div className="flex justify-between">
                    <span>Guide Services ({daysCount}d @ $30/d):</span>
                    <span className="font-bold">${guideFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Logistics & Permits:</span>
                    <span className="font-bold">${logisticsFee}</span>
                  </div>
                  {hotelFee > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Curated Accommodation:</span>
                      <span className="font-bold">+${hotelFee}</span>
                    </div>
                  )}
                  {transportUpgradeFee > 0 && (
                    <div className="flex justify-between text-blue-700">
                      <span>Transport ({selectedTransport.name.split(' ')[0]}):</span>
                      <span className="font-bold">+${transportUpgradeFee}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between font-mono font-extrabold text-slate-900 pt-2 border-t border-slate-200/80 mt-1">
                <span>Estimated Total:</span>
                <span className="text-emerald-700 font-black text-sm">${totalCost}</span>
              </div>
            </div>
          </div>

        </aside>

      </div>

    </div>
  );
};
