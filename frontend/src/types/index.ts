export type CategoryType = 'NATURE' | 'HERITAGE' | 'CULTURE' | 'COMMUNITY';

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

export interface Destination {
  id: string;
  name: string;
  bnName?: string;
  slug: string;
  summary: string;
  description: string;
  divisionId: string;
  districtId: string;
  categoryId: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  coverImage: string;
  gallery: string[];
  bestTimeToVisit?: string;
  difficulty?: DifficultyLevel;
  accessibility?: string;
  entryFee?: string;
  isFeatured: boolean;
  division?: Division;
  district?: District;
  category?: Category;
  heritageDetail?: HeritageDetail;
}

export interface GeoDestinationFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  properties: {
    id: string;
    name: string;
    bnName?: string;
    slug: string;
    type: CategoryType;
    category: string;
    categorySlug: string;
    coverImage: string;
    isFeatured: boolean;
  };
}

export type ViewportFilter = {
  type: 'ALL' | 'NATURE' | 'HERITAGE' | 'CULTURE';
  categorySlug: string | null;
  divisionSlug: string | null;
  searchQuery: string;
};
