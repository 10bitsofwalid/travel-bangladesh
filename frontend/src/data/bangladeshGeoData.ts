export interface DivisionGeoInfo {
  id: string;
  name: string;
  bnName: string;
  slug: string;
  capital: string;
  center: [number, number]; // [lat, lng]
  zoom: number;
  color: string;
  bounds: [[number, number], [number, number]]; // [[south, west], [north, east]]
}

export const BANGLADESH_CENTER: [number, number] = [23.75, 90.35];
export const BANGLADESH_DEFAULT_ZOOM = 7.6;

export const BANGLADESH_MAX_BOUNDS: [[number, number], [number, number]] = [
  [20.4, 87.8], // Southwest (Bay of Bengal / Satkhira)
  [26.8, 92.9], // Northeast (Tetulia / Jaflong)
];

// High-fidelity polygon coordinates tracing the international border of Bangladesh [lng, lat]
export const BANGLADESH_BORDER_COORDINATES: [number, number][] = [
  [88.55, 26.63], // Tetulia, Panchagarh
  [88.75, 26.55],
  [88.95, 26.45],
  [89.20, 26.35],
  [89.50, 26.25],
  [89.70, 26.15],
  [89.85, 25.80], // Kurigram / Brahmaputra
  [89.85, 25.30], // Jamalpur border
  [90.20, 25.18], // Sherpur / Garo Hills
  [90.65, 25.18], // Netrokona border
  [91.00, 25.15], // Sunamganj border
  [91.30, 25.15],
  [91.85, 25.20], // Sylhet / Tamabil
  [92.05, 25.17], // Jaflong
  [92.35, 25.05],
  [92.50, 24.85], // Zakiganj, Sylhet
  [92.45, 24.40], // Moulvibazar border
  [92.20, 24.05], // Habiganj border
  [92.15, 23.70], // Brahmanbaria / Agartala border
  [92.30, 23.40], // Comilla / Tripura
  [92.45, 22.80], // Feni / Chittagong border
  [92.65, 22.30], // Rangamati / Mizoram
  [92.60, 21.80], // Bandarban Hill Tracts
  [92.35, 21.35], // Naf River border
  [92.30, 20.85], // Teknaf
  [92.34, 20.60], // St. Martin's Island
  [92.10, 21.00], // Cox's Bazar coast
  [91.95, 21.50],
  [91.80, 22.20], // Chittagong port / estuary
  [91.45, 22.45], // Sandwip channel
  [91.00, 22.50], // Meghna estuary
  [90.60, 22.20], // Bhola coast
  [90.35, 21.90], // Kuakata / Patuakhali
  [89.95, 21.80], // Barguna coast
  [89.55, 21.75], // Sundarbans South coast
  [89.15, 21.70], // Dublar Char
  [89.05, 22.10], // Sundarbans West / Harinbhanga river
  [88.95, 22.55], // Satkhira border
  [88.80, 22.95], // Jessore border
  [88.65, 23.35], // Jhenaidah border
  [88.70, 23.85], // Chuadanga / Meherpur
  [88.60, 24.15], // Kushtia / Ganges border
  [88.25, 24.45], // Rajshahi / Padma
  [88.05, 24.75], // Chapai Nawabganj
  [88.20, 25.10], // Naogaon border
  [88.35, 25.45], // Joypurhat / Dinajpur
  [88.40, 25.90], // Dinajpur border
  [88.30, 26.25], // Thakurgaon
  [88.55, 26.63], // Back to Tetulia
];

// Inverse mask: Outer box covering the world, with Bangladesh border as cutout hole
export const BANGLADESH_MASK_GEOJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Bangladesh Outer Mask' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [60.0, 10.0],
            [120.0, 10.0],
            [120.0, 40.0],
            [60.0, 40.0],
            [60.0, 10.0],
          ],
          BANGLADESH_BORDER_COORDINATES,
        ],
      },
    },
  ],
};

export const DIVISION_GEO_MAP: Record<string, DivisionGeoInfo> = {
  dhaka: {
    id: 'div-dhaka',
    name: 'Dhaka',
    bnName: 'ঢাকা',
    slug: 'dhaka',
    capital: 'Dhaka',
    center: [23.8103, 90.4125],
    zoom: 9.5,
    color: '#059669',
    bounds: [[23.0, 89.6], [24.7, 91.1]],
  },
  chittagong: {
    id: 'div-chittagong',
    name: 'Chittagong',
    bnName: 'চট্টগ্রাম',
    slug: 'chittagong',
    capital: 'Chittagong',
    center: [22.3569, 91.8325],
    zoom: 8.8,
    color: '#0284c7',
    bounds: [[20.6, 90.6], [24.3, 92.7]],
  },
  sylhet: {
    id: 'div-sylhet',
    name: 'Sylhet',
    bnName: 'সিলেট',
    slug: 'sylhet',
    capital: 'Sylhet',
    center: [24.8949, 91.8687],
    zoom: 9.2,
    color: '#10b981',
    bounds: [[23.9, 90.9], [25.3, 92.6]],
  },
  rajshahi: {
    id: 'div-rajshahi',
    name: 'Rajshahi',
    bnName: 'রাজশাহী',
    slug: 'rajshahi',
    capital: 'Rajshahi',
    center: [24.3745, 88.6042],
    zoom: 9.0,
    color: '#d97706',
    bounds: [[23.8, 88.0], [25.3, 89.8]],
  },
  khulna: {
    id: 'div-khulna',
    name: 'Khulna',
    bnName: 'খুলনা',
    slug: 'khulna',
    capital: 'Khulna',
    center: [22.8456, 89.5403],
    zoom: 8.8,
    color: '#0d9488',
    bounds: [[21.6, 88.5], [24.1, 89.9]],
  },
  barisal: {
    id: 'div-barisal',
    name: 'Barisal',
    bnName: 'বরিশাল',
    slug: 'barisal',
    capital: 'Barisal',
    center: [22.7010, 90.3696],
    zoom: 9.2,
    color: '#3b82f6',
    bounds: [[21.8, 89.8], [23.1, 91.0]],
  },
  rangpur: {
    id: 'div-rangpur',
    name: 'Rangpur',
    bnName: 'রংপুর',
    slug: 'rangpur',
    capital: 'Rangpur',
    center: [25.7439, 89.2467],
    zoom: 9.0,
    color: '#ea580c',
    bounds: [[25.1, 88.0], [26.65, 89.8]],
  },
  mymensingh: {
    id: 'div-mymensingh',
    name: 'Mymensingh',
    bnName: 'ময়মনসিংহ',
    slug: 'mymensingh',
    capital: 'Mymensingh',
    center: [24.7471, 90.4074],
    zoom: 9.2,
    color: '#8b5cf6',
    bounds: [[24.2, 89.6], [25.3, 91.1]],
  },
};

// Simplified authentic GeoJSON polygons for the 8 administrative divisions of Bangladesh
export const BANGLADESH_DIVISIONS_GEOJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'div-dhaka',
        slug: 'dhaka',
        name: 'Dhaka',
        bnName: 'ঢাকা',
        density: 'High',
        capital: 'Dhaka',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [90.1, 24.3],
            [90.5, 24.5],
            [90.9, 24.2],
            [90.8, 23.7],
            [90.6, 23.4],
            [90.4, 23.1],
            [89.9, 23.2],
            [89.6, 23.6],
            [89.8, 24.1],
            [90.1, 24.3],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'div-chittagong',
        slug: 'chittagong',
        name: 'Chittagong',
        bnName: 'চট্টগ্রাম',
        density: 'Medium',
        capital: 'Chittagong',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [91.1, 24.1],
            [91.6, 24.0],
            [92.1, 23.8],
            [92.4, 23.0],
            [92.6, 22.3],
            [92.3, 21.2],
            [92.0, 20.7],
            [91.8, 21.6],
            [91.4, 22.2],
            [90.8, 22.7],
            [90.7, 23.4],
            [91.1, 24.1],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'div-sylhet',
        slug: 'sylhet',
        name: 'Sylhet',
        bnName: 'সিলেট',
        density: 'Moderate',
        capital: 'Sylhet',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [91.2, 25.1],
            [91.8, 25.2],
            [92.4, 25.0],
            [92.5, 24.4],
            [91.9, 24.1],
            [91.3, 24.2],
            [91.0, 24.8],
            [91.2, 25.1],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'div-rajshahi',
        slug: 'rajshahi',
        name: 'Rajshahi',
        bnName: 'রাজশাহী',
        density: 'High',
        capital: 'Rajshahi',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [88.3, 25.1],
            [89.1, 25.1],
            [89.6, 24.7],
            [89.7, 24.2],
            [89.4, 23.9],
            [88.8, 24.1],
            [88.2, 24.4],
            [88.3, 25.1],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'div-khulna',
        slug: 'khulna',
        name: 'Khulna',
        bnName: 'খুলনা',
        density: 'Medium',
        capital: 'Khulna',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [88.7, 23.9],
            [89.4, 23.8],
            [89.7, 23.1],
            [89.8, 22.4],
            [89.7, 21.7],
            [89.1, 21.7],
            [88.9, 22.3],
            [88.7, 23.0],
            [88.7, 23.9],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'div-barisal',
        slug: 'barisal',
        name: 'Barisal',
        bnName: 'বরিশাল',
        density: 'Medium',
        capital: 'Barisal',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [89.9, 23.1],
            [90.4, 23.1],
            [90.8, 22.7],
            [90.7, 21.9],
            [90.2, 21.8],
            [89.9, 22.3],
            [89.9, 23.1],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'div-rangpur',
        slug: 'rangpur',
        name: 'Rangpur',
        bnName: 'রংপুর',
        density: 'Medium',
        capital: 'Rangpur',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [88.3, 26.5],
            [88.9, 26.6],
            [89.6, 26.2],
            [89.7, 25.4],
            [89.1, 25.2],
            [88.5, 25.3],
            [88.1, 25.9],
            [88.3, 26.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'div-mymensingh',
        slug: 'mymensingh',
        name: 'Mymensingh',
        bnName: 'ময়মনসিংহ',
        density: 'Medium',
        capital: 'Mymensingh',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [89.7, 25.2],
            [90.4, 25.3],
            [91.0, 25.1],
            [90.9, 24.3],
            [90.4, 24.5],
            [89.8, 24.4],
            [89.7, 25.2],
          ],
        ],
      },
    },
  ],
};

// Thematic trail real route coordinates [latitude, longitude]
export interface TrailRouteInfo {
  id: string;
  name: string;
  color: string;
  dashArray: string;
  waypoints: {
    lat: number;
    lng: number;
    name: string;
    description: string;
  }[];
}

export const THEMATIC_TRAILS_GEO: Record<string, TrailRouteInfo> = {
  mughal: {
    id: 'mughal',
    name: 'Mughal Heritage Trail',
    color: '#f59e0b',
    dashArray: '8, 8',
    waypoints: [
      { lat: 23.7086, lng: 90.4060, name: 'Ahsan Manzil', description: 'Nawab residence on the Buriganga' },
      { lat: 23.7196, lng: 90.3882, name: 'Lalbagh Fort', description: '17th-century Mughal fortress' },
      { lat: 23.6558, lng: 90.6033, name: 'Sonargaon & Panam City', description: 'Ancient Bengal medieval capital' },
      { lat: 23.4607, lng: 91.1809, name: 'Mainamati Shalban Vihara', description: 'Archaeological Buddhist landmark' },
    ],
  },
  buddhist: {
    id: 'buddhist',
    name: 'Buddhist Archaeology Trail',
    color: '#ea580c',
    dashArray: '8, 8',
    waypoints: [
      { lat: 25.7878, lng: 88.6657, name: 'Kantajew Temple', description: '18th-century terracotta masterpiece' },
      { lat: 25.0315, lng: 88.9772, name: 'Somapura Mahavihara', description: 'UNESCO World Heritage Buddhist Vihara' },
      { lat: 24.9610, lng: 89.3456, name: 'Mahasthangarh', description: 'Ancient capital Pundranagara' },
      { lat: 24.3639, lng: 88.8354, name: 'Puthiya Temple Complex', description: 'Historic terracotta palace temples' },
    ],
  },
  sylhet: {
    id: 'sylhet',
    name: 'Sylhet Tea & Cloud Forests',
    color: '#10b981',
    dashArray: '8, 8',
    waypoints: [
      { lat: 24.3065, lng: 91.7296, name: 'Sreemangal Tea Gardens', description: 'Tea capital of Bangladesh' },
      { lat: 25.0069, lng: 91.9328, name: 'Ratargul Swamp Forest', description: 'Only freshwater swamp forest in BD' },
      { lat: 25.1633, lng: 92.0167, name: 'Jaflong & Dawki River', description: 'Clear river and Meghalaya hill views' },
    ],
  },
  sundarbans: {
    id: 'sundarbans',
    name: 'Sundarbans Delta Adventure',
    color: '#06b6d4',
    dashArray: '8, 8',
    waypoints: [
      { lat: 22.6738, lng: 89.7423, name: 'Sixty Dome Mosque', description: 'UNESCO Sultanate architecture' },
      { lat: 21.9497, lng: 89.1833, name: 'Sundarbans Forest Reserve', description: 'World largest mangrove delta' },
      { lat: 21.7000, lng: 89.5800, name: 'Kotka Wildlife Sanctuary', description: 'Bengal tiger and spotted deer habitat' },
    ],
  },
};
