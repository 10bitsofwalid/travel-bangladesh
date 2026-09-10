export interface HotelOption {
  id: string;
  name: string;
  destinationId: string;
  divisionSlug: string;
  location: string;
  rating: number;
  reviewCount: number;
  pricePerNightUsd: number;
  pricePerNightBdt: number;
  image: string;
  amenities: string[];
  roomType: string;
  badge?: string;
  description: string;
}

export interface SurroundingPlace {
  name: string;
  distance: string;
  type: string;
  description: string;
}

export interface DestinationSurroundings {
  immediateSetting: string;
  surroundings: SurroundingPlace[];
  culinarySpecialty: string;
  bestTimeOfDay: string;
}

export const CURATED_HOTELS: HotelOption[] = [
  {
    id: 'hotel-pan-pacific',
    name: 'Pan Pacific Sonargaon Heritage Hotel',
    destinationId: 'poi-ahsan-manzil',
    divisionSlug: 'dhaka',
    location: 'Karwan Bazar, Dhaka (3.8 km from Ahsan Manzil)',
    rating: 4.8,
    reviewCount: 312,
    pricePerNightUsd: 95,
    pricePerNightBdt: 11400,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    amenities: ['Heritage Architecture', 'Swimming Pool', 'Airport Shuttle', 'Buffet Breakfast', 'Spa & Wellness'],
    roomType: 'Deluxe Heritage King Suite',
    badge: 'Premier Heritage Partner',
    description: 'Iconic 5-star luxury hotel close to Old Dhaka historical quarter with fine Bengali dining.',
  },
  {
    id: 'hotel-old-dhaka-inn',
    name: 'Old Dhaka Heritage Boutique Inn',
    destinationId: 'poi-ahsan-manzil',
    divisionSlug: 'dhaka',
    location: 'Shakharibazar, Old Dhaka (0.8 km from Ahsan Manzil)',
    rating: 4.6,
    reviewCount: 140,
    pricePerNightUsd: 45,
    pricePerNightBdt: 5400,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    amenities: ['Rooftop River View', 'Traditional Breakfast', 'Free Wi-Fi', 'Heritage Walking Guide'],
    roomType: 'Colonial Balcony Room',
    badge: 'Historic Quarter Pick',
    description: 'Charming restored colonial merchant residence nestled within the historic lanes of Old Dhaka.',
  },
  {
    id: 'hotel-grand-sultan',
    name: 'Grand Sultan Tea Resort & Golf',
    destinationId: 'poi-sreemangal',
    divisionSlug: 'sylhet',
    location: 'Radhanagar, Sreemangal (2.5 km from Tea Estates)',
    rating: 4.9,
    reviewCount: 420,
    pricePerNightUsd: 110,
    pricePerNightBdt: 13200,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    amenities: ['Tea Garden Panorama', 'Golf Course', 'Temperature-Controlled Pools', 'Lawachara Forest Tours'],
    roomType: 'Panoramic Tea Garden Villa',
    badge: 'Top Rated Eco-Luxury',
    description: 'Premier eco-resort overlooking endless rolling emerald tea hills with five-star luxury amenities.',
  },
  {
    id: 'hotel-dusai-resort',
    name: 'Dusai Resort & Spa Sreemangal',
    destinationId: 'poi-sreemangal',
    divisionSlug: 'sylhet',
    location: 'Garatilla, Moulvibazar (8.0 km from Sreemangal)',
    rating: 4.9,
    reviewCount: 280,
    pricePerNightUsd: 125,
    pricePerNightBdt: 15000,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    amenities: ['Forest Infinity Pool', 'Ayurvedic Spa', 'Bicycle Trails', 'Organic Farm Dining'],
    roomType: 'Hillside Private Chalet',
    badge: 'Rainforest Retreat',
    description: 'Award-winning eco-luxury resort built around natural terraced hillocks and tropical greenery.',
  },
  {
    id: 'hotel-shukhtara-swamp',
    name: 'Shukhtara Nature Retreat Sylhet',
    destinationId: 'poi-ratargul',
    divisionSlug: 'sylhet',
    location: 'Hilua Chora, Sylhet (Near Ratargul Canal Pier)',
    rating: 4.7,
    reviewCount: 175,
    pricePerNightUsd: 60,
    pricePerNightBdt: 7200,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    amenities: ['Swamp Boat Excursions', 'Freshwater Fish Grill', 'Open Verandah', 'Birdwatching Guide'],
    roomType: 'Green Hilltop Cottage',
    badge: 'Swamp Forest Gateway',
    description: 'Peaceful nature retreat offering sunrise wooden boat expeditions into the Ratargul swamp canopy.',
  },
  {
    id: 'hotel-khan-jahan-rest',
    name: 'Khan Jahan Ali Heritage Rest House',
    destinationId: 'poi-sixty-dome',
    divisionSlug: 'khulna',
    location: 'Old Court Road, Bagerhat (1.5 km from Sixty Dome Mosque)',
    rating: 4.6,
    reviewCount: 95,
    pricePerNightUsd: 38,
    pricePerNightBdt: 4560,
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
    amenities: ['Dighi Lake View', 'Complimentary Breakfast', 'Bicycle Rentals', 'Archaeological Library'],
    roomType: 'Heritage Deluxe Room',
    badge: 'UNESCO Site Proximity',
    description: 'Comfortable lodge set in tranquil delta gardens right near the historic mosques and dighis of Khalifatabad.',
  },
  {
    id: 'hotel-tiger-den',
    name: 'Tiger Den Mangrove Safari Resort',
    destinationId: 'poi-sundarbans',
    divisionSlug: 'khulna',
    location: 'Mongla Port & Sundarbans Gateway',
    rating: 4.8,
    reviewCount: 210,
    pricePerNightUsd: 85,
    pricePerNightBdt: 10200,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    amenities: ['Liveaboard Delta Cruiser', 'Armed Forest Guard Escort', 'Mangrove Boardwalk', 'All Meals Included'],
    roomType: 'Riverboat VIP Cabin Suite',
    badge: 'Wild Delta Adventure',
    description: 'Unforgettable riverine base with private wooden cruisers exploring Kotka, Kochikhali, and tiger territory.',
  },
  {
    id: 'hotel-momo-inn',
    name: 'Momo Inn Five-Star Heritage Resort',
    destinationId: 'poi-paharpur',
    divisionSlug: 'rajshahi',
    location: 'Nawdapara, Bogura (Near Paharpur & Mahasthangarh)',
    rating: 4.7,
    reviewCount: 190,
    pricePerNightUsd: 70,
    pricePerNightBdt: 8400,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
    amenities: ['Helipad', 'Swimming Pool', 'Archaeology Tour Concierge', 'Multi-Cuisine Dining'],
    roomType: 'Executive King Room',
    badge: 'Silk & Varendra Hub',
    description: 'Five-star luxury oasis with lush landscaping, ideal base for exploring Buddhist Somapura Mahavihara.',
  },
  {
    id: 'hotel-kantajew-lodge',
    name: 'Kantajew Terracotta Eco-Lodge',
    destinationId: 'poi-kantajew',
    divisionSlug: 'rangpur',
    location: 'Kaharole, Dinajpur (0.6 km from Kantajew Temple)',
    rating: 4.5,
    reviewCount: 88,
    pricePerNightUsd: 35,
    pricePerNightBdt: 4200,
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
    amenities: ['Dhepa River View', 'Local Folk Music Nights', 'Organic Village Food', 'Terracotta Workshop'],
    roomType: 'Thatched Clay Cottage',
    badge: 'Rural Cultural Gem',
    description: 'Authentic village-style eco-resort within walking distance of the historic 18th-century terracotta temple.',
  },
];

export const SURROUNDINGS_MAP: Record<string, DestinationSurroundings> = {
  'poi-ahsan-manzil': {
    immediateSetting: 'Situated on the bustling northern bank of the Buriganga River in Islampur, surrounded by historic merchant alleys, boat piers, and vibrant Mughal bazaars.',
    surroundings: [
      { name: 'Lalbagh Fort', distance: '3.2 km', type: 'Mughal Citadel', description: 'Incomplete 17th-century fortress complex with Pari Bibi mausoleum and royal hammam.' },
      { name: 'Tara Masjid (Star Mosque)', distance: '1.1 km', type: 'Chini-Tikri Architecture', description: 'Stunning white mosque adorned with blue porcelain floral star mosaics.' },
      { name: 'Sadarghat Riverfront Launch Terminal', distance: '0.6 km', type: 'River Life & Ferry Ghat', description: 'The beating heart of Bengal waterways with hundreds of traditional wooden sampans.' },
      { name: 'Shakharibazar Heritage Alley', distance: '0.8 km', type: 'Conch Artisans & Bazaar', description: 'Narrow centuries-old lane known for traditional conch shell jewelry and Hindu shrines.' },
    ],
    culinarySpecialty: 'Old Dhaka Kacchi Biryani, Bakarkhani bread, Beauty Lassi & Lemonade, and spiced Morog Polao.',
    bestTimeOfDay: 'Late afternoon (3:30 PM - 5:30 PM) for sunset views over the Buriganga River.',
  },
  'poi-sreemangal': {
    immediateSetting: 'Rolling terraced tea gardens surrounded by natural tropical hills, rubber plantations, and pineapple groves on the edge of the Lawachara rainforest.',
    surroundings: [
      { name: 'Lawachara National Park', distance: '7.5 km', type: 'Tropical Evergreen Rainforest', description: 'Dense canopy forest home to endangered Western Hoolock Gibbons, barking deer, and python species.' },
      { name: 'Baikka Beel Wetland Sanctuary', distance: '14.0 km', type: 'Freshwater Lagoon', description: 'Protected water sanctuary teeming with thousands of migratory Siberian birds and lotus flowers.' },
      { name: 'Finlay & Malnicherra Tea Estates', distance: '1.5 km', type: 'Historic Tea Plantations', description: 'Expansive colonial-era tea fields with shaded walking tracks and tea pluckers in vibrant sarees.' },
      { name: 'Nilkantha Tea Cabin', distance: '2.0 km', type: 'Iconic Beverage Spot', description: 'World-famous inventor of the layered Seven-Color Tea with distinct natural flavors.' },
    ],
    culinarySpecialty: 'Seven-Layer Tea, wild Satkara citrus beef curry, pineapple honey relish, and Manipuri rice cakes.',
    bestTimeOfDay: 'Early morning (6:30 AM - 9:00 AM) when morning mist drifts across the green tea hills.',
  },
  'poi-ratargul': {
    immediateSetting: 'Lush freshwater swamp forest submerged in 20 to 30 feet of translucent river water during the monsoon, shaded by Koroch and Hijal evergreen canopies.',
    surroundings: [
      { name: 'Gowainghat Boat Pier', distance: '0.5 km', type: 'Canoe Launch Ghat', description: 'Starting point for silent hand-paddled wooden dinghy tours through the submerged forest.' },
      { name: 'Lala Khal (Emerald River)', distance: '18.0 km', type: 'Crystal Waterway', description: 'Serene river known for turquoise blue water flowing down from the Meghalaya mountains.' },
      { name: 'Pangthumai Waterfall Lookout', distance: '22.0 km', type: 'Cascading Falls View', description: 'Scenic border viewpoint overlooking the mighty Barhill waterfall crashing from Indian hills.' },
    ],
    culinarySpecialty: 'Freshwater Chitol fish kofta, steamed Aush rice, Sylheti dried fish Shutki bhorta, and wild lime pickle.',
    bestTimeOfDay: 'Early morning or late afternoon for quiet wildlife spotting among submerged trees.',
  },
  'poi-sixty-dome': {
    immediateSetting: 'Tranquil deltaic plain surrounded by ancient excavated freshwater dighis, towering coconut palms, and historic 15th-century terracotta brick monuments.',
    surroundings: [
      { name: 'Mausoleum of Khan Jahan Ali', distance: '2.8 km', type: 'Sufi Shrine Complex', description: 'Sacred lakeside shrine housing tomb of the warrior-saint and ancient marsh crocodiles in the holy tank.' },
      { name: 'Ghoradighi Lake', distance: '0.2 km', type: 'Historic Water Reservoir', description: 'Expansive 15th-century freshwater dighi dug to provide sweet water for the medieval city of Khalifatabad.' },
      { name: 'Singar & Bibi Begni Mosques', distance: '0.9 km', type: 'Single-Domed Brick Shrines', description: 'Remarkable massive square terracotta mosques with decorative curved cornices and floral tiles.' },
    ],
    culinarySpecialty: 'Chui Jhal spicy beef curry, fresh sweet green coconut water, Sundarbans raw forest honey, and Bagerhat shrimp.',
    bestTimeOfDay: 'Sunrise and golden hour when the red burnt-brick domes glow warmly against the lake waters.',
  },
  'poi-sundarbans': {
    immediateSetting: 'World’s largest contiguous tidal halophytic mangrove forest, split by tidal creeks, mudflats, and coastal estuaries emptying into the Bay of Bengal.',
    surroundings: [
      { name: 'Kotka Wildlife Watchtower', distance: '1.2 km', type: 'Observation Tower', description: 'Elevated wooden deck overlooking coastal meadows where spotted deer herds and wild boars graze.' },
      { name: 'Jamtola Sea Beach', distance: '3.5 km', type: 'Untamed Coastal Strand', description: 'Pristine, untouched natural beach on the Bay of Bengal bordered by mangrove driftwood trees.' },
      { name: 'Harbaria Eco-Tourism Center', distance: '12.0 km', type: 'Canopy Boardwalk', description: 'Raised wooden walkway winding deep through dense mangrove swamps with crocodile sunning banks.' },
    ],
    culinarySpecialty: 'Steamed Hilsa (Ilish) fish, tiger prawn curry in coconut milk, fresh Sundarbans wild honey, and red river crab.',
    bestTimeOfDay: 'Dawn during high tide when small wooden boats can venture deep into silent mangrove canals.',
  },
  'poi-paharpur': {
    immediateSetting: 'Peaceful archaeological garden set in the agrarian Varendra plains, surrounding the colossal cruciform brick Buddhist stupa of ancient Somapura Mahavihara.',
    surroundings: [
      { name: 'Paharpur Archaeological Site Museum', distance: '0.1 km', type: 'On-Site Heritage Museum', description: 'Houses hundreds of authentic 8th-century terracotta plaques, stone sculptures, and bronze Buddha statues.' },
      { name: 'Jagaddala Mahavihara Ruins', distance: '18.0 km', type: 'Ancient Buddhist Monastery', description: 'Sister university monastery of the Pala Empire known for Tibetan translations of Buddhist texts.' },
      { name: 'Mahasthangarh Citadel (Bogra)', distance: '42.0 km', type: 'Mauryan City Citadel', description: 'The oldest fortified urban archaeological site in Bangladesh dating back to the 3rd century BCE.' },
    ],
    culinarySpecialty: 'Bogura sweet curd (Doi), traditional Chhana sweets, Katari bhog aromatic rice, and Varendra lentil curries.',
    bestTimeOfDay: 'Late afternoon when shadows stretch across the 177 monastic cells and central cruciform temple.',
  },
  'poi-kantajew': {
    immediateSetting: 'Serene rural agricultural setting bordering the Dhepa River, framed by mango groves, bamboo clusters, and peaceful Northern village life.',
    surroundings: [
      { name: 'Nayabad Mosque', distance: '1.5 km', type: '18th Century Mughal Mosque', description: 'Built by Muslim terracotta craftsmen while they were constructing the adjacent Kantajew Temple.' },
      { name: 'Dinajpur Rajbari (Royal Palace)', distance: '16.0 km', type: 'Maharaja Palace Complex', description: 'Historic palace of the Maharaja of Dinajpur with Krishna temples, darbar hall, and water tanks.' },
      { name: 'Ramsagar National Lake', distance: '22.0 km', type: 'Largest Historic Lake', description: 'Massive excavated reservoir built in 1750 CE, now a national park with resident water birds.' },
    ],
    culinarySpecialty: 'Dinajpur litchi, aromatic Chinigura polao rice, traditional Northern Duck curry, and sweet sandesh.',
    bestTimeOfDay: 'Morning daylight (8:00 AM - 11:00 AM) when sunshine highlights all intricate terracotta panel carvings.',
  },
};

export function getSurroundingsForDestination(destinationId: string): DestinationSurroundings {
  if (SURROUNDINGS_MAP[destinationId]) {
    return SURROUNDINGS_MAP[destinationId];
  }
  return {
    immediateSetting: 'Rich natural and historical landscape of Bangladesh, surrounded by green deltaic waterways and vibrant local village settlements.',
    surroundings: [
      { name: 'Local Heritage Quarter', distance: '1.2 km', type: 'Cultural Bazaar', description: 'Centuries-old market with traditional handicrafts, copper artisans, and spice merchants.' },
      { name: 'Scenic Riverfront Pier', distance: '2.5 km', type: 'Waterfront', description: 'Tranquil riverbank with traditional wooden boats and panoramic sunset vistas.' },
      { name: 'Archaeological Site Museum', distance: '0.8 km', type: 'Museum & Relics', description: 'Exhibits historical relics, archival inscriptions, and ancient architectural pottery.' },
    ],
    culinarySpecialty: 'Authentic local riverine fish curry, aromatic seasonal rice, and regional traditional sweets.',
    bestTimeOfDay: 'Morning and late afternoon golden hour.',
  };
}

export function getHotelsForDestination(destinationId: string): HotelOption[] {
  const matched = CURATED_HOTELS.filter((h) => h.destinationId === destinationId);
  if (matched.length > 0) return matched;
  return [CURATED_HOTELS[0], CURATED_HOTELS[1]];
}

export interface TransportOption {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  pricePerDayUsd: number;
  pricePerDayBdt: number;
  description: string;
  features: string[];
  badge?: string;
}

export const TRANSPORT_OPTIONS: TransportOption[] = [
  {
    id: 'transport-private-van',
    name: 'Private AC Tourist HiAce / Noah Van',
    category: 'Private Road Chauffeur',
    subtitle: 'Dedicated Chauffeur, Highway Tolls & Fuel Included',
    pricePerDayUsd: 55,
    pricePerDayBdt: 6600,
    badge: 'Most Popular for Families & Groups',
    description: 'Exclusive air-conditioned tourist van with seasoned highway driver. Seamless door-to-door transit between Dhaka, Sylhet, and archaeological circuits.',
    features: ['Dedicated Tourist Chauffeur', 'Padma & Jamuna Bridge Tolls', 'Door-to-Door Hotel Transfers', 'Chilled Bottled Water']
  },
  {
    id: 'transport-rail-express',
    name: 'Bangladesh Railway Intercity AC Chair / Snigdha',
    category: 'Scenic Rural Train',
    subtitle: 'Reserved Priority Seats Through Emerald Rice Fields',
    pricePerDayUsd: 20,
    pricePerDayBdt: 2400,
    badge: 'Authentic Cultural Scenic Ride',
    description: 'First-class air-conditioned carriage (Parabat, Subarna, or Kalni Express). Glide through the scenic Bengali countryside with panoramic window views.',
    features: ['Reserved AC Snigdha Seats', 'Station Porter & Transfer Assistance', 'Rural Landscape Views', 'Complimentary Railway Tea']
  },
  {
    id: 'transport-river-launch',
    name: 'BIWTA / Green Line VIP River Cruiser Cabin',
    category: 'Heritage River Cruiser',
    subtitle: 'En-Suite VIP Cabin Across Mighty Bengal Rivers',
    pricePerDayUsd: 40,
    pricePerDayBdt: 4800,
    badge: 'Iconic Delta Experience',
    description: 'Double-bed air-conditioned cabin aboard classic multi-deck river launches traversing the Buriganga, Meghna, and Sundarbans delta waterways.',
    features: ['Private En-Suite Master Cabin', 'Rooftop River Promenade Access', 'Sunset River Cruise Experience', 'On-Deck Bengali Dining']
  }
];
