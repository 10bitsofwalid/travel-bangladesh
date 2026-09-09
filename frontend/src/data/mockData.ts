import {
  Destination,
  UserProfile,
  ContributionItem,
  SavedItinerary,
  VerifiedGuide,
  ItineraryDayItem
} from '../types';

export const INITIAL_LANDMARKS: Destination[] = [
  {
    id: 'poi-ahsan-manzil',
    name: 'Ahsan Manzil',
    bnName: 'আহসান মঞ্জিল',
    subtitle: 'THE PINK PALACE | DHAKA',
    slug: 'ahsan-manzil-dhaka',
    summary: 'The official residential palace and seat of the Nawab of Dhaka, painted in iconic vibrant pink on the bank of the Buriganga River.',
    description: 'Ahsan Manzil is one of the most magnificent architectural monuments of Bangladesh, showcasing Indo-Saracenic Revival architecture with its grand octagonal dome and historic ceremonial stairs leading to the riverbank.',
    chronicles: 'Bangladesh coloured in a mesmerizing architecture and historical overview written on the history of Dhaka on the banks of the Buriganga river.',
    lore: "The palace's lore arouses in the past prior to the historical Ahsan Manzil reconstruction, when the French factory stood here before Nawab Khwaja Alimullah purchased the property in 1830.",
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    categoryId: 'cat-palaces',
    categoryType: 'HERITAGE',
    thematicTrail: 'mughal',
    latitude: 23.7086,
    longitude: 90.4060,
    elevation: 8,
    coverImage: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'October to March (Winter & Spring)',
    difficulty: 'EASY',
    accessibility: 'Wheelchair accessible ground floor & museum',
    entryFee: 'BDT 40 (Locals) / BDT 500 (Foreign)',
    travelRoutesSummary: 'Via Sadarghat riverfront or Ahsanullah Road Old Dhaka',
    rating: 5.0,
    reviewCount: 142,
    reviews: [
      {
        id: 'rev-1',
        authorName: 'Tanvir Hossain',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'Recent all',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed da eiusmod iannil.'
      },
      {
        id: 'rev-2',
        authorName: 'Sarah Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2 weeks ago',
        comment: 'The pink exterior reflecting in the evening light is unforgettable. Outstanding VR tour!'
      }
    ],
    timeline: [
      { year: '1678', event: 'Construction', details: 'Original Jalalpur trading house built by French traders' },
      { year: '1888', event: 'British Acquisition & Reconstruction', details: 'Nawab Ahsanullah reconstructed the palace after the 1888 tornado' },
      { year: '1986', event: 'British Communities & National Museum', details: 'Declared a protected monument and renovated into national heritage museum' },
      { year: '1937', event: 'British Countures & Partition Archive', details: 'Historic meeting site of regional leaders' }
    ],
    isFeatured: true,
    division: { id: 'div-dhaka', name: 'Dhaka', bnName: 'ঢাকা', slug: 'dhaka', latitude: 23.8103, longitude: 90.4125 },
    district: { id: 'dist-dhaka', divisionId: 'div-dhaka', name: 'Dhaka', bnName: 'ঢাকা', slug: 'dhaka', latitude: 23.8103, longitude: 90.4125 },
    category: { id: 'cat-palaces', name: 'Palaces & Forts', type: 'HERITAGE', slug: 'palaces', icon: 'castle', color: '#f59e0b', description: 'Royal residences and historical palaces' },
    heritageDetail: {
      id: 'hd-ahsan-manzil',
      periodEra: 'Nawab Era (1859–1872 CE)',
      builtYear: '1872 CE',
      architecturalStyle: 'Indo-Saracenic Revival & Neoclassical',
      historicalSignificance: 'Seat of the Dhaka Nawab family and the cradle where the All India Muslim League was founded in 1906.',
      unescoStatus: 'TENTATIVE_LIST',
      verificationStatus: 'VERIFIED_BY_EXPERT',
      verifiedBy: 'National Museum of Bangladesh & Asiatic Society',
      sources: [
        { title: 'Ahsan Manzil and the Nawabs of Dacca', author: 'Dr. Abdul Karim', year: '1992' },
        { title: 'Archaeological Survey of Dhaka', author: 'A.H. Dani', year: '1962' }
      ]
    }
  },
  {
    id: 'poi-sylhet-tea',
    name: 'Sylhet Tea Route & Ratargul',
    bnName: 'শ্রীমঙ্গল ও রাতারগুল সোয়াম্প ফরেস্ট',
    subtitle: 'TEA CAPITAL & HIDDEN WATERFALLS | SYLHET',
    slug: 'sylhet-tea-route',
    summary: 'Sprawling emerald tea estates rolling across low undulating hills, hidden cascade waterfalls, and freshwater swamp forests.',
    description: 'Sylhet is Bangladesh’s green sanctuary, famous for the world’s finest seven-layer tea, Sreemangal gardens, Ratargul swamp forest, and misty hills bordering Meghalaya.',
    chronicles: 'First commercial tea garden established in Malnicherra in 1854, transforming Sylhet into the premier tea hub of Bengal.',
    lore: 'Local folklore speaks of the deep whispers of the cloud forests and water spirits that guard the crystal pools of Hum Hum.',
    divisionId: 'div-sylhet',
    districtId: 'dist-sylhet',
    categoryId: 'cat-hills',
    categoryType: 'NATURE',
    thematicTrail: 'sylhet',
    latitude: 24.8949,
    longitude: 91.8687,
    elevation: 35,
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'June to November (Vibrant emerald monsoon & tea harvest)',
    difficulty: 'MODERATE',
    rating: 4.9,
    reviewCount: 98,
    reviews: [
      {
        id: 'rev-sylhet-1',
        authorName: 'Nafis Iqbal',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'Kayaking in Ratargul at sunrise was an otherworldly experience. Highly recommend the certified guides!'
      }
    ],
    timeline: [
      { year: '1854', event: 'First Tea Estate', details: 'Malnicherra tea garden founded' },
      { year: '1973', event: 'Ratargul Sanctuary', details: 'Notified as a Special Biodiversity Reserve' }
    ],
    isFeatured: true,
    division: { id: 'div-sylhet', name: 'Sylhet', bnName: 'সিলেট', slug: 'sylhet', latitude: 24.8949, longitude: 91.8687 },
    district: { id: 'dist-sylhet', divisionId: 'div-sylhet', name: 'Sylhet', bnName: 'সিলেট', slug: 'sylhet', latitude: 24.8949, longitude: 91.8687 },
  },
  {
    id: 'poi-sundarbans',
    name: 'Sundarbans Mangrove Forest',
    bnName: 'সুন্দরবন ম্যানগ্রোভ বন',
    subtitle: 'WORLD’S LARGEST MANGROVE | KHULNA',
    slug: 'sundarbans-mangrove',
    summary: 'The world’s largest contiguous halophytic mangrove forest and prime habitat of the endangered Royal Bengal Tiger.',
    description: 'An intricate delta network of tidal waterways, mudflats, and coastal islands stretching across Khulna and Bagerhat to the Bay of Bengal.',
    chronicles: 'Inscribed as a UNESCO World Heritage Site in 1997 for its exceptional ecological processes and mangrove fauna.',
    lore: 'Legend of Bonbibi, the guardian goddess of the forest, revered equally by Hindu and Muslim honey-hunters and fishermen.',
    divisionId: 'div-khulna',
    districtId: 'dist-bagerhat',
    categoryId: 'cat-forest',
    categoryType: 'NATURE',
    thematicTrail: 'sundarbans',
    latitude: 21.9497,
    longitude: 89.1833,
    elevation: 2,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'November to March (Winter cruises & wildlife sightings)',
    difficulty: 'MODERATE',
    rating: 4.9,
    reviewCount: 164,
    reviews: [],
    timeline: [
      { year: '1875', event: 'Protected Forest Reserve', details: 'First reserved forest declaration under Forest Act' },
      { year: '1997', event: 'UNESCO World Heritage', details: 'Inscribed on the UNESCO World Heritage List' }
    ],
    isFeatured: true,
    division: { id: 'div-khulna', name: 'Khulna', bnName: 'খুলনা', slug: 'khulna', latitude: 22.8456, longitude: 89.5403 },
    district: { id: 'dist-bagerhat', divisionId: 'div-khulna', name: 'Bagerhat', bnName: 'বাগেরহাট', slug: 'bagerhat', latitude: 22.6602, longitude: 89.7895 },
    heritageDetail: {
      id: 'hd-sundarbans',
      historicalSignificance: 'The premier mangrove delta supporting royal Bengal tigers, estuarine crocodiles, and Ganges river dolphins.',
      unescoStatus: 'WORLD_HERITAGE_SITE',
      verificationStatus: 'VERIFIED_BY_EXPERT',
      sources: [{ title: 'UNESCO Sundarbans National Park Document #798' }]
    }
  },
  {
    id: 'poi-sixty-dome',
    name: 'Sixty Dome Mosque (Shait Gumbad)',
    bnName: 'ষাট গম্বুজ মসজিদ',
    subtitle: 'HISTORIC MOSQUE CITY | BAGERHAT',
    slug: 'sixty-dome-mosque-bagerhat',
    summary: '15th-century UNESCO World Heritage Sultanate brick marvel built by legendary warrior-saint Khan Jahan Ali.',
    description: 'Featuring 77 low domes supported by 60 stone pillars and massive 6-foot-thick tapering brick walls in Tughlaq-Bengal fusion style.',
    chronicles: 'Founded in the mid-15th century as the congregational center of the historic Khalifatabad settlement.',
    divisionId: 'div-khulna',
    districtId: 'dist-bagerhat',
    categoryId: 'cat-religious-heritage',
    categoryType: 'CULTURE',
    latitude: 22.6742,
    longitude: 89.7419,
    elevation: 7,
    coverImage: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    bestTimeToVisit: 'October to March',
    difficulty: 'EASY',
    rating: 4.8,
    reviewCount: 76,
    reviews: [],
    timeline: [
      { year: '1459', event: 'Completion by Khan Jahan Ali', details: 'Dedicated as central Friday mosque of Khalifatabad' },
      { year: '1985', event: 'UNESCO World Heritage Inscription', details: 'Protected as Historic Mosque City of Bagerhat' }
    ],
    isFeatured: true,
    division: { id: 'div-khulna', name: 'Khulna', bnName: 'খুলনা', slug: 'khulna', latitude: 22.8456, longitude: 89.5403 },
    district: { id: 'dist-bagerhat', divisionId: 'div-khulna', name: 'Bagerhat', bnName: 'বাগেরহাট', slug: 'bagerhat', latitude: 22.6602, longitude: 89.7895 },
    heritageDetail: {
      id: 'hd-sixty-dome',
      periodEra: 'Bengal Sultanate (15th century)',
      builtYear: '1459 CE',
      architecturalStyle: 'Khan Jahani Tughlaq-Bengal Fusion',
      historicalSignificance: 'One of the most impressive medieval Muslim monuments in the Indian subcontinent.',
      unescoStatus: 'WORLD_HERITAGE_SITE',
      verificationStatus: 'VERIFIED_BY_EXPERT',
      sources: [{ title: 'Historic Mosque City of Bagerhat', url: 'https://whc.unesco.org/en/list/321' }]
    }
  },
  {
    id: 'poi-paharpur',
    name: 'Somapura Mahavihara',
    bnName: 'সোমপুর মহাবিহার (পাহাড়পুর)',
    subtitle: 'ANCIENT BUDDHIST MONASTERY | NAOGAON',
    slug: 'somapura-mahavihara-paharpur',
    summary: '8th-century UNESCO World Heritage Buddhist monastic complex founded by Pala Emperor Dharmapala.',
    description: 'One of the largest pre-modern viharas in Asia, with a grand terraced cruciform stupa in the center surrounded by 177 monk cells.',
    chronicles: 'Celebrated by Tibetan chronicler Taranatha as a grand university equal to Nalanda and Vikramashila.',
    divisionId: 'div-rajshahi',
    districtId: 'dist-naogaon',
    categoryId: 'cat-archaeology',
    categoryType: 'HERITAGE',
    latitude: 25.0315,
    longitude: 88.9770,
    elevation: 20,
    coverImage: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    bestTimeToVisit: 'November to February',
    difficulty: 'EASY',
    rating: 4.9,
    reviewCount: 88,
    reviews: [],
    timeline: [
      { year: '781', event: 'Foundation by Dharmapala', details: 'Built as paramount learning center of ancient Bengal' },
      { year: '1985', event: 'UNESCO World Heritage Listing', details: 'Ruins recognized on World Heritage register' }
    ],
    isFeatured: true,
    division: { id: 'div-rajshahi', name: 'Rajshahi', bnName: 'রাজশাহী', slug: 'rajshahi', latitude: 24.3745, longitude: 88.6042 },
    district: { id: 'dist-naogaon', divisionId: 'div-rajshahi', name: 'Naogaon', bnName: 'নওগাঁ', slug: 'naogaon', latitude: 24.7936, longitude: 88.9318 },
    heritageDetail: {
      id: 'hd-paharpur',
      periodEra: 'Pala Empire (c. 781–821 CE)',
      builtYear: 'c. 800 CE',
      architecturalStyle: 'Cruciform Terracotta Buddhist Vihara',
      historicalSignificance: 'Influenced monumental Buddhist architecture across Southeast Asia including Pagan in Myanmar and Prambanan in Java.',
      unescoStatus: 'WORLD_HERITAGE_SITE',
      verificationStatus: 'VERIFIED_BY_EXPERT',
      sources: [{ title: 'Excavations at Paharpur', author: 'K. N. Dikshit', year: '1938' }]
    }
  },
  {
    id: 'poi-sajek',
    name: 'Sajek Valley',
    bnName: 'সাজেক ভ্যালি',
    subtitle: 'VALLEY OF CLOUDS | RANGAMATI',
    slug: 'sajek-valley-rangamati',
    summary: 'The Queen of Hills nestled in the Chittagong Hill Tracts, floating above ocean of clouds with breathtaking sunrise peaks.',
    description: 'Located 1,800 feet above sea level in Baghaichhari Upazila of Rangamati, Sajek is famous for wooden cottages perched on ridges, Lushei indigenous culture, and dramatic sunset over mountain waves.',
    divisionId: 'div-chittagong',
    districtId: 'dist-rangamati',
    categoryId: 'cat-hills',
    categoryType: 'NATURE',
    latitude: 23.3820,
    longitude: 92.2938,
    elevation: 550,
    coverImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    bestTimeToVisit: 'September to February (Cloud season)',
    difficulty: 'EASY',
    rating: 4.9,
    reviewCount: 210,
    reviews: [],
    timeline: [],
    isFeatured: true,
    division: { id: 'div-chittagong', name: 'Chittagong', bnName: 'চট্টগ্রাম', slug: 'chittagong', latitude: 22.3569, longitude: 91.8325 },
    district: { id: 'dist-rangamati', divisionId: 'div-chittagong', name: 'Rangamati', bnName: 'রাঙ্গামাটি', slug: 'rangamati', latitude: 22.6533, longitude: 92.1789 }
  },
  {
    id: 'poi-lalbagh',
    name: 'Lalbagh Fort',
    bnName: 'লালবাগ কেল্লা',
    subtitle: 'MUGHAL CITADEL | OLD DHAKA',
    slug: 'lalbagh-fort-dhaka',
    summary: '17th-century incomplete Mughal palace fortress situated along the Buriganga river in southwest Dhaka.',
    description: 'Commissioned by Mughal Prince Muhammad Azam during his governorship in 1678, featuring the Tomb of Pari Bibi, the Diwan-i-Aam, and Mughal water hammams.',
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    categoryId: 'cat-forts',
    categoryType: 'HERITAGE',
    thematicTrail: 'mughal',
    latitude: 23.7196,
    longitude: 90.3882,
    coverImage: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    bestTimeToVisit: 'Year round (Morning & golden hour)',
    difficulty: 'EASY',
    rating: 4.8,
    reviewCount: 130,
    reviews: [],
    timeline: [],
    isFeatured: false,
    division: { id: 'div-dhaka', name: 'Dhaka', bnName: 'ঢাকা', slug: 'dhaka', latitude: 23.8103, longitude: 90.4125 },
    district: { id: 'dist-dhaka', divisionId: 'div-dhaka', name: 'Dhaka', bnName: 'ঢাকা', slug: 'dhaka', latitude: 23.8103, longitude: 90.4125 },
  }
];

export const MOCK_USER_PROFILE: UserProfile = {
  name: 'ZAYN K.',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  isVerified: true,
  contributorLevel: 3,
  email: 'zaynk@gmail.com',
  phone: '+23 56547333',
  gamification: {
    statusTitle: 'Verified Heritage Expert',
    historicalValidations: 15,
    landmarkPhotoApprovals: 5,
    communityAwards: 2,
    levelProgress: 82,
    currentLevel: 4
  },
  settings: {
    notifications: true,
    security: true,
    paymentMethods: false,
    verifiedGuideStatus: true
  }
};

export const MOCK_CONTRIBUTIONS: ContributionItem[] = [
  {
    id: 'contrib-1',
    title: 'Ahsan Manzil Palace',
    category: 'Architecture & History',
    status: 'Approved',
    points: 10,
    modifiedDate: 'Apr 17, 2021',
    imageUrl: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'contrib-2',
    title: 'Sylhet Hidden Falls Aerial Grid',
    category: 'Nature & Drone Mapping',
    status: 'Pending',
    points: 30,
    modifiedDate: 'Apr 18, 2021',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'contrib-3',
    title: 'AHSAN MANZIL: Historical Data VR Panorama',
    subtitle: 'Interactive 360° Spherical Photogrammetry',
    category: 'VR & 3D Heritage',
    status: 'Approved',
    points: 10,
    modifiedDate: 'Jan 14, 2021 | Thu, July 20, 2021',
    imageUrl: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=500&q=80',
    isVideoOrVr: true
  }
];

export const MOCK_SAVED_ITINERARIES: SavedItinerary[] = [
  {
    id: 'itin-1',
    title: '7-Day Mughal Heritage Trail (Starts: Oct 12)',
    guideLink: 'Guide Link',
    travelMapLink: 'Travel Map',
    mapPreviewImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=240&q=80',
    durationDays: 7
  },
  {
    id: 'itin-2',
    title: '7-Day Mughal Heritage Trail (Starts: Oct 12)',
    guideLink: 'Guide Link',
    travelMapLink: 'Travel Link',
    mapPreviewImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=240&q=80',
    durationDays: 7
  }
];

export const MOCK_VERIFIED_GUIDES: VerifiedGuide[] = [
  {
    id: 'guide-1',
    name: 'RAHMAN A.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    isVerified: true,
    rating: 4.8,
    verifiedToursCount: 43,
    languages: ['Bengali', 'English', 'German'],
    specialization: 'Mughal History',
    hourlyRate: 35
  },
  {
    id: 'guide-2',
    name: 'RAHMAN N.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    isVerified: true,
    rating: 4.8,
    verifiedToursCount: 43,
    languages: ['Bengali', 'English', 'German'],
    specialization: 'Local History',
    hourlyRate: 35
  },
  {
    id: 'guide-3',
    name: 'MAHMUD S.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    isVerified: true,
    rating: 4.9,
    verifiedToursCount: 52,
    languages: ['Bengali', 'English'],
    specialization: 'Nature & Photography',
    hourlyRate: 40
  }
];

export const MOCK_ITINERARY_DAYS: ItineraryDayItem[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    title: 'Day 1: Dhaka - Ahsan Manzil & Old Dhaka',
    location: 'Dhaka, Buriganga Riverfront',
    travelTime: '3 h 40 min',
    description: 'Explore the pink palace, Armenian Church, and take a wooden boat along Buriganga.',
    destinationId: 'poi-ahsan-manzil'
  },
  {
    id: 'day-2',
    dayNumber: 2,
    title: 'Day 2: Sylhet - Tea Gardens & Hidden Falls',
    location: 'Sreemangal, Sylhet',
    travelTime: '4 h 15 min',
    description: 'Trek through Malnicherra tea estate, seven-layer tea tasting, and Madhabkunda falls.',
    destinationId: 'poi-sylhet-tea'
  },
  {
    id: 'day-3',
    dayNumber: 3,
    title: 'Day 3: Sylhet - Tenah & Hidden Falls',
    location: 'Jaflong & Lalakhal river',
    travelTime: '2 h 30 min',
    description: 'Crystal waters of Lalakhal and tea garden terraces along the Indian border.'
  },
  {
    id: 'day-4',
    dayNumber: 4,
    title: 'Day 4: Sylhet - Tea Gardens & Hidden Falls',
    location: 'Ratargul Swamp Forest',
    travelTime: '2 h 10 min',
    description: 'Submerged freshwater forest canopy boat cruise.'
  }
];
