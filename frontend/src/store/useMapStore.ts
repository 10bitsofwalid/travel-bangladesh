import { create } from 'zustand';
import { Destination, ViewportFilter } from '../types';

interface MapViewport {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

interface MapState {
  viewport: MapViewport;
  bounds: [number, number, number, number] | null;
  filter: ViewportFilter;
  selectedDestination: Destination | null;
  isDrawerOpen: boolean;
  isSearchOpen: boolean;
  activeDivision: string | null;

  // Actions
  setViewport: (viewport: Partial<MapViewport>) => void;
  setBounds: (bounds: [number, number, number, number]) => void;
  setFilterType: (type: ViewportFilter['type']) => void;
  setCategoryFilter: (categorySlug: string | null) => void;
  setDivisionFilter: (divisionSlug: string | null) => void;
  setSearchQuery: (query: string) => void;
  selectDestination: (destination: Destination | null) => void;
  closeDrawer: () => void;
  toggleSearch: () => void;
  flyToLocation: (lng: number, lat: number, zoom?: number) => void;
}

// Bangladesh center coordinates
const DEFAULT_VIEWPORT: MapViewport = {
  longitude: 90.3563,
  latitude: 23.6850,
  zoom: 7.2,
  pitch: 20,
  bearing: 0,
};

export const useMapStore = create<MapState>((set) => ({
  viewport: DEFAULT_VIEWPORT,
  bounds: null,
  filter: {
    type: 'ALL',
    categorySlug: null,
    divisionSlug: null,
    searchQuery: '',
  },
  selectedDestination: null,
  isDrawerOpen: false,
  isSearchOpen: false,
  activeDivision: null,

  setViewport: (newViewport) =>
    set((state) => ({ viewport: { ...state.viewport, ...newViewport } })),

  setBounds: (bounds) => set({ bounds }),

  setFilterType: (type) =>
    set((state) => ({
      filter: { ...state.filter, type, categorySlug: null },
    })),

  setCategoryFilter: (categorySlug) =>
    set((state) => ({
      filter: { ...state.filter, categorySlug },
    })),

  setDivisionFilter: (divisionSlug) =>
    set((state) => ({
      activeDivision: divisionSlug,
      filter: { ...state.filter, divisionSlug },
    })),

  setSearchQuery: (searchQuery) =>
    set((state) => ({
      filter: { ...state.filter, searchQuery },
    })),

  selectDestination: (destination) =>
    set({
      selectedDestination: destination,
      isDrawerOpen: destination !== null,
    }),

  closeDrawer: () =>
    set({
      isDrawerOpen: false,
      selectedDestination: null,
    }),

  toggleSearch: () =>
    set((state) => ({ isSearchOpen: !state.isSearchOpen })),

  flyToLocation: (longitude, latitude, zoom = 10) =>
    set((state) => ({
      viewport: {
        ...state.viewport,
        longitude,
        latitude,
        zoom,
      },
    })),
}));
