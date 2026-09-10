import { create } from 'zustand';
import {
  Destination,
  ViewportFilter,
  UserProfile,
  ItineraryDayItem,
  VerifiedGuide,
  ContributionItem
} from '../types';
import {
  INITIAL_LANDMARKS,
  MOCK_USER_PROFILE,
  MOCK_ITINERARY_DAYS,
  MOCK_VERIFIED_GUIDES
} from '../data/mockData';
import { ResidenceLocation, RESIDENCE_PRESETS } from '../data/routeEngine';

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

export interface FlyToTarget {
  longitude: number;
  latitude: number;
  zoom: number;
  timestamp: number;
}

interface MapState {
  // Navigation & View Mode
  activeView: 'explore' | 'account' | 'planner';
  setActiveView: (view: 'explore' | 'account' | 'planner') => void;

  // Viewport & Map state
  viewport: MapViewport;
  flyToTarget: FlyToTarget | null;
  bounds: [number, number, number, number] | null;
  filter: ViewportFilter;
  filterLayers: FilterLayers;
  selectedTrail: string | null;

  // Modals & Panels
  selectedDestination: Destination | null;
  isDrawerOpen: boolean;
  isLeftPanelOpen: boolean;
  isSearchOpen: boolean;
  isSubmitSpotOpen: boolean;
  isVirtualTourOpen: boolean;
  activeDivision: string | null;
  lightboxImage: { src: string; title: string } | null;
  toastMessage: string | null;

  // User & Account
  userProfile: UserProfile;

  // Planner & Logistics
  itineraryDays: ItineraryDayItem[];
  activeItineraryDay: number;
  selectedGuideId: string;
  guides: VerifiedGuide[];

  // Residence & Route Navigation
  userResidence: ResidenceLocation;
  isRouteActive: boolean;
  activeTransportMode: 'road' | 'rail' | 'air' | 'water';

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
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  toggleLeftPanel: () => void;
  toggleSearch: () => void;
  setIsSubmitSpotOpen: (open: boolean) => void;
  setIsVirtualTourOpen: (open: boolean) => void;
  setLightboxImage: (img: { src: string; title: string } | null) => void;
  showToast: (message: string) => void;
  flyToLocation: (lng: number, lat: number, zoom?: number) => void;
  takeMeSomewhere: () => void;
  toggleSetting: (settingKey: keyof UserProfile['settings']) => void;
  setActiveItineraryDay: (day: number) => void;
  setSelectedGuideId: (id: string) => void;
  removeItineraryDay: (id: string) => void;
  addToItinerary: (destination: Destination) => void;
  addCustomItineraryDay: (title: string, location: string) => void;
  addContribution: (contribution: ContributionItem) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  updateGamificationProgress: (progress: number) => void;
  setUserResidence: (residence: ResidenceLocation) => void;
  setIsRouteActive: (active: boolean) => void;
  toggleRouteActive: () => void;
  setActiveTransportMode: (mode: 'road' | 'rail' | 'air' | 'water') => void;
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
  flyToTarget: null,
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
  selectedTrail: null, // Do not select any trails initially (starts clean)

  selectedDestination: INITIAL_LANDMARKS[0], // Ahsan Manzil by default
  isDrawerOpen: true,
  isLeftPanelOpen: true,
  isSearchOpen: false,
  isSubmitSpotOpen: false,
  isVirtualTourOpen: false,
  activeDivision: null,
  lightboxImage: null,
  toastMessage: null,

  userProfile: MOCK_USER_PROFILE,
  itineraryDays: MOCK_ITINERARY_DAYS,
  activeItineraryDay: 1,
  selectedGuideId: 'guide-1',
  guides: MOCK_VERIFIED_GUIDES,

  // Residence & Route Navigation
  userResidence: RESIDENCE_PRESETS[0], // Default to Dhaka
  isRouteActive: false,
  activeTransportMode: 'road',

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

  setSelectedTrail: (selectedTrail) => {
    const isClearing = get().selectedTrail === selectedTrail;
    const newTrail = isClearing ? null : selectedTrail;
    set({ selectedTrail: newTrail });

    // Fly to the region corresponding to the trail
    if (newTrail === 'mughal') {
      get().flyToLocation(90.4060, 23.7086, 8.5);
    } else if (newTrail === 'buddhist') {
      get().flyToLocation(88.9771, 25.0315, 8.5);
    } else if (newTrail === 'sylhet') {
      get().flyToLocation(91.8687, 24.8949, 8.8);
    } else if (newTrail === 'sundarbans') {
      get().flyToLocation(89.5403, 22.1456, 8.8);
    }
  },

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

  selectDestination: (destination) => {
    set({
      selectedDestination: destination,
      isDrawerOpen: destination !== null,
    });
    if (destination) {
      get().flyToLocation(destination.longitude, destination.latitude, 9.5);
    }
  },

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  toggleLeftPanel: () => set((state) => ({ isLeftPanelOpen: !state.isLeftPanelOpen })),

  toggleSearch: () =>
    set((state) => ({ isSearchOpen: !state.isSearchOpen })),

  setIsSubmitSpotOpen: (isSubmitSpotOpen) => set({ isSubmitSpotOpen }),

  setIsVirtualTourOpen: (isVirtualTourOpen) => set({ isVirtualTourOpen }),

  setLightboxImage: (lightboxImage) => set({ lightboxImage }),

  showToast: (message) => {
    set({ toastMessage: message });
    setTimeout(() => {
      set((state) => (state.toastMessage === message ? { toastMessage: null } : {}));
    }, 3200);
  },

  flyToLocation: (longitude, latitude, zoom = 9.5) => {
    set((state) => ({
      viewport: {
        ...state.viewport,
        longitude,
        latitude,
        zoom,
      },
      flyToTarget: {
        longitude,
        latitude,
        zoom,
        timestamp: Date.now(),
      },
    }));
  },

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
      flyToTarget: {
        longitude: randomItem.longitude,
        latitude: randomItem.latitude,
        zoom: 9.5,
        timestamp: Date.now(),
      },
    }));
    get().showToast(`Discovered: ${randomItem.name} (${randomItem.district?.name || 'Bangladesh'})`);
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
    set((state) => {
      const remaining = state.itineraryDays.filter((item) => item.id !== id);
      // Renumber days nicely
      const renumbered = remaining.map((item, index) => ({
        ...item,
        dayNumber: index + 1,
        title: item.title.replace(/Day \d+:/, `Day ${index + 1}:`),
      }));
      return {
        itineraryDays: renumbered,
        activeItineraryDay: Math.min(state.activeItineraryDay, renumbered.length || 1),
      };
    }),

  addToItinerary: (destination) => {
    const { itineraryDays } = get();
    const existing = itineraryDays.find(
      (item) => item.destinationId === destination.id || item.location.includes(destination.name)
    );

    if (existing) {
      get().showToast(`"${destination.name}" is already Day ${existing.dayNumber} in your planner!`);
      return;
    }

    const nextDayNumber = itineraryDays.length + 1;
    const newDay: ItineraryDayItem = {
      id: `itinerary-day-${Date.now()}`,
      dayNumber: nextDayNumber,
      title: `Day ${nextDayNumber}: ${destination.division?.name || 'Bangladesh'} - ${destination.name}`,
      location: `${destination.name}, ${destination.district?.name || 'Bangladesh'}`,
      destinationId: destination.id,
      travelTime: '3 h 15 min',
      description: destination.summary,
    };

    set({
      itineraryDays: [...itineraryDays, newDay],
      activeItineraryDay: nextDayNumber,
    });
    get().showToast(`Added ${destination.name} to Day ${nextDayNumber} in Planner!`);
  },

  addCustomItineraryDay: (title, location) => {
    const { itineraryDays } = get();
    const nextDayNumber = itineraryDays.length + 1;
    const newDay: ItineraryDayItem = {
      id: `itinerary-day-${Date.now()}`,
      dayNumber: nextDayNumber,
      title: `Day ${nextDayNumber}: ${title}`,
      location,
      travelTime: '2 h 30 min',
      description: 'Custom travel milestone',
    };

    set({
      itineraryDays: [...itineraryDays, newDay],
      activeItineraryDay: nextDayNumber,
    });
    get().showToast(`Created Day ${nextDayNumber} in Planner!`);
  },

  addContribution: (contribution) => {
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        contributorLevel: state.userProfile.contributorLevel + 1,
        gamification: {
          ...state.userProfile.gamification,
          historicalValidations: state.userProfile.gamification.historicalValidations + 1,
          landmarkPhotoApprovals: state.userProfile.gamification.landmarkPhotoApprovals + 1,
          levelProgress: Math.min(100, state.userProfile.gamification.levelProgress + 10),
        },
      },
    }));
    get().showToast(`Contribution submitted: "${contribution.title}" (+${contribution.points} pts)`);
  },

  updateUserProfile: (updates) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        ...updates,
      },
    })),

  updateGamificationProgress: (progress) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        gamification: {
          ...state.userProfile.gamification,
          levelProgress: progress,
        },
      },
    })),

  setUserResidence: (userResidence) => set({ userResidence, isRouteActive: true }),
  setIsRouteActive: (isRouteActive) => set({ isRouteActive }),
  toggleRouteActive: () => set((state) => ({ isRouteActive: !state.isRouteActive })),
  setActiveTransportMode: (activeTransportMode) => set({ activeTransportMode }),
}));
