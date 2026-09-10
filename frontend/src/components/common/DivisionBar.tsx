import React, { useRef, useState, useEffect } from 'react';
import { useMapStore } from '../../store/useMapStore';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface DivisionItem {
  name: string;
  bnName: string;
  slug: string;
  lng: number;
  lat: number;
  zoom: number;
}

const DIVISIONS: DivisionItem[] = [
  { name: 'Dhaka', bnName: 'ঢাকা', slug: 'dhaka', lng: 90.4125, lat: 23.8103, zoom: 9.5 },
  { name: 'Chittagong', bnName: 'চট্টগ্রাম', slug: 'chittagong', lng: 91.8325, lat: 22.3569, zoom: 9.0 },
  { name: 'Sylhet', bnName: 'সিলেট', slug: 'sylhet', lng: 91.8687, lat: 24.8949, zoom: 9.2 },
  { name: 'Rajshahi', bnName: 'রাজশাহী', slug: 'rajshahi', lng: 88.6042, lat: 24.3745, zoom: 9.2 },
  { name: 'Khulna', bnName: 'খুলনা', slug: 'khulna', lng: 89.5403, lat: 22.8456, zoom: 9.0 },
  { name: 'Barisal', bnName: 'বরিশাল', slug: 'barisal', lng: 90.3696, lat: 22.7010, zoom: 9.3 },
  { name: 'Rangpur', bnName: 'রংপুর', slug: 'rangpur', lng: 89.2467, lat: 25.7439, zoom: 9.2 },
  { name: 'Mymensingh', bnName: 'ময়মনসিংহ', slug: 'mymensingh', lng: 90.4074, lat: 24.7471, zoom: 9.3 },
];

export const DivisionBar: React.FC = () => {
  const { activeDivision, setDivisionFilter, flyToLocation } = useMapStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -180 : 180;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleSelectDivision = (div: DivisionItem) => {
    if (activeDivision === div.slug) {
      setDivisionFilter(null);
      flyToLocation(90.3563, 23.6850, 7.2);
    } else {
      setDivisionFilter(div.slug);
      flyToLocation(div.lng, div.lat, div.zoom);
    }
  };

  const clearDivision = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDivisionFilter(null);
    flyToLocation(90.3563, 23.6850, 7.2);
  };

  return (
    <nav
      className="absolute top-[62px] sm:top-[74px] left-1/2 -translate-x-1/2 z-40 pointer-events-none max-w-[calc(100vw-16px)] sm:max-w-2xl lg:max-w-3xl flex items-center justify-center transition-all duration-300 px-1"
      aria-label="Bangladesh Divisions Bar"
    >
      {/* Pristine, complete rounded glass capsule */}
      <div className="glass-panel px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-full pointer-events-auto shadow-xl border border-white/90 bg-white/85 backdrop-blur-md flex items-center gap-1 max-w-full">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 px-1.5 sm:px-2 shrink-0 hidden sm:inline">
          Divisions:
        </span>

        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="p-1 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
            title="Scroll left"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth py-0.5 px-0.5"
        >
          {DIVISIONS.map((div) => {
            const isActive = activeDivision === div.slug;
            return (
              <button
                key={div.slug}
                onClick={() => handleSelectDivision(div)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md scale-105 ring-2 ring-emerald-400/50'
                    : 'bg-white/60 text-slate-700 hover:bg-white hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                <span>{div.name}</span>
                <span
                  className={`text-[9px] sm:text-[10px] font-serif ${
                    isActive ? 'text-emerald-300' : 'text-slate-400'
                  }`}
                >
                  {div.bnName}
                </span>
                {isActive && (
                  <span
                    onClick={clearDivision}
                    className="ml-0.5 sm:ml-1 p-0.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="Clear division filter"
                  >
                    <X className="w-3 h-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="p-1 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
            title="Scroll right"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </nav>
  );
};
