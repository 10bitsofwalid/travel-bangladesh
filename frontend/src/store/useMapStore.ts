import { create } from 'zustand';
import {
  Destination,
  ViewportFilter,
  UserProfile,
  ItineraryDayItem,
  VerifiedGuide
} from '../types';
import {
  INITIAL_LANDMARKS,
  MOCK_USER_PROFILE,
  MOCK_ITINERARY_DAYS,
  MOCK_VERIFIED_GUIDES
} from '../data/mockData';

interface MapViewport {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

export interface FilterLayers {
  nature: boolean;
  history: boolean;
  culture: boolean;
  unesco: boolean;
}

interface MapState {
  // Navigation & View Mode
  activeView: 'explore' | 'account' | 'planner';
  setActiveView: (view: 'explore' | 'account' | 'planner') => void;

  // Viewport & Map state
  viewport: MapViewport;
  bounds: [number, number, number, number] | null;
  filter: ViewportFilter;
  filterLayers: FilterLayers;
  selectedTrail: string | null;

  // Modals & Panels
  selectedDestination: Destination | null;
  isDrawerOpen: boolean;
  isSearchOpen: boolean;
  isSubmitSpotOpen: boolean;
  isVirtualTourOpen: boolean;
  activeDivision: string | null;

  // User & Account
  userProfile: UserProfile;

  // Planner & Logistics
  itineraryDays: ItineraryDayItem[];
  activeItineraryDay: number;
  selectedGuideId: string;
  guides: VerifiedGuide[];

  // Actions
  setViewport: (viewport: Partial<MapViewport>) => void;
  setBounds: (bounds: [number, number, number, number]) => void;
  setFilterType: (type: ViewportFilter['type']) => void;
  toggleFilterLayer: (layer: keyof FilterLayers) => void;
  setSelectedTrail: (trail: string | null) => void;
  setCategoryFilter: (categorySlug: string | null) => void;
  setDivisionFilter: (divisionSlug: string | null) => void;
  setSearchQuery: (query: string) => void;
  selectDestination: (destination: Destination | null) => void;
  closeDrawer: () => void;
  toggleSearch: () => void;
  setIsSubmitSpotOpen: (open: boolean) => void;
  setIsVirtualTourOpen: (open: boolean) => void;
  flyToLocation: (lng: number, lat: number, zoom?: number) => void;
  takeMeSomewhere: () => void;
  toggleSetting: (settingKey: keyof UserProfile['settings']) => void;
  setActiveItineraryDay: (day: number) => void;
  setSelectedGuideId: (id: string) => void;
  removeItineraryDay: (id: string) => void;
}

const DEFAULT_VIEWPORT: MapViewport = {
  longitude: 90.4060,
  latitude: 23.7086,
  zoom: 7.2,
  pitch: 20,
  bearing: 0,
};

export const useMapStore = create<MapState>((set, get) => ({
  activeView: 'explore',
  setActiveView: (activeView) => set({ activeView }),

  viewport: DEFAULT_VIEWPORT,
  bounds: null,
  filter: {
    type: 'ALL',
    categorySlug: null,
    divisionSlug: null,
    searchQuery: '',
  },
  filterLayers: {
    nature: true,
    history: true,
    culture: true,
    unesco: true,
  },
  selectedTrail: 'mughal', // default to Mughal trail as shown in design

  selectedDestination: INITIAL_LANDMARKS[0], // Ahsan Manzil by default as shown in Image 2
  isDrawerOpen: true,
  isSearchOpen: false,
  isSubmitSpotOpen: false,
  isVirtualTourOpen: false,
  activeDivision: null,

  userProfile: MOCK_USER_PROFILE,
  itineraryDays: MOCK_ITINERARY_DAYS,
  activeItineraryDay: 1,
  selectedGuideId: 'guide-1',
  guides: MOCK_VERIFIED_GUIDES,

  setViewport: (newViewport) =>
    set((state) => ({ viewport: { ...state.viewport, ...newViewport } })),

  setBounds: (bounds) => set({ bounds }),

  setFilterType: (type) =>
    set((state) => ({
      filter: { ...state.filter, type, categorySlug: null },
    })),

  toggleFilterLayer: (layer) =>
    set((state) => ({
      filterLayers: {
        ...state.filterLayers,
        [layer]: !state.filterLayers[layer],
      },
    })),

  setSelectedTrail: (selectedTrail) =>
    set((state) => ({
      selectedTrail: state.selectedTrail === selectedTrail ? null : selectedTrail,
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
    }),

  toggleSearch: () =>
    set((state) => ({ isSearchOpen: !state.isSearchOpen })),

  setIsSubmitSpotOpen: (isSubmitSpotOpen) => set({ isSubmitSpotOpen }),

  setIsVirtualTourOpen: (isVirtualTourOpen) => set({ isVirtualTourOpen }),

  flyToLocation: (longitude, latitude, zoom = 10) =>
    set((state) => ({
      viewport: {
        ...state.viewport,
        longitude,
        latitude,
        zoom,
      },
    })),

  takeMeSomewhere: () => {
    const list = INITIAL_LANDMARKS;
    const currentId = get().selectedDestination?.id;
    const filtered = list.filter((i) => i.id !== currentId);
    const randomItem = filtered[Math.floor(Math.random() * filtered.length)] || list[0];

    set((state) => ({
      selectedDestination: randomItem,
      isDrawerOpen: true,
      activeView: 'explore',
      viewport: {
        ...state.viewport,
        longitude: randomItem.longitude,
        latitude: randomItem.latitude,
        zoom: 9.5,
      },
    }));
  },

  toggleSetting: (settingKey) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        settings: {
          ...state.userProfile.settings,
          [settingKey]: !state.userProfile.settings[settingKey],
        },
      },
    })),

  setActiveItineraryDay: (activeItineraryDay) => set({ activeItineraryDay }),

  setSelectedGuideId: (selectedGuideId) => set({ selectedGuideId }),

  removeItineraryDay: (id) =>
    set((state) => ({
      itineraryDays: state.itineraryDays.filter((item) => item.id !== id),
    })),
}));
