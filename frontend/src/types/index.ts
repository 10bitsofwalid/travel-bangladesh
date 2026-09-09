export type CategoryType = 'NATURE' | 'HERITAGE' | 'CULTURE' | 'COMMUNITY' | 'UNESCO';

export type DifficultyLevel = 'EASY' | 'MODERATE' | 'CHALLENGING' | 'EXTREME';

export type UnescoStatus = 'NOT_LISTED' | 'TENTATIVE_LIST' | 'WORLD_HERITAGE_SITE';

export type VerificationStatus = 'UNVERIFIED' | 'AI_ASSISTED' | 'VERIFIED_BY_EXPERT';

export interface Division {
  id: string;
  name: string;
  bnName: string;
  slug: string;
  latitude: number;
  longitude: number;
  poiCount?: number;
}

export interface District {
  id: string;
  divisionId: string;
  name: string;
  bnName: string;
  slug: string;
  latitude: number;
  longitude: number;
}

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  slug: string;
  icon: string;
  color: string;
  description: string;
}

export interface HeritageDetail {
  id: string;
  periodEra?: string;
  builtYear?: string;
  architecturalStyle?: string;
  historicalSignificance: string;
  unescoStatus: UnescoStatus;
  preservationStatus?: string;
  verificationStatus: VerificationStatus;
  verifiedBy?: string;
  sources: Array<{
    title: string;
    author?: string;
    url?: string;
    publisher?: string;
    year?: string;
  }>;
}

export interface TimelineMilestone {
  year: string;
  event: string;
  details?: string;
  mediaType?: 'photo' | 'drone' | 'video';
  mediaUrl?: string;
  status?: 'Approved' | 'Uploading' | 'Completed';
  progress?: number;
}

export interface DestinationReview {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Destination {
  id: string;
  name: string;
  bnName?: string;
  subtitle?: string; // e.g. "THE PINK PALACE | DHAKA"
  slug: string;
  summary: string;
  description: string;
  chronicles?: string; // "Bangladesh coloured in a mesmerizing architecture..."
  lore?: string; // "The palace's lore arouses in the past prior..."
  divisionId: string;
  districtId: string;
  categoryId: string;
  categoryType: CategoryType;
  thematicTrail?: 'mughal' | 'sylhet' | 'sundarbans';
  latitude: number;
  longitude: number;
  elevation?: number;
  coverImage: string;
  gallery: string[];
  bestTimeToVisit?: string;
  difficulty?: DifficultyLevel;
  accessibility?: string;
  entryFee?: string;
  travelRoutesSummary?: string;
  rating: number;
  reviewCount: number;
  reviews: DestinationReview[];
  timeline: TimelineMilestone[];
  isFeatured: boolean;
  division?: Division;
  district?: District;
  category?: Category;
  heritageDetail?: HeritageDetail;
}

export interface UserProfile {
  name: string;
  avatar: string;
  isVerified: boolean;
  contributorLevel: number;
  email: string;
  phone: string;
  gamification: {
    statusTitle: string; // "Verified Heritage Expert"
    historicalValidations: number; // 15
    landmarkPhotoApprovals: number; // 5
    communityAwards: number; // 2
    levelProgress: number; // e.g. 75%
    currentLevel: number; // 4
  };
  settings: {
    notifications: boolean;
    security: boolean;
    paymentMethods: boolean;
    verifiedGuideStatus: boolean;
  };
}

export interface ContributionItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  status: 'Approved' | 'Pending' | 'In-Review';
  points: number;
  modifiedDate: string;
  imageUrl: string;
  isVideoOrVr?: boolean;
}

export interface SavedItinerary {
  id: string;
  title: string; // "7-Day Mughal Heritage Trail (Starts: Oct 12)"
  guideLink: string;
  travelMapLink: string;
  mapPreviewImage: string;
  durationDays: number;
}

export interface VerifiedGuide {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  rating: number;
  verifiedToursCount: number;
  languages: string[];
  specialization: string;
  hourlyRate?: number;
}

export interface ItineraryDayItem {
  id: string;
  dayNumber: number;
  title: string;
  location: string;
  travelTime?: string;
  description?: string;
  destinationId?: string;
}

export type ViewportFilter = {
  type: 'ALL' | 'NATURE' | 'HERITAGE' | 'CULTURE';
  categorySlug: string | null;
  divisionSlug: string | null;
  searchQuery: string;
};
