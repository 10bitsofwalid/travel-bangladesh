import React, { useState } from 'react';
import {
  X,
  Trash2,
  CheckCircle2,
  Star,
  BedDouble,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';

export const PlannerView: React.FC = () => {
  const {
    itineraryDays,
    activeItineraryDay,
    setActiveItineraryDay,
    removeItineraryDay,
    guides,
    selectedGuideId,
    setSelectedGuideId,
    setActiveView
  } = useMapStore();

  const [isItinerarySelected, setIsItinerarySelected] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex justify-between p-5 pt-20 select-none">
      
      {/* Left Panel: BUILD ITINERARY: 7-DAY EXPLORATION */}
      <aside className="w-[340px] md:w-[380px] glass-panel rounded-3xl p-5 shadow-2xl flex flex-col pointer-events-auto h-[calc(100vh-100px)]">
        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-4">
          BUILD ITINERARY: 7-DAY EXPLORATION
        </h3>

        {/* Scrollable Timeline */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
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
                  className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-2 transition-all ${
                    isActive
                      ? 'bg-emerald-400 text-white ring-4 ring-emerald-300/40'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-slate-400'}`} />
                </div>

                {/* Card */}
                <div
                  onClick={() => setActiveItineraryDay(item.dayNumber)}
                  className={`flex-1 p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    isActive
                      ? 'bg-emerald-50/90 border-emerald-400/80 shadow-md ring-2 ring-emerald-400/30'
                      : 'bg-white/70 hover:bg-white border-slate-200/80 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4
                      className={`text-xs font-bold leading-snug ${
                        isActive ? 'text-emerald-950 font-black' : 'text-slate-800'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItineraryDay(item.id);
                      }}
                      className="text-slate-400 hover:text-rose-500 transition-colors shrink-0"
                      title="Remove Day"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {item.location && (
                    <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {item.location}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Right Panel: BOOK GUIDE & LOGISTICS */}
      <aside className="w-[520px] lg:w-[580px] glass-panel rounded-3xl p-5 shadow-2xl flex flex-col pointer-events-auto h-[calc(100vh-100px)] overflow-y-auto space-y-4">
        
        {/* Header with Close ✕ */}
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            BOOK GUIDE & LOGISTICS
          </h3>
          <button
            onClick={() => setActiveView('explore')}
            className="w-7 h-7 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
            title="Close Planner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section 1: VERIFIED LOCAL GUIDES */}
        <div>
          <h4 className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-2.5">
            VERIFIED LOCAL GUIDES
          </h4>
          
          {/* Horizontal scroll / grid of guide cards */}
          <div className="grid grid-cols-3 gap-2.5">
            {guides.map((guide) => {
              const isSelected = selectedGuideId === guide.id;

              return (
                <div
                  key={guide.id}
                  className={`p-3 rounded-2xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-emerald-400 shadow-md ring-2 ring-emerald-400/20'
                      : 'bg-white/70 hover:bg-white border-slate-200/80'
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
                    onClick={() => setSelectedGuideId(guide.id)}
                    className={`mt-3 py-1.5 px-3 rounded-full text-[10px] font-bold tracking-wide uppercase transition-all ${
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

        {/* Section 2 & 3: ESTIMATED TRAVEL TIMES + ACCOMMODATION OPTIONS nearby */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          
          {/* Estimated Travel Times */}
          <div className="bg-white/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
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

          {/* Accommodation Options */}
          <div className="bg-white/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider">
                ACCOMMODATION OPTIONS
              </h4>
              <span className="text-[9px] text-slate-400 font-medium">nearby</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 p-1.5 bg-white rounded-xl border border-slate-200/70">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <BedDouble className="w-3.5 h-3.5" />
                </div>
                <div className="text-[10px]">
                  <div className="font-bold text-slate-800">Local guideline</div>
                  <div className="text-slate-500">24 options</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-1.5 bg-white rounded-xl border border-slate-200/70">
                <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=80&q=80"
                    alt="hotel"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[10px]">
                  <div className="font-bold text-slate-800">Accommodation options</div>
                  <div className="text-slate-500">250 nearby</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Section 4: Bottom Real-Time Total & Cart Summary */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200/70">
          
          {/* Real-time total */}
          <div className="bg-white/70 p-3.5 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                REAL-TIME TOTAL
              </span>
              <div className="text-xs font-bold text-slate-800 mt-1">
                Mughal History
              </div>
            </div>

            <button
              onClick={() => setIsItinerarySelected(!isItinerarySelected)}
              className={`w-full mt-3 py-2 px-3 rounded-full text-xs font-bold uppercase transition-all shadow-sm ${
                isItinerarySelected
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300'
              }`}
            >
              {isItinerarySelected ? 'ITINERARY CONFIRMED' : 'SELECT ITINERARY'}
            </button>
          </div>

          {/* Cart Summary */}
          <div className="bg-white/70 p-3.5 rounded-2xl border border-slate-200/80 flex flex-col justify-between text-xs">
            <div>
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                CART SUMMARY
              </span>
              <div className="space-y-1 font-mono text-slate-700">
                <div className="flex justify-between">
                  <span>Total Cost:</span>
                  <span className="font-bold">$340</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Cost:</span>
                  <span className="font-bold">$130</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between font-mono font-extrabold text-slate-900 pt-2 border-t border-slate-200/80">
              <span>Total Total:</span>
              <span className="text-emerald-700 font-black">$340</span>
            </div>
          </div>

        </div>

      </aside>

    </div>
  );
};
