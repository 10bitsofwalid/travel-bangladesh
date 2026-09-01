import React from 'react';
import { useMapStore } from '../../store/useMapStore';

interface DivisionItem {
  name: string;
  bnName: string;
  slug: string;
  lng: number;
  lat: number;
  zoom: number;
  badgeColor: string;
}

const DIVISIONS: DivisionItem[] = [
  { name: 'Dhaka', bnName: 'ঢাকা', slug: 'dhaka', lng: 90.4125, lat: 23.8103, zoom: 9.5, badgeColor: 'border-slate-500/30' },
  { name: 'Chittagong', bnName: 'চট্টগ্রাম', slug: 'chittagong', lng: 91.8325, lat: 22.3569, zoom: 9.0, badgeColor: 'border-emerald-500/30' },
  { name: 'Sylhet', bnName: 'সিলেট', slug: 'sylhet', lng: 91.8687, lat: 24.8949, zoom: 9.2, badgeColor: 'border-emerald-500/30' },
  { name: 'Rajshahi', bnName: 'রাজশাহী', slug: 'rajshahi', lng: 88.6042, lat: 24.3745, zoom: 9.2, badgeColor: 'border-amber-500/30' },
  { name: 'Khulna', bnName: 'খুলনা', slug: 'khulna', lng: 89.5403, lat: 22.8456, zoom: 9.0, badgeColor: 'border-emerald-500/30' },
  { name: 'Barisal', bnName: 'বরিশাল', slug: 'barisal', lng: 90.3696, lat: 22.7010, zoom: 9.3, badgeColor: 'border-teal-500/30' },
  { name: 'Rangpur', bnName: 'রংপুর', slug: 'rangpur', lng: 89.2467, lat: 25.7439, zoom: 9.2, badgeColor: 'border-amber-500/30' },
  { name: 'Mymensingh', bnName: 'ময়মনসিংহ', slug: 'mymensingh', lng: 90.4074, lat: 24.7471, zoom: 9.3, badgeColor: 'border-slate-500/30' },
];

export const DivisionBar: React.FC = () => {
  const { activeDivision, setDivisionFilter, flyToLocation } = useMapStore();

  const handleSelectDivision = (div: DivisionItem) => {
    if (activeDivision === div.slug) {
      setDivisionFilter(null);
      flyToLocation(90.3563, 23.6850, 7.2);
    } else {
      setDivisionFilter(div.slug);
      flyToLocation(div.lng, div.lat, div.zoom);
    }
  };

  return (
    <div className="absolute top-20 left-4 right-4 z-20 flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-1 pointer-events-none">
      <div className="flex items-center gap-1.5 glass-panel px-2.5 py-1.5 rounded-2xl pointer-events-auto shadow-xl">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 hidden sm:inline">
          Divisions:
        </span>
        {DIVISIONS.map((div) => {
          const isActive = activeDivision === div.slug;
          return (
            <button
              key={div.slug}
              onClick={() => handleSelectDivision(div)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-white/20 text-white border border-white/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{div.name}</span>
              <span className="text-[10px] text-slate-400 font-serif opacity-80">
                {div.bnName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
