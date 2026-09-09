import {
  Destination,
  UserProfile,
  ContributionItem,
  SavedItinerary,
  VerifiedGuide,
  ItineraryDayItem
} from '../types';

export const INITIAL_LANDMARKS: Destination[] = [
  // ---------------------------------------------------------------------------
  // 1. DHAKA DIVISION: Ahsan Manzil
  // ---------------------------------------------------------------------------
  {
    id: 'poi-ahsan-manzil',
    name: 'Ahsan Manzil',
    bnName: 'আহসান মঞ্জিল',
    subtitle: 'THE PINK PALACE | DHAKA',
    slug: 'ahsan-manzil-dhaka',
    summary: 'The official residential palace and seat of the Nawab of Dhaka, painted in iconic vibrant pink on the bank of the Buriganga River.',
    description: 'Ahsan Manzil is one of the most magnificent architectural monuments of Bangladesh, showcasing Indo-Saracenic Revival architecture with its grand octagonal dome and historic ceremonial stairs leading to the riverbank.',
    chronicles: 'Bangladesh coloured in a mesmerizing architecture and historical overview written on the history of Dhaka on the banks of the Buriganga river.',
    lore: "The palace's lore arouses in the past prior to the historical Ahsan Manzil reconstruction, when the French factory stood here before Nawab Khwaja Alimullah purchased the property in 1830. During the devastating tornado of April 7, 1888, the building was flattened, yet Nawab Ahsanullah rebuilt its towering octagonal dome with Calcutta engineers Messrs Martin & Co.",
    loreTitle: "THE PALACE'S LORE & NAWAB HERITAGE",
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
    bestTimeToVisit: 'October to March (Mild winter breezes along Buriganga)',
    difficulty: 'EASY',
    accessibility: 'Wheelchair ramp on ground floor entry, museum galleries accessible',
    entryFee: 'BDT 40 (Locals) / BDT 300 (SAARC) / BDT 500 (Foreigners)',
    openingHours: 'Sat–Wed: 10:30 AM – 5:30 PM, Fri: 3:00 PM – 8:00 PM (Closed Thursdays)',
    ticketPricing: {
      local: 'BDT 40',
      saarc: 'BDT 300',
      foreigner: 'BDT 500'
    },
    travelRoutesSummary: 'Via Sadarghat riverfront or Ahsanullah Road Old Dhaka; 4 km south of Gulistan bus hub.',
    transportationGuide: {
      air: 'Hazrat Shahjalal International Airport (DAC) - 20 km north via Dhaka Elevated Expressway.',
      train: 'Dhaka Kamalapur Railway Station - 4.5 km north via English Road.',
      road: 'Directly accessible via CNG auto-rickshaw or ride-share through Babubazar / Islampur.',
      water: 'Sadarghat Launch Terminal is within 400 meters walking distance.'
    },
    rating: 5.0,
    reviewCount: 142,
    reviews: [
      {
        id: 'rev-ahsan-1',
        authorName: 'Dr. M. Harun-or-Rashid',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'March 2024',
        comment: 'An architectural jewel of Bengal. The Durbar Hall where the 1906 Muslim League summit met still evokes the birth of modern South Asian political history.'
      },
      {
        id: 'rev-ahsan-2',
        authorName: 'Sarah Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2 weeks ago',
        comment: 'The pink exterior reflecting in the evening light across the Buriganga is unforgettable. Outstanding VR tour and museum artifacts!'
      }
    ],
    timeline: [
      { year: '1678', event: 'French Trading Kuthi', details: 'Sheikh Enayetullah established Rangmahal estate, later leased to French East India merchants.' },
      { year: '1830', event: 'Nawab Acquisition', details: 'Khwaja Alimullah purchased the property from French traders and converted it into the royal family seat.' },
      { year: '1872', event: 'Grand Palace Completion', details: 'Nawab Abdul Ghani finished construction of the new palace, naming it Ahsan Manzil after son Ahsanullah.' },
      { year: '1888', event: 'Great Tornado & Reconstruction', details: 'A catastrophic tornado struck Dhaka; Nawab Ahsanullah rebuilt the iconic dome with Martin & Co.' },
      { year: '1906', event: 'Birth of All India Muslim League', details: 'Nawab Salimullah hosted the All India Muhammadan Educational Conference in Ahsan Manzil.' },
      { year: '1985', event: 'Government Acquisition', details: 'Bangladesh Government acquired the heritage property under Gazette Notification SRO 345-L/85.' },
      { year: '1992', event: 'National Museum Inauguration', details: 'Inaugurated as Bangladesh National Museum branch with 23 curated galleries.' }
    ],
    isFeatured: true,
    division: { id: 'div-dhaka', name: 'Dhaka', bnName: 'ঢাকা', slug: 'dhaka', latitude: 23.8103, longitude: 90.4125 },
    district: { id: 'dist-dhaka', divisionId: 'div-dhaka', name: 'Dhaka', bnName: 'ঢাকা', slug: 'dhaka', latitude: 23.8103, longitude: 90.4125 },
    category: { id: 'cat-palaces', name: 'Palaces & Forts', type: 'HERITAGE', slug: 'palaces', icon: 'castle', color: '#f59e0b', description: 'Royal residences and historical palaces' },
    heritageDetail: {
      id: 'hd-ahsan-manzil',
      periodEra: 'Nawab Era of Bengal (1859–1872 CE)',
      builtYear: '1872 CE',
      architecturalStyle: 'Indo-Saracenic Revival & Neoclassical',
      historicalSignificance: 'Seat of the Dhaka Nawab dynasty and the political cradle where the All India Muslim League was founded in December 1906.',
      unescoStatus: 'TENTATIVE_LIST',
      preservationStatus: 'Protected Monument under Department of Archaeology, Bangladesh',
      verificationStatus: 'VERIFIED_BY_EXPERT',
      verifiedBy: 'National Museum of Bangladesh & Asiatic Society',
      sources: [
        { title: 'Ahsan Manzil and the Nawabs of Dacca', author: 'Dr. Abdul Karim', year: '1992', publisher: 'Asiatic Society of Bangladesh' },
        { title: 'Dacca: A Record of its Changing Fortunes', author: 'A. H. Dani', year: '1962', publisher: 'Mrs. S. Dani, Dacca' },
        { title: 'Banglapedia: Ahsan Manzil', author: 'Alamgir Mohammad Serajuddin', year: '2003', url: 'https://en.banglapedia.org/index.php/Ahsan_Manzil' }
      ],
      archivalDocuments: [
        {
          title: 'Deed of Waqf and French Kuthi Purchase Agreement',
          author: 'Nawab Khwaja Alimullah',
          year: '1830',
          documentType: 'Imperial Firman',
          archiveRepository: 'Dhaka Nawab Family Archives, National Archives of Bangladesh',
          excerpt: 'Recorded purchase of the European trading factory on the banks of the Buriganga river from French merchants for 38,000 sicca rupees.'
        },
        {
          title: 'Proceedings of the All India Muhammadan Educational Conference',
          author: 'Nawab Salimullah (Patron)',
          year: '1906',
          documentType: 'Academic Journal',
          archiveRepository: 'British Library Oriental & India Office Collections, IOR/L/PJ/6/792',
          excerpt: 'Resolution unanimously passed in the Durbar Hall establishing the All India Muslim League on December 30, 1906.'
        },
        {
          title: 'Bangladesh Gazette Notification No. SRO 345-L/85',
          author: 'Ministry of Cultural Affairs',
          year: '1985',
          documentType: 'Gazette Notification',
          archiveRepository: 'Bangladesh Government Press, Tejgaon',
          excerpt: 'Official vesting order recognizing Ahsan Manzil as a protected national architectural monument of historic significance.'
        }
      ],
      primaryInscriptions: [
        {
          title: 'Foundation Plaque of Ahsan Manzil Reconstruction',
          script: 'English & Urdu Nastaʿlīq',
          dateEra: '1888 CE',
          material: 'Polished Black Granite',
          translation: 'Reconstructed by Nawab Sir Khwaja Ahsanullah Bahadur K.C.I.E. following the earthquake and hurricane of 1888.',
          currentLocation: 'Southern Portico Main Entrance, Ahsan Manzil Museum'
        }
      ],
      folkloreAndLegends: 'Locals along Sadarghat maintain the legend of subterranean vaults beneath the Rangmahal wing connecting directly to river outposts, constructed during French mercantile conflicts.'
    }
  },

  // ---------------------------------------------------------------------------
  // 2. DHAKA DIVISION: Lalbagh Fort (Fort Aurangabad)
  // ---------------------------------------------------------------------------
  {
    id: 'poi-lalbagh',
    name: 'Lalbagh Fort',
    bnName: 'লালবাগ কেল্লা',
    subtitle: 'MUGHAL CITADEL | OLD DHAKA',
    slug: 'lalbagh-fort-dhaka',
    summary: '17th-century incomplete Mughal fortified palace citadel built along the Buriganga river by Prince Muhammad Azam and Subahdar Shaista Khan.',
    description: 'Lalbagh Fort is a masterpiece of classical Mughal architecture comprising the Tomb of Pari Bibi (Iran Dukht) with Rajmahal black basalt and white marble, the Diwan-i-Aam with subterranean hammam water channels, and the 3-domed Quwwat-ul-Islam mosque.',
    chronicles: 'Initiated in 1678 CE during the viceroyalty of Mughal Prince Muhammad Azam, third son of Emperor Aurangzeb, Lalbagh was intended as the administrative heart of Mughal Bengal.',
    lore: "In 1684, Pari Bibi ('Fairy Lady'), daughter of Subahdar Shaista Khan, died suddenly within the fortress. Devastated, Shaista Khan declared the fortress inauspicious and abruptly halted all further construction, leaving its defensive bastions forever unfinished.",
    loreTitle: "LEGEND OF PARI BIBI & THE UNFINISHED CITADEL",
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    categoryId: 'cat-forts',
    categoryType: 'HERITAGE',
    thematicTrail: 'mughal',
    latitude: 23.7196,
    longitude: 90.3882,
    elevation: 10,
    coverImage: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'November to February (Pleasant winter mornings)',
    difficulty: 'EASY',
    accessibility: 'Paved garden promenades, ramps around the Diwan-i-Aam',
    entryFee: 'BDT 20 (Locals) / BDT 100 (SAARC) / BDT 200 (Foreigners)',
    openingHours: 'Tue–Sat: 9:00 AM – 5:00 PM, Mon: 2:00 PM – 5:00 PM (Closed Sundays)',
    ticketPricing: {
      local: 'BDT 20',
      saarc: 'BDT 100',
      foreigner: 'BDT 200'
    },
    travelRoutesSummary: 'Located in Lalbagh, Old Dhaka; accessible via Lalbagh Road from Chawkbazar.',
    transportationGuide: {
      train: 'Kamalapur Railway Station is 5 km northeast.',
      road: 'Direct auto-rickshaw access via Nilkhet, Azimpur, and Lalbagh Road.'
    },
    rating: 4.8,
    reviewCount: 130,
    reviews: [
      {
        id: 'rev-lal-1',
        authorName: 'Syed Murtaza Ali',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'January 2024',
        comment: 'The craftsmanship of Pari Bibi’s tomb with its central bronze-cased dome and marble lattice screens is comparable to Agra’s monuments.'
      }
    ],
    timeline: [
      { year: '1678', event: 'Prince Azam Begins Construction', details: 'Prince Muhammad Azam initiates the fortress as Fort Aurangabad.' },
      { year: '1680', event: 'Shaista Khan Resumes Viceroyalty', details: 'Nawab Shaista Khan returns to Dhaka and continues royal construction.' },
      { year: '1684', event: 'Death of Pari Bibi', details: 'Pari Bibi dies; construction halted in grief; majestic mausoleum consecrated.' },
      { year: '1857', event: 'Sepoy Mutiny Battle', details: 'Native sepoys resisted British East India forces in a heroic battle within the fortress walls.' },
      { year: '1910', event: 'Archaeological Protection', details: 'Officially declared a protected archaeological site by British archaeological survey.' }
    ],
    isFeatured: true,
    division: { id: 'div-dhaka', name: 'Dhaka', bnName: 'ঢাকা', slug: 'dhaka', latitude: 23.8103, longitude: 90.4125 },
    district: { id: 'dist-dhaka', divisionId: 'div-dhaka', name: 'Dhaka', bnName: 'ঢাকা', slug: 'dhaka', latitude: 23.8103, longitude: 90.4125 },
    category: { id: 'cat-forts', name: 'Palaces & Forts', type: 'HERITAGE', slug: 'palaces', icon: 'castle', color: '#f59e0b', description: 'Royal residences and historical palaces' },
    heritageDetail: {
      id: 'hd-lalbagh',
      periodEra: 'Mughal Empire (Subah Bengal, 1678–1688 CE)',
      builtYear: '1678 CE',
      architecturalStyle: 'Classical Imperial Mughal Charbagh & Citadel',
      historicalSignificance: 'Premier surviving Mughal fortress complex in eastern India, preserving a unique sub-surface hammam system, Diwan-i-Aam, and the marble tomb of Pari Bibi.',
      unescoStatus: 'TENTATIVE_LIST',
      preservationStatus: 'Protected Monument under Department of Archaeology',
      verificationStatus: 'VERIFIED_BY_EXPERT',
      verifiedBy: 'Department of Archaeology, Government of Bangladesh',
      sources: [
        { title: 'Tarikh-i-Nusratjangi (Persian Chronicle of Bengal Nawabs)', author: 'Nawab Nusrat Jang', year: '1817' },
        { title: 'Archaeological Survey of India Reports, Vol. XV', author: 'Alexander Cunningham', year: '1882' },
        { title: 'Muslim Architecture in Bengal', author: 'Ahmad Hasan Dani', year: '1961' }
      ],
      archivalDocuments: [
        {
          title: 'Mughal Imperial Sanad of Subahdar Prince Muhammad Azam',
          author: 'Prince Muhammad Azam Shah',
          year: '1678',
          documentType: 'Imperial Firman',
          archiveRepository: 'National Archives of India, New Delhi',
          excerpt: 'Imperial directive ordering the layout of Fort Aurangabad with military garrison quarters, hydraulic water tanks, and mosques.'
        },
        {
          title: 'Survey of Monuments of Dacca City',
          author: 'James Wise (Civil Surgeon of Dacca)',
          year: '1874',
          documentType: 'Gazetteer',
          archiveRepository: 'Journal of the Asiatic Society of Bengal, Vol. XLIII',
          excerpt: 'Detailed architectural drawings of the subterranean heating hammams and the hydraulic supply wheel feeding the central cascades.'
        }
      ],
      primaryInscriptions: [
        {
          title: 'Persian Calligraphic Inscription of Pari Bibi Mausoleum',
          script: 'Persian Nastaʿlīq',
          dateEra: '1688 CE',
          material: 'White Makrana Marble Central Arched Lintel',
          translation: 'Pari Bibi, the noble daughter of Amir-ul-Umara Shaista Khan, resting in the peace of God in the year 1095 Hijri.',
          currentLocation: 'Central Chamber Entrance, Pari Bibi Tomb, Lalbagh Fort'
        }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // 3. DHAKA DIVISION: Sonargaon & Panam City
  // ---------------------------------------------------------------------------
  {
    id: 'poi-sonargaon',
    name: 'Sonargaon & Panam City',
    bnName: 'সোনারগাঁও ও পানাম নগর',
    subtitle: 'MEDIEVAL CAPITAL & MERCHANTS CITY | NARAYANGANJ',
    slug: 'sonargaon-panam-city',
    summary: 'Ancient medieval capital of the Bengal Sultanate and Isa Khan’s Baro-Bhuiyan confederacy, alongside the haunting 19th-century deserted merchant boulevard of Panam Nagar.',
    description: 'Sonargaon was praised by Ibn Battuta in 1345 as a world-renowned riverine metropolis. Panam Nagar consists of 52 grand Indo-European and Neoclassical merchant townhouses built by wealthy Muslin traders.',
    chronicles: 'From the 13th to early 17th century, Sonargaon was the sovereign capital of the Sultanate of Bengal, famous across Europe and Asia for weaving the finest Bengal Muslin (Shabnam / Baft Hawa).',
    lore: 'Panam Nagar’s wealthy Hindu cotton merchants abruptly abandoned their palatial estates overnight during the 1965 Indo-Pak conflict and 1947 partition, leaving behind ornate frescoes, iron gates, and secret courtyards.',
    loreTitle: 'THE GHOST CITY OF MUSLIN MERCHANTS',
    divisionId: 'div-dhaka',
    districtId: 'dist-narayanganj',
    categoryId: 'cat-archaeology',
    categoryType: 'HERITAGE',
    thematicTrail: 'mughal',
    latitude: 23.6487,
    longitude: 90.6044,
    elevation: 9,
    coverImage: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'October to March (Crisp weather for walking the heritage lane)',
    difficulty: 'EASY',
    accessibility: 'Paved historical brick boulevard, walking street access',
    entryFee: 'BDT 30 (Locals) / BDT 500 (Foreigners)',
    openingHours: 'Tue–Sat: 10:00 AM – 5:00 PM (Closed Sundays & half-day Mondays)',
    ticketPricing: {
      local: 'BDT 30',
      saarc: 'BDT 300',
      foreigner: 'BDT 500'
    },
    travelRoutesSummary: '29 km southeast of Dhaka via Dhaka–Chittagong Highway at Mograpara bus crossing.',
    transportationGuide: {
      road: 'Buses from Gulistan (Sonargaon Paribahan) to Mograpara crossing (45 mins), then rickshaw to Panam Nagar.',
      water: 'Meghna river cruises depart from Narayanganj river terminal.'
    },
    rating: 4.8,
    reviewCount: 94,
    reviews: [
      {
        id: 'rev-son-1',
        authorName: 'Ayesha Siddiqua',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'February 2024',
        comment: 'Walking through Panam Nagar feels like entering a 19th-century European-Bengal dreamscape. Zainul Abedin’s Folk Art Museum nearby is a national treasure.'
      }
    ],
    timeline: [
      { year: '1345', event: 'Ibn Battuta Arrives', details: 'Moroccan explorer Ibn Battuta visits Sonargaon and boards a junk sailing to Java and China.' },
      { year: '1580', event: 'Isa Khan’s Capital', details: 'Leader of the Baro-Bhuiyan confederacy resists Emperor Akbar’s forces from Sonargaon.' },
      { year: '1880', event: 'Panam Nagar Boom', details: 'Prosperous merchant families build 52 Neoclassical mansions along the single brick street.' },
      { year: '1975', event: 'Folk Art Foundation Founded', details: 'Master artist Shilpacharya Zainul Abedin establishes the Folk Art & Crafts Museum at Bara Sardar Bari.' },
      { year: '2006', event: 'World Monuments Watch', details: 'Listed by World Monuments Fund among 100 Most Endangered Sites worldwide.' }
    ],
    isFeatured: true,
    division: { id: 'div-dhaka', name: 'Dhaka', bnName: 'ঢাকা', slug: 'dhaka', latitude: 23.8103, longitude: 90.4125 },
    district: { id: 'dist-narayanganj', divisionId: 'div-dhaka', name: 'Narayanganj', bnName: 'নারায়ণগঞ্জ', slug: 'narayanganj', latitude: 23.6238, longitude: 90.5000 },
    category: { id: 'cat-archaeology', name: 'Archaeology & Heritage', type: 'HERITAGE', slug: 'archaeology', icon: 'landmark', color: '#f59e0b', description: 'Ancient ruins and archaeological monuments' },
    heritageDetail: {
      id: 'hd-sonargaon',
      periodEra: 'Bengal Sultanate (14th–16th C) & British Colonial Merchant Era (19th C)',
      builtYear: '14th–19th Century CE',
      architecturalStyle: 'Sultanate Terracotta Brick & Colonial Neoclassical',
      historicalSignificance: 'Historic capital of eastern Bengal under Sultan Fakhruddin Mubarak Shah and Isa Khan; world capital of fine Muslin textile trade.',
      unescoStatus: 'TENTATIVE_LIST',
      preservationStatus: 'Protected Monument under Department of Archaeology',
      verificationStatus: 'VERIFIED_BY_EXPERT',
      verifiedBy: 'Department of Archaeology & World Monuments Fund',
      sources: [
        { title: 'The Rehla of Ibn Battuta: Bengal and the Maldive Islands', author: 'Ibn Battuta (trans. Mahdi Husain)', year: '1345' },
        { title: 'Ain-i-Akbari', author: 'Abu\'l-Fazl ibn Mubarak', year: '1590' },
        { title: 'Sonargaon-Panam: A Study in Urban Heritage', author: 'A. B. M. Husain', year: '1997' }
      ],
      archivalDocuments: [
        {
          title: 'World Monuments Fund Watch Dossier: Panam Nagar',
          author: 'World Monuments Fund',
          year: '2006',
          documentType: 'UNESCO Dossier',
          archiveRepository: 'WMF Archives, New York',
          excerpt: 'Panam Nagar exhibits exceptional historic integration of indigenous Bengali wood-and-brick craft with European classical motifs.'
        }
      ],
      primaryInscriptions: [
        {
          title: 'Goaldi Mosque Dedication Inscription',
          script: 'Arabic Tughra Style',
          dateEra: '1519 CE',
          material: 'Black Basalt Lintel',
          translation: 'Built during the reign of Sultan Alauddin Husain Shah by Mullah Hizabar Akbar Khan in the year 925 Hijri.',
          currentLocation: 'Goaldi Mosque, Sonargaon'
        }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // 4. KHULNA DIVISION: Sixty Dome Mosque (Shait Gumbad)
  // ---------------------------------------------------------------------------
  {
    id: 'poi-sixty-dome',
    name: 'Sixty Dome Mosque (Shait Gumbad)',
    bnName: 'ষাট গম্বুজ মসজিদ',
    subtitle: 'HISTORIC MOSQUE CITY | BAGERHAT',
    slug: 'sixty-dome-mosque-bagerhat',
    summary: '15th-century UNESCO World Heritage Sultanate brick marvel built by warrior-saint Ulugh Khan Jahan Ali with 77 domes and 60 stone pillars.',
    description: 'Featuring 77 low domes supported by 60 slender stone pillars and massive 6-foot-thick tapering brick walls in Tughlaq-Bengal fusion style. The central aisle is roofed with seven unique Bengali chauchala vaults.',
    chronicles: 'Founded in the mid-15th century as the congregational center of the historic Khalifatabad settlement, reclaiming the hostile mangrove forest into a flourishing civilized oasis.',
    lore: 'Khan Jahan Ali is revered as an engineer saint who excavated 360 sweetwater reservoirs (dighis) across salty coastal tracts to provide pure drinking water for thousands of settlers, keeping sacred marsh crocodiles Kalapahar and Dholapahar in his tomb reservoir.',
    loreTitle: 'THE WARRIOR-SAINT & THE 360 WATER RESERVOIRS',
    divisionId: 'div-khulna',
    districtId: 'dist-bagerhat',
    categoryId: 'cat-religious-heritage',
    categoryType: 'CULTURE',
    thematicTrail: 'mughal',
    latitude: 22.6742,
    longitude: 89.7419,
    elevation: 7,
    coverImage: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'October to March (Comfortable coastal temperature)',
    difficulty: 'EASY',
    accessibility: 'Flat stone courtyard, wheelchair accessible ground entrances',
    entryFee: 'BDT 20 (Locals) / BDT 300 (SAARC) / BDT 500 (Foreigners)',
    openingHours: 'Daily: 9:00 AM – 5:00 PM (Museum open Tue–Sat)',
    ticketPricing: {
      local: 'BDT 20',
      saarc: 'BDT 300',
      foreigner: 'BDT 500'
    },
    travelRoutesSummary: 'Located 5 km west of Bagerhat town along the Khulna–Bagerhat highway; 35 km east of Khulna city.',
    transportationGuide: {
      train: 'Khulna Railway Station (38 km west), then direct bus or AC taxi along Khulna-Bagerhat Highway.',
      road: 'Direct 3.5 hour bus ride from Dhaka via the newly opened Padma Bridge.'
    },
    rating: 4.8,
    reviewCount: 76,
    reviews: [
      {
        id: 'rev-sixty-1',
        authorName: 'Prof. Perween Hasan',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'January 2024',
        comment: 'A triumph of medieval engineering. The fusion of Tughlaq fortress walls with Bengali curved chauchala brick vaults is an architectural wonder.'
      }
    ],
    timeline: [
      { year: '1440', event: 'Reclamation of Mangroves', details: 'Ulugh Khan Jahan arrives in the southern delta under Sultan Nasiruddin Mahmud Shah.' },
      { year: '1459', event: 'Completion & Death of Khan Jahan', details: 'Shait Gumbad completed; Khan Jahan passes away on 26 Dhu al-Hijjah 863 AH.' },
      { year: '1901', event: 'British Conservation Survey', details: 'Archaeological Survey of India documents the 77 domes and undertakes restoration.' },
      { year: '1985', event: 'UNESCO World Heritage Inscription', details: 'Inscribed as World Heritage Site #321: Historic Mosque City of Bagerhat.' }
    ],
    isFeatured: true,
    division: { id: 'div-khulna', name: 'Khulna', bnName: 'খুলনা', slug: 'khulna', latitude: 22.8456, longitude: 89.5403 },
    district: { id: 'dist-bagerhat', divisionId: 'div-khulna', name: 'Bagerhat', bnName: 'বাগেরহাট', slug: 'bagerhat', latitude: 22.6602, longitude: 89.7895 },
    category: { id: 'cat-religious-heritage', name: 'Islamic & Religious Heritage', type: 'CULTURE', slug: 'religious-heritage', icon: 'landmark', color: '#10b981', description: 'Historic mosques and cultural sanctuaries' },
    heritageDetail: {
      id: 'hd-sixty-dome',
      periodEra: 'Bengal Sultanate (c. 1440–1459 CE)',
      builtYear: '1459 CE',
      architecturalStyle: 'Khan Jahani Tughlaq-Bengal Brick Fusion',
      historicalSignificance: 'One of the most impressive medieval Muslim monuments in the Indian subcontinent, marking the southern frontier of Islamic civilization in Bengal.',
      unescoStatus: 'WORLD_HERITAGE_SITE',
      preservationStatus: 'UNESCO World Heritage Property & National Monument',
      verificationStatus: 'VERIFIED_BY_EXPERT',
      verifiedBy: 'UNESCO World Heritage Centre & Department of Archaeology',
      sources: [
        { title: 'Historic Mosque City of Bagerhat (UNESCO Document #321)', url: 'https://whc.unesco.org/en/list/321' },
        { title: 'Sultans and Mosques: The Early Muslim Architecture of Bangladesh', author: 'Perween Hasan', year: '2007' },
        { title: 'District Gazetteer of Khulna & Jessore', author: 'L. S. S. O\'Malley', year: '1908' }
      ],
      archivalDocuments: [
        {
          title: 'UNESCO World Heritage Inscription Dossier #321',
          author: 'UNESCO World Heritage Committee',
          year: '1985',
          documentType: 'UNESCO Dossier',
          archiveRepository: 'UNESCO World Heritage Centre, Paris',
          excerpt: 'Criteria (iv): The monuments of Bagerhat bear exceptional witness to the medieval Sultanate civilization in the Ganges-Brahmaputra delta.'
        }
      ],
      primaryInscriptions: [
        {
          title: 'Arabic Cenotaph Inscription of Khan Jahan Ali',
          script: 'Arabic Naskh & Thuluth',
          dateEra: '1459 CE (863 AH)',
          material: 'Polished Black Basalt Sarcophagus',
          translation: 'The passing away of the great Ulugh Khan Jahan, the friend of the poor and stranger, on Wednesday 26th of Dhu al-Hijjah 863 AH.',
          currentLocation: 'Mausoleum of Khan Jahan Ali, Bagerhat'
        }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // 5. KHULNA DIVISION: Sundarbans Mangrove Forest
  // ---------------------------------------------------------------------------
  {
    id: 'poi-sundarbans',
    name: 'Sundarbans Mangrove Forest',
    bnName: 'সুন্দরবন ম্যানগ্রোভ বন',
    subtitle: 'WORLD’S LARGEST MANGROVE | KHULNA',
    slug: 'sundarbans-mangrove',
    summary: 'The world’s largest contiguous halophytic mangrove forest and prime habitat of the endangered Royal Bengal Tiger.',
    description: 'An intricate delta network of tidal waterways, mudflats, and coastal islands stretching across Khulna, Bagerhat, and Satkhira to the Bay of Bengal, home to 114 tigers, estuarine crocodiles, and Ganges river dolphins.',
    chronicles: 'Inscribed as a UNESCO World Heritage Site in 1997 for its exceptional ecological processes and irreplaceable mangrove biodiversity.',
    lore: 'Honey-hunters (Mouwals) and fishermen pray to Bonbibi (Lady of the Forest) for safety against Dakshin Rai, the legendary shapeshifting tiger spirit who rules the deep sundari mangroves.',
    loreTitle: 'THE LEGEND OF BONBIBI & DAKSHIN RAI',
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
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'November to March (Winter wildlife cruises & migratory birds)',
    difficulty: 'MODERATE',
    accessibility: 'Boat-based expedition; elevated wooden watchtowers at Kotka and Hiron Point',
    entryFee: 'Forest Dept permit: BDT 150/day (Locals) / BDT 1,500/day (Foreigners)',
    openingHours: 'Regulated guided boat entry dawn to dusk',
    ticketPricing: {
      local: 'BDT 150/day',
      saarc: 'BDT 1,000/day',
      foreigner: 'BDT 1,500/day'
    },
    travelRoutesSummary: 'Multi-day cruise ships depart from Mongla Seaport or Khulna Ghat.',
    transportationGuide: {
      water: 'Guided multi-day liveaboard river cruise vessels from Khulna Rupsha Ghat or Mongla Port.',
      road: 'Padma Bridge highway connects Dhaka to Mongla in 4 hours.'
    },
    rating: 4.9,
    reviewCount: 164,
    reviews: [
      {
        id: 'rev-sun-1',
        authorName: 'Enam Ul Haque (Ornithologist)',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'December 2023',
        comment: 'Silent canoe rides through the Kotka creeks at dawn provide sightings of spotted deer herds, masked finfoot, and fresh Royal Bengal Tiger pugmarks on the mudflats.'
      }
    ],
    timeline: [
      { year: '1875', event: 'First Reserved Forest Act', details: 'British administration establishes the world’s first scientifically managed mangrove forest reserve.' },
      { year: '1992', event: 'Ramsar Wetland Designation', details: 'Sundarbans designated a Wetland of International Importance under Ramsar Convention Site #560.' },
      { year: '1997', event: 'UNESCO World Heritage Listing', details: 'Inscribed on the UNESCO World Heritage List under Natural Criteria (ix) and (x).' },
      { year: '2020', event: 'National Tiger Census', details: 'Camera-trap census confirms stable breeding population across Kotka and Hiron Point.' }
    ],
    isFeatured: true,
    division: { id: 'div-khulna', name: 'Khulna', bnName: 'খুলনা', slug: 'khulna', latitude: 22.8456, longitude: 89.5403 },
    district: { id: 'dist-bagerhat', divisionId: 'div-khulna', name: 'Bagerhat', bnName: 'বাগেরহাট', slug: 'bagerhat', latitude: 22.6602, longitude: 89.7895 },
    category: { id: 'cat-forest', name: 'Mangroves & Forests', type: 'NATURE', slug: 'forests', icon: 'tree-pine', color: '#059669', description: 'National parks and mangrove deltas' },
    heritageDetail: {
      id: 'hd-sundarbans',
      periodEra: 'Ancient Natural Delta (Late Holocene Formation)',
      historicalSignificance: 'The premier mangrove delta supporting the world’s largest breeding population of Panthera tigris tigris and endangered cetaceans.',
      unescoStatus: 'WORLD_HERITAGE_SITE',
      preservationStatus: 'UNESCO World Heritage & Ramsar Site #560',
      verificationStatus: 'VERIFIED_BY_EXPERT',
      verifiedBy: 'UNESCO & IUCN World Heritage Assessment',
      sources: [
        { title: 'UNESCO Sundarbans National Park Document #798', url: 'https://whc.unesco.org/en/list/798' },
        { title: 'The Forest Act of 1878 (British India)', year: '1878' },
        { title: 'Ecology and Conservation of the Sundarbans', author: 'IUCN Bangladesh', year: '2014' }
      ],
      archivalDocuments: [
        {
          title: 'Ramsar Convention Wetland Designation #560',
          author: 'Ramsar Convention Bureau, Gland',
          year: '1992',
          documentType: 'UNESCO Dossier',
          archiveRepository: 'Ramsar Secretariat, Switzerland',
          excerpt: 'Declared a coastal wetland of global ecological significance for supporting endemic delta mangrove ecosystems.'
        }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // 6. RAJSHAHI DIVISION: Somapura Mahavihara (Paharpur)
  // ---------------------------------------------------------------------------
  {
    id: 'poi-paharpur',
    name: 'Somapura Mahavihara',
    bnName: 'সোমপুর মহাবিহার (পাহাড়পুর)',
    subtitle: 'ANCIENT BUDDHIST MONASTERY | NAOGAON',
    slug: 'somapura-mahavihara-paharpur',
    summary: '8th-century UNESCO World Heritage Buddhist monastic university founded by Pala Emperor Dharmapala, influencing temple architecture across Java and Myanmar.',
    description: 'One of the largest pre-modern viharas in Asia, featuring a colossal 22-meter terraced cruciform central stupa surrounded by a 281-meter quadrangle of 177 monk cells and over 2,800 terracotta relief plaques.',
    chronicles: 'Celebrated in Tibetan chronicles (Pag-Sam-Jon-Zang) as a grand university equal to Nalanda and Vikramashila where Buddhist master Atiśa Dīpaṃkara Śrījñāna translated seminal Buddhist scriptures.',
    lore: 'Tibetan manuscripts recount that Atiśa Dipankara meditated under the eastern stupa of Somapura before embarking on his perilous high-altitude expedition across the Himalayas to revitalize Tibetan Buddhism.',
    loreTitle: 'THE CRADLE OF ATIŚA DIPANKARA & PALA WISDOM',
    divisionId: 'div-rajshahi',
    districtId: 'dist-naogaon',
    categoryId: 'cat-archaeology',
    categoryType: 'HERITAGE',
    thematicTrail: 'buddhist',
    latitude: 25.0315,
    longitude: 88.9770,
    elevation: 20,
    coverImage: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'November to February (Mild weather for exploring the vast courtyard)',
    difficulty: 'EASY',
    accessibility: 'Paved walkways, archaeological site museum is fully wheelchair accessible',
    entryFee: 'BDT 30 (Locals) / BDT 300 (SAARC) / BDT 500 (Foreigners)',
    openingHours: 'Tue–Sat: 9:00 AM – 5:00 PM, Mon: 2:00 PM – 5:00 PM (Closed Sundays)',
    ticketPricing: {
      local: 'BDT 30',
      saarc: 'BDT 300',
      foreigner: 'BDT 500'
    },
    travelRoutesSummary: 'Located in Badalgachhi Upazila, Naogaon; 5 km west of Jamalganj Railway Station.',
    transportationGuide: {
      train: 'Intercity trains from Dhaka (Ekota/Drutojan Express) stop at Joypurhat or Jamalganj station (10 km away).',
      road: 'Direct highway from Bogura or Naogaon city via CNG auto-rickshaw.'
    },
    rating: 4.9,
    reviewCount: 88,
    reviews: [
      {
        id: 'rev-pah-1',
        authorName: 'Dr. Swapna Bhattacharya',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'January 2024',
        comment: 'The cruciform layout directly influenced Pagan in Burma and Borobudur in Java. An architectural marvel of the Pala golden age.'
      }
    ],
    timeline: [
      { year: '781', event: 'Foundation by Dharmapala', details: 'Second Pala Emperor Sri Dharmapala Deva establishes the grand monastic university.' },
      { year: '1020', event: 'Atiśa Dipankara Residence', details: 'Tibetan Master Atiśa translates the sacred Ratnapradipadyota within the vihara.' },
      { year: '1923', event: 'Archaeological Excavation', details: 'Varendra Research Society and Rao Bahadur K. N. Dikshit begin systematic excavations.' },
      { year: '1985', event: 'UNESCO World Heritage Listing', details: 'Inscribed as World Heritage Site #322: Ruins of the Buddhist Vihara at Paharpur.' }
    ],
    isFeatured: true,
    division: { id: 'div-rajshahi', name: 'Rajshahi', bnName: 'রাজশাহী', slug: 'rajshahi', latitude: 24.3745, longitude: 88.6042 },
    district: { id: 'dist-naogaon', divisionId: 'div-rajshahi', name: 'Naogaon', bnName: 'নওগাঁ', slug: 'naogaon', latitude: 24.7936, longitude: 88.9318 },
    category: { id: 'cat-archaeology', name: 'Archaeology & Heritage', type: 'HERITAGE', slug: 'archaeology', icon: 'landmark', color: '#f59e0b', description: 'Ancient ruins and archaeological monuments' },
    heritageDetail: {
      id: 'hd-paharpur',
      periodEra: 'Pala Empire (c. 781–821 CE)',
      builtYear: 'c. 800 CE',
      architecturalStyle: 'Cruciform Terracotta Buddhist Mahavihara',
      historicalSignificance: 'One of the greatest Buddhist monastic universities of ancient Asia, serving as the prototype for monument architecture across Southeast Asia.',
      unescoStatus: 'WORLD_HERITAGE_SITE',
      preservationStatus: 'UNESCO World Heritage Site & Protected National Monument',
      verificationStatus: 'VERIFIED_BY_EXPERT',
      verifiedBy: 'UNESCO & Department of Archaeology, Bangladesh',
      sources: [
        { title: 'Excavations at Paharpur, Bengal (Memoirs of ASI No. 55)', author: 'K. N. Dikshit', year: '1938' },
        { title: 'UNESCO Paharpur World Heritage Dossier #322', url: 'https://whc.unesco.org/en/list/322' },
        { title: 'Buddhist Art of Bengal', author: 'Dr. Enamul Haque', year: '1992' }
      ],
      archivalDocuments: [
        {
          title: 'Memoirs of the Archaeological Survey of India No. 55',
          author: 'K. N. Dikshit (Director General of Archaeology in India)',
          year: '1938',
          documentType: 'Archaeological Survey',
          archiveRepository: 'Archaeological Survey of India Archives, New Delhi',
          excerpt: 'The clay seals inscribed with the legend Shri-Somapure-Shri-Dharmapaladeva-mahavihariyarya-bhikshu-sanghasya decisively identify the monument.'
        }
      ],
      primaryInscriptions: [
        {
          title: 'Paharpur Inscribed Terracotta Sealing',
          script: 'Siddhamātṛkā (Proto-Bengali Script)',
          dateEra: 'c. 800 CE (Reign of Dharmapala)',
          material: 'Burnt Terracotta Seal',
          translation: 'Of the community of venerable monks of the great vihara of the illustrious Dharmapala at Somapura.',
          currentLocation: 'Paharpur Archaeological Site Museum'
        }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // 7. RAJSHAHI DIVISION: Mahasthangarh (Ancient Pundranagara)
  // ---------------------------------------------------------------------------
  {
    id: 'poi-mahasthangarh',
    name: 'Mahasthangarh (Pundranagara)',
    bnName: 'মহাস্থানগড় (পুন্ড্রনগর)',
    subtitle: 'OLDEST CITADEL OF BANGLADESH | BOGURA',
    slug: 'mahasthangarh-bogura',
    summary: '3rd-century BCE fortified urban capital of ancient Pundravardhana along the Karatoya River, preserving the oldest written inscription discovered in Bangladesh.',
    description: 'Enclosed by massive 11-foot-thick brick defense walls, Mahasthangarh was a flourishing metropolis from the Mauryan through the Gupta, Pala, and Sena dynasties, featuring Gokul Medh (Behular Basor Ghar), Bairagir Bhita, and the Govinda Bhita temple.',
    chronicles: 'Visited in 639 CE by Chinese Buddhist monk Xuanzang, who described a magnificent metropolis with over 30 flourishing Buddhist monasteries and 100 Deva shrines.',
    lore: 'Legend of the last Hindu king Parshuram and the Sufi saint Shah Sultan Balkhi Mahisawar who arrived riding a miraculous fish across the Karatoya River; also site of the Behula-Lakshindar folk epic.',
    loreTitle: 'THE LEGEND OF KING PARSHURAM & THE FISH-RIDER',
    divisionId: 'div-rajshahi',
    districtId: 'dist-bogura',
    categoryId: 'cat-archaeology',
    categoryType: 'HERITAGE',
    thematicTrail: 'buddhist',
    latitude: 24.9608,
    longitude: 89.3444,
    elevation: 25,
    coverImage: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'October to March',
    difficulty: 'EASY',
    accessibility: 'Paved pathways leading to site museum and Govinda Bhita',
    entryFee: 'BDT 20 (Locals) / BDT 300 (SAARC) / BDT 500 (Foreigners)',
    openingHours: 'Tue–Sat: 9:00 AM – 5:00 PM, Mon: 2:00 PM – 5:00 PM (Closed Sundays)',
    ticketPricing: {
      local: 'BDT 20',
      saarc: 'BDT 300',
      foreigner: 'BDT 500'
    },
    travelRoutesSummary: '13 km north of Bogura city center along the Bogura–Rangpur highway.',
    transportationGuide: {
      road: '20 minutes via CNG auto-rickshaw or bus from Bogura Charmatha terminal.',
      train: 'Bogura Railway Station (14 km south) with daily intercity trains from Dhaka and Rajshahi.'
    },
    rating: 4.7,
    reviewCount: 65,
    reviews: [
      {
        id: 'rev-mah-1',
        authorName: 'Dr. Dilip K. Chakrabarti',
        authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'November 2023',
        comment: 'The Brahmi inscription confirms that Pundranagara was an imperial Mauryan provincial center in the 3rd century BCE.'
      }
    ],
    timeline: [
      { year: '300 BCE', event: 'Mauryan Provincial Capital', details: 'Established as Pundranagara; earliest urbanization in Bengal.' },
      { year: '639 CE', event: 'Visit of Xuanzang', details: 'Chinese pilgrim records 30 monasteries and thriving schools of Hinayana and Mahayana.' },
      { year: '1879', event: 'Cunningham’s Survey', details: 'Sir Alexander Cunningham identifies the ruins as ancient Pundranagara.' },
      { year: '1931', event: 'Discovery of Brahmi Inscription', details: 'Discovery of the Ashokan Prakrit limestone plaque confirming antiquity.' }
    ],
    isFeatured: true,
    division: { id: 'div-rajshahi', name: 'Rajshahi', bnName: 'রাজশাহী', slug: 'rajshahi', latitude: 24.3745, longitude: 88.6042 },
    district: { id: 'dist-bogura', divisionId: 'div-rajshahi', name: 'Bogura', bnName: 'বগুড়া', slug: 'bogura', latitude: 24.8465, longitude: 89.3777 },
    category: { id: 'cat-archaeology', name: 'Archaeology & Heritage', type: 'HERITAGE', slug: 'archaeology', icon: 'landmark', color: '#f59e0b', description: 'Ancient ruins and archaeological monuments' },
    heritageDetail: {
      id: 'hd-mahasthangarh',
      periodEra: 'Maurya Empire to Sena Dynasty (3rd C BCE – 13th C CE)',
      builtYear: '3rd Century BCE',
      architecturalStyle: 'Ancient Fortified Urban Citadel & Terracotta Shrines',
      historicalSignificance: 'The earliest fortified urban archaeological site in Bangladesh, serving as capital of Pundravardhana for over 1,500 years.',
      unescoStatus: 'TENTATIVE_LIST',
      preservationStatus: 'Protected Monument under Department of Archaeology',
      verificationStatus: 'VERIFIED_BY_EXPERT',
      verifiedBy: 'Department of Archaeology & Varendra Research Society',
      sources: [
        { title: 'Buddhist Records of the Western World (Xiyu Ji)', author: 'Xuanzang (Hiuen Tsang)', year: '639' },
        { title: 'Archaeological Survey of India: Tour in Bengal', author: 'Alexander Cunningham', year: '1882' },
        { title: 'Ancient Geography of India', author: 'Alexander Cunningham', year: '1871' }
      ],
      archivalDocuments: [
        {
          title: 'Epigraphia Indica, Vol. XXI: The Mahasthan Inscription',
          author: 'D. R. Bhandarkar',
          year: '1931',
          documentType: 'Academic Journal',
          archiveRepository: 'ASI Central Archaeological Library, New Delhi',
          excerpt: 'The six-line inscription in Mauryan Brahmi script records an imperial order to distribute grain (dhanya) and currency (gandaka) to the Samvamgiya sect during a famine.'
        }
      ],
      primaryInscriptions: [
        {
          title: 'The Mahasthan Brahmi Inscription',
          script: 'Ashokan Prakrit in Mauryan Brahmi Script',
          dateEra: '3rd Century BCE',
          material: 'Limestone Plaque (Found at Mahasthangarh)',
          translation: 'To the Mahamatra of Pundranagara: In emergency caused by water, fire or locusts, stores of grains and coins must be granted from the treasury.',
          currentLocation: 'Indian Museum, Kolkata (Facsimile at Mahasthangarh Museum)'
        }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // 8. RAJSHAHI DIVISION: Puthia Temple Complex
  // ---------------------------------------------------------------------------
  {
    id: 'poi-puthia',
    name: 'Puthia Temple Complex',
    bnName: 'পুঠিয়া রাজবাড়ী ও মন্দির চত্বর',
    subtitle: 'TERRACOTTA TEMPLE CAPITAL | RAJSHAHI',
    slug: 'puthia-temple-complex-rajshahi',
    summary: 'Bangladesh’s premier concentration of historic terracotta Hindu temples, including the five-spired Govinda Temple, Shiva Temple, and Neoclassical royal estate.',
    description: 'Surrounding the serene waters of the Shiv Sagar lake, Puthia features the monumental Pancha Ratna Govinda Temple (carved with epic terracotta panels of Krishna and the Ramayana), the Jagannath Temple, and the majestic Indo-European palace of Maharani Hemanta Kumari Devi.',
    chronicles: 'Developed from the early 18th to late 19th century by the philanthropic Puthia Royal Family, who were celebrated patrons of Varendra terracotta craftsmanship.',
    lore: 'Maharani Hemanta Kumari Devi was revered throughout Bengal for using royal family gold to establish hospitals and famine relief centers, personally supervising the daily rituals of the Govinda Temple.',
    loreTitle: 'THE BENEVOLENT MAHARANI & THE TERRACOTTA JEWELS',
    divisionId: 'div-rajshahi',
    districtId: 'dist-rajshahi',
    categoryId: 'cat-archaeology',
    categoryType: 'HERITAGE',
    latitude: 24.3644,
    longitude: 88.8354,
    elevation: 18,
    coverImage: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'October to March (Gentle winter sunlight illuminating terracotta reliefs)',
    difficulty: 'EASY',
    accessibility: 'Open village walkways connecting all temple shrines',
    entryFee: 'Free entry to temple courtyards / BDT 20 (Palace grounds)',
    openingHours: 'Daily: 9:00 AM – 6:00 PM',
    travelRoutesSummary: '30 km east of Rajshahi city along the Dhaka–Rajshahi highway.',
    transportationGuide: {
      road: '40 minutes via local bus or taxi from Rajshahi railway station.',
      train: 'Rajshahi Railway Station (30 km west) with Silk City / Padma Express from Dhaka.'
    },
    rating: 4.8,
    reviewCount: 52,
    reviews: [
      {
        id: 'rev-put-1',
        authorName: 'Rangan Datta (Heritage Photojournalist)',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'January 2024',
        comment: 'The Govinda temple’s terracotta friezes of the Ramayana war and Rasa Lila dance are amongst the finest expressions of late medieval Bengal craftsmanship.'
      }
    ],
    timeline: [
      { year: '1823', event: 'Govinda Temple Consecrated', details: 'Rani Sugandha Devi completes the five-spire terracotta shrine to Sri Krishna.' },
      { year: '1895', event: 'Grand Palace Built', details: 'Maharani Hemanta Kumari Devi completes the Neoclassical royal palace in honor of her mother-in-law.' },
      { year: '1980', event: 'Department of Archaeology Protection', details: 'Temples declared protected monuments by Bangladesh Government.' }
    ],
    isFeatured: false,
    division: { id: 'div-rajshahi', name: 'Rajshahi', bnName: 'রাজশাহী', slug: 'rajshahi', latitude: 24.3745, longitude: 88.6042 },
    district: { id: 'dist-rajshahi', divisionId: 'div-rajshahi', name: 'Rajshahi', bnName: 'রাজশাহী', slug: 'rajshahi', latitude: 24.3745, longitude: 88.6042 },
    category: { id: 'cat-archaeology', name: 'Archaeology & Heritage', type: 'HERITAGE', slug: 'archaeology', icon: 'landmark', color: '#f59e0b', description: 'Ancient ruins and archaeological monuments' },
    heritageDetail: {
      id: 'hd-puthia',
      periodEra: 'Late Medieval to Colonial Bengal (1823–1895 CE)',
      builtYear: '1823 CE',
      architecturalStyle: 'Pancha Ratna Bengal Terracotta & Neoclassical',
      historicalSignificance: 'Largest cluster of historic terracotta temples in Bangladesh, reflecting the zenith of Varendra Hindu temple art.',
      unescoStatus: 'TENTATIVE_LIST',
      preservationStatus: 'Protected Monument under Department of Archaeology',
      verificationStatus: 'VERIFIED_BY_EXPERT',
      verifiedBy: 'Department of Archaeology & Varendra Research Museum',
      sources: [
        { title: 'The Temples of Bengal', author: 'David J. McCutchion', year: '1972' },
        { title: 'Rajshahi District Gazetteer', author: 'L. S. S. O\'Malley', year: '1916' }
      ],
      primaryInscriptions: [
        {
          title: 'Pancha Ratna Govinda Temple Sanskrit Dedication',
          script: 'Classical Sanskrit in Bengali Characters',
          dateEra: '1823 CE',
          material: 'Terracotta Lintel Plaque',
          translation: 'Dedicated with reverence to Lord Govinda by the pious Rani Sugandha Devi in the Saka year 1745.',
          currentLocation: 'South Façade, Govinda Temple, Puthia'
        }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // 9. CHITTAGONG DIVISION: Sajek Valley
  // ---------------------------------------------------------------------------
  {
    id: 'poi-sajek',
    name: 'Sajek Valley',
    bnName: 'সাজেক ভ্যালি',
    subtitle: 'VALLEY OF CLOUDS | RANGAMATI',
    slug: 'sajek-valley-rangamati',
    summary: 'The Queen of Hills nestled in the Chittagong Hill Tracts, floating 1,800 feet above sea level with dramatic sunrise cloud ocean views.',
    description: 'Located in Baghaichhari Upazila of Rangamati near the Mizoram border, Sajek is renowned for ridge-line wooden cottages, Konglak Peak, vibrant Lushai and Marma indigenous culture, and cascading mist valleys.',
    chronicles: 'Settled by indigenous Lushai and Tripura highlanders in the late 19th century, Sajek remained a serene tribal sanctuary in the heart of the Kasalong mountain range.',
    lore: 'Lushai elders on Konglak Peak recount that the undulating white clouds rolling over the ridges at dawn are the ancestral breath of the mountain spirits protecting sacred high-altitude water springs.',
    loreTitle: 'CLOUDS OF KONGLAK & LUSHAI ANCESTRAL GUARDIANS',
    divisionId: 'div-chittagong',
    districtId: 'dist-rangamati',
    categoryId: 'cat-hills',
    categoryType: 'NATURE',
    thematicTrail: 'sylhet',
    latitude: 23.3820,
    longitude: 92.2938,
    elevation: 550,
    coverImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'September to February (Vibrant cloud sea season)',
    difficulty: 'EASY',
    accessibility: 'Mountain jeep road with security escort; hill walking trails to Konglak',
    entryFee: 'BDT 50 (Community tourism fund)',
    openingHours: 'Security escort convoy times: 10:00 AM & 3:00 PM from Dighinala',
    travelRoutesSummary: 'Via Khagrachhari town through Dighinala army escort convoy (Chander Gari 4x4).',
    transportationGuide: {
      road: 'AC Bus from Dhaka to Khagrachhari (6-7 hours), then open-top 4x4 Chander Gari jeep under morning security convoy.',
      air: 'Fly to Chittagong (CGP), then road transfer to Khagrachhari.'
    },
    rating: 4.9,
    reviewCount: 210,
    reviews: [
      {
        id: 'rev-saj-1',
        authorName: 'Tahsin Zaman',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'January 2024',
        comment: 'Waking up above an endless sea of rolling clouds at Ruilui Para is one of the most magical experiences in South Asia. Indigenous hospitality is heartwarming.'
      }
    ],
    timeline: [
      { year: '1885', event: 'Ruilui Para Established', details: 'Lushai tribal highlanders establish the hilltop settlements along the mountain ridge.' },
      { year: '1997', event: 'CHT Peace Accord', details: 'Historical Peace Accord restores cultural autonomy and promotes community eco-tourism.' },
      { year: '2013', event: 'Scenic Road Built', details: 'Engineering brigade completes the Dighinala–Sajek mountain pass enabling safe visitor access.' }
    ],
    isFeatured: true,
    division: { id: 'div-chittagong', name: 'Chittagong', bnName: 'চট্টগ্রাম', slug: 'chittagong', latitude: 22.3569, longitude: 91.8325 },
    district: { id: 'dist-rangamati', divisionId: 'div-chittagong', name: 'Rangamati', bnName: 'রাঙ্গামাটি', slug: 'rangamati', latitude: 22.6533, longitude: 92.1789 },
    category: { id: 'cat-hills', name: 'Hills & Mountains', type: 'NATURE', slug: 'hills', icon: 'mountain', color: '#059669', description: 'Hill tracts and panoramic peaks' }
  },

  // ---------------------------------------------------------------------------
  // 10. CHITTAGONG DIVISION: Cox's Bazar Sea Beach
  // ---------------------------------------------------------------------------
  {
    id: 'poi-coxsbazar',
    name: "Cox's Bazar Sea Beach",
    bnName: 'কক্সবাজার সমুদ্র সৈকত',
    subtitle: 'WORLD’S LONGEST UNBROKEN NATURAL BEACH | CHITTAGONG',
    slug: 'coxs-bazar-sea-beach',
    summary: 'The world’s longest unbroken natural sandy sea beach, stretching 120 km along the Bay of Bengal with golden sands and ancient Buddhist pagodas.',
    description: 'Stretching from Kolatoli to Teknaf, Cox’s Bazar offers world-famous sunsets, the scenic 80 km Marine Drive bordering green hills, surfing breaks at Himchari and Inani coral beach, and century-old Rakhine Buddhist monasteries at Ramu.',
    chronicles: 'Named after Captain Hiram Cox of the British East India Company, who served as superintendent in 1799 establishing peace and refuge for thousands of displaced Arakanese Rakhine immigrants.',
    lore: 'Rakhine chronicles at Ramu tell of sacred Buddhist bronze statues miraculously preserved underwater in the Bankkhali River during medieval Burmese invasions.',
    loreTitle: 'CAPTAIN COX & THE SACRED RAMU PAGODAS',
    divisionId: 'div-chittagong',
    districtId: 'dist-coxsbazar',
    categoryId: 'cat-beaches',
    categoryType: 'NATURE',
    latitude: 21.4272,
    longitude: 91.9701,
    elevation: 3,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'October to March (Calm turquoise waters and clear golden sunsets)',
    difficulty: 'EASY',
    accessibility: 'Paved beach promenades, sea-view Marine Drive highway',
    entryFee: 'Free public access',
    travelRoutesSummary: 'Direct flights from Dhaka (45 mins) and direct high-speed railway to Cox’s Bazar Iconic Railway Station.',
    transportationGuide: {
      air: 'Daily direct domestic flights from Dhaka and Chittagong to Cox’s Bazar Airport (CXB).',
      train: 'Daily express train service (Cox’s Bazar Express / Parjotok Express) from Dhaka Kamalapur.',
      road: 'Direct AC coach buses via Chittagong–Cox’s Bazar national highway.'
    },
    rating: 4.8,
    reviewCount: 320,
    reviews: [
      {
        id: 'rev-cox-1',
        authorName: 'Farhana Ahmed',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'January 2024',
        comment: 'Taking the new express train all the way to the oyster-shaped Iconic Station and riding an open jeep along the 80 km Marine Drive is an unforgettable journey.'
      }
    ],
    timeline: [
      { year: '1799', event: 'Founded by Captain Hiram Cox', details: 'British administrator establishes Palongki refuge for Rakhine migrants.' },
      { year: '1869', event: 'Municipality Established', details: 'Constituted as Cox\'s Bazar municipal township.' },
      { year: '2017', event: 'Marine Drive Opening', details: 'Prime Minister inaugurates the 80 km scenic coastal Marine Drive to Teknaf.' },
      { year: '2023', event: 'Iconic Railway Station Inaugurated', details: 'Trans-Asian Railway connectivity reached with grand oyster-shaped terminal.' }
    ],
    isFeatured: true,
    division: { id: 'div-chittagong', name: 'Chittagong', bnName: 'চট্টগ্রাম', slug: 'chittagong', latitude: 22.3569, longitude: 91.8325 },
    district: { id: 'dist-coxsbazar', divisionId: 'div-chittagong', name: "Cox's Bazar", bnName: 'কক্সবাজার', slug: 'coxsbazar', latitude: 21.4272, longitude: 92.0058 },
    category: { id: 'cat-beaches', name: 'Beaches & Islands', type: 'NATURE', slug: 'beaches', icon: 'waves', color: '#0284c7', description: 'Beaches and marine sanctuaries' }
  },

  // ---------------------------------------------------------------------------
  // 11. CHITTAGONG DIVISION: Saint Martin's Island (Narikel Jinjira)
  // ---------------------------------------------------------------------------
  {
    id: 'poi-stmartin',
    name: "Saint Martin's Island",
    bnName: 'সেন্ট মার্টিন দ্বীপ (নারকেল জিঞ্জিরা)',
    subtitle: 'ONLY CORAL ISLAND OF BANGLADESH | BAY OF BENGAL',
    slug: 'saint-martins-island',
    summary: 'Bangladesh’s only coral-bearing marine island, encircled by living coral reefs, crystal turquoise water, coconut groves, and Chera Dwip.',
    description: 'Located 9 km south of Teknaf peninsula in the northeastern Bay of Bengal, Saint Martin’s features living coral heads, marine turtle nesting beaches, and the pristine uninhabited islet of Chera Dwip connected by coral bedrock at low tide.',
    chronicles: 'First charted by Arab merchant seafarers centuries ago who named it "Jazeera" (The Island) and planted coconut palms, leading to the Bengali name Narikel Jinjira.',
    lore: 'Local seafaring elders recount legends of ancient shipwrecks laden with Arab coins buried beneath the southern reefs of Chera Dwip.',
    loreTitle: 'ARAB SEAFARERS & THE COCONUT ISLAND',
    divisionId: 'div-chittagong',
    districtId: 'dist-coxsbazar',
    categoryId: 'cat-beaches',
    categoryType: 'NATURE',
    latitude: 20.6272,
    longitude: 92.3225,
    elevation: 3,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'November to March (Calm winter seas and authorized cruise ships)',
    difficulty: 'MODERATE',
    accessibility: 'Ship-based access from Teknaf/Cox’s Bazar; walking and eco-rickshaws on island',
    entryFee: 'BDT 50 (Environmental conservation levy)',
    travelRoutesSummary: 'Tourist cruise ships (e.g. Bay One, Karnafuly Express) depart from Teknaf Ghat and Cox’s Bazar.',
    rating: 4.9,
    reviewCount: 140,
    reviews: [],
    timeline: [
      { year: '1900', event: 'Named Saint Martin', details: 'Survey of India names island after British Civil Commissioner St. Martin.' },
      { year: '1999', event: 'Ecologically Critical Area', details: 'Declared an Ecologically Critical Area (ECA) to protect coral ecosystems.' },
      { year: '2022', event: 'Marine Protected Area', details: '1,743 sq km declared Bangladesh’s largest Marine Protected Area (MPA).' }
    ],
    isFeatured: false,
    division: { id: 'div-chittagong', name: 'Chittagong', bnName: 'চট্টগ্রাম', slug: 'chittagong', latitude: 22.3569, longitude: 91.8325 },
    district: { id: 'dist-coxsbazar', divisionId: 'div-chittagong', name: "Cox's Bazar", bnName: 'কক্সবাজার', slug: 'coxsbazar', latitude: 21.4272, longitude: 92.0058 },
    category: { id: 'cat-beaches', name: 'Beaches & Islands', type: 'NATURE', slug: 'beaches', icon: 'waves', color: '#0284c7', description: 'Beaches and marine sanctuaries' }
  },

  // ---------------------------------------------------------------------------
  // 12. SYLHET DIVISION: Ratargul Freshwater Swamp Forest
  // ---------------------------------------------------------------------------
  {
    id: 'poi-ratargul',
    name: 'Ratargul Swamp Forest',
    bnName: 'রাতারগুল সোয়াম্প ফরেস্ট',
    subtitle: 'FRESHWATER SWAMP FOREST | SYLHET',
    slug: 'ratargul-swamp-forest',
    summary: 'One of the few freshwater swamp forests in South Asia, where evergreen Koroch and Hijal trees stand submerged under 20–30 feet of water during monsoon.',
    description: 'Located in Gowainghat Upazila along the Gowain River, Ratargul spans 504 acres of pristine wetland sanctuary, often called the "Amazon of Bangladesh", hosting snakes, monkeys, otters, and wetland avifauna.',
    chronicles: 'Notified as a Reserved Forest in 1973 and elevated to a Special Biodiversity Reserve under the Wildlife Preservation Act in 2015.',
    lore: 'Local fishermen recount folklore of giant king cobras resting peacefully in the high forks of submerged Koroch tree branches during torrents from the Meghalaya hills.',
    loreTitle: 'THE SUBMERGED JUNGLE OF GOWAIN RIVER',
    divisionId: 'div-sylhet',
    districtId: 'dist-sylhet',
    categoryId: 'cat-forest',
    categoryType: 'NATURE',
    thematicTrail: 'sylhet',
    latitude: 25.0022,
    longitude: 91.9288,
    elevation: 12,
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'July to October (Peak monsoon when the forest canopy is fully submerged)',
    difficulty: 'EASY',
    accessibility: 'Local non-motorized wooden paddle boats with certified local boatmen',
    entryFee: 'BDT 50 (Forest gate) + BDT 800–1000 per boat (seats 4–5)',
    travelRoutesSummary: '26 km north of Sylhet city via Amberkhana–Salutikar–Gowainghat road.',
    transportationGuide: {
      road: '1 hour via CNG auto-rickshaw or hired microbus from Sylhet city to Motorghat boat terminal.',
      air: 'Osmani International Airport (ZYL) in Sylhet is 22 km south.'
    },
    rating: 4.8,
    reviewCount: 110,
    reviews: [
      {
        id: 'rev-rat-1',
        authorName: 'Nafis Iqbal',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'August 2023',
        comment: 'Gliding silently in a wooden paddle boat under submerged Koroch tree branches while rain pitter-patters on the water is surreal.'
      }
    ],
    timeline: [
      { year: '1973', event: 'Reserved Forest Declared', details: 'Forest Department places the Gowain river swamp under conservation status.' },
      { year: '2015', event: 'Special Biodiversity Reserve', details: 'Designated a Special Biodiversity Reserve under Ministry of Environment notification.' }
    ],
    isFeatured: true,
    division: { id: 'div-sylhet', name: 'Sylhet', bnName: 'সিলেট', slug: 'sylhet', latitude: 24.8949, longitude: 91.8687 },
    district: { id: 'dist-sylhet', divisionId: 'div-sylhet', name: 'Sylhet', bnName: 'সিলেট', slug: 'sylhet', latitude: 24.8949, longitude: 91.8687 },
    category: { id: 'cat-forest', name: 'Mangroves & Forests', type: 'NATURE', slug: 'forests', icon: 'tree-pine', color: '#059669', description: 'National parks and mangrove deltas' }
  },

  // ---------------------------------------------------------------------------
  // 13. SYLHET DIVISION: Sreemangal & Lawachara Rainforest
  // ---------------------------------------------------------------------------
  {
    id: 'poi-sreemangal',
    name: 'Sreemangal Tea Route & Lawachara',
    bnName: 'শ্রীমঙ্গল ও লাউয়াছড়া জাতীয় উদ্যান',
    subtitle: 'TEA CAPITAL & RAINFOREST CANOPY | MOULVIBAZAR',
    slug: 'sreemangal-tea-lawachara',
    summary: 'The Tea Capital of Bangladesh featuring rolling emerald tea gardens, seven-layer tea, and Lawachara National Park, home of the endangered Western Hoolock Gibbon.',
    description: 'Sreemangal is home to over 40 sprawling tea estates founded since Malnicherra in 1854, adjacent to Lawachara’s 1,250-hectare semi-evergreen tropical rainforest and indigenous Khasia betel-leaf farming punjis.',
    chronicles: 'The British East India commerce established commercial tea planting here in the mid-19th century, transforming the region into Bengal’s premier tea garden export hub.',
    lore: 'Khasia indigenous villagers preserve matrilineal forest traditions where ancient trees are venerated as living family guardians essential for betel-leaf vines.',
    loreTitle: 'FOREST GUARDIANS OF THE KHASIA PUNJI',
    divisionId: 'div-sylhet',
    districtId: 'dist-moulvibazar',
    categoryId: 'cat-hills',
    categoryType: 'NATURE',
    thematicTrail: 'sylhet',
    latitude: 24.3065,
    longitude: 91.7297,
    elevation: 35,
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'June to November (Vibrant green tea flush) & Nov to Feb (Cool trekking)',
    difficulty: 'EASY',
    accessibility: 'Marked hiking trails through Lawachara, paved roads through tea estates',
    entryFee: 'BDT 50 (Locals) / BDT 500 (Foreigners)',
    travelRoutesSummary: 'Direct intercity train from Dhaka (Jayantika/Parabat Express) or Chittagong directly to Sreemangal station.',
    transportationGuide: {
      train: 'Sreemangal Railway Station has multiple daily trains from Dhaka (3.5 hours) and Chittagong.',
      road: 'Highway connection via Dhaka–Sylhet N2 highway (185 km from Dhaka).'
    },
    rating: 4.9,
    reviewCount: 145,
    reviews: [],
    timeline: [
      { year: '1854', event: 'First Commercial Tea Garden', details: 'Malnicherra tea estate established, launching tea production in Bengal.' },
      { year: '1996', event: 'Lawachara National Park Established', details: 'Declared a National Park under the Bangladesh Wildlife Preservation Act.' }
    ],
    isFeatured: true,
    division: { id: 'div-sylhet', name: 'Sylhet', bnName: 'সিলেট', slug: 'sylhet', latitude: 24.8949, longitude: 91.8687 },
    district: { id: 'dist-moulvibazar', divisionId: 'div-sylhet', name: 'Moulvibazar', bnName: 'মৌলভীবাজার', slug: 'moulvibazar', latitude: 24.4829, longitude: 91.7774 },
    category: { id: 'cat-hills', name: 'Hills & Mountains', type: 'NATURE', slug: 'hills', icon: 'mountain', color: '#059669', description: 'Hill tracts and panoramic peaks' }
  },

  // ---------------------------------------------------------------------------
  // 14. BARISAL DIVISION: Kuakata Sea Beach (Sagar Kanya)
  // ---------------------------------------------------------------------------
  {
    id: 'poi-kuakata',
    name: 'Kuakata Sea Beach',
    bnName: 'কুয়াকাটা সমুদ্র সৈকত (সাগরকন্যা)',
    subtitle: 'DAUGHTER OF THE SEA | PATUAKHALI',
    slug: 'kuakata-sea-beach',
    summary: 'Unique 18 km panoramic sandy beach known as the "Daughter of the Sea", where visitors can witness unobstructed sunrise and sunset over the Bay of Bengal.',
    description: 'Located in Kalapara Upazila of Patuakhali, Kuakata features ancient Rakhine water wells, historic Buddhist temples with giant bronze statues, the Gangamati mangrove forest, and an excavated 200-year-old ancient Rakhine seafaring boat.',
    chronicles: 'Settled in 1784 by Rakhine refugees fleeing the Burmese conquest of Arakan, who dug historic water wells ("Kua") into the sandy shore giving the town its name.',
    lore: 'The ancient wells ("Kua") were believed to have been blessed by Buddhist monks so that sweet freshwater emerged right on the saline edge of the roaring ocean.',
    loreTitle: 'THE SACRED WELLS & THE 200-YEAR RAKHINE BOAT',
    divisionId: 'div-barisal',
    districtId: 'dist-patuakhali',
    categoryId: 'cat-beaches',
    categoryType: 'NATURE',
    thematicTrail: 'sundarbans',
    latitude: 21.8167,
    longitude: 90.1194,
    elevation: 3,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'October to March (Crystal clear dawn sunrise and dusk sunset)',
    difficulty: 'EASY',
    accessibility: 'Wide open sandy beach, motorable road directly to beach front',
    entryFee: 'Free public access',
    travelRoutesSummary: 'Direct expressway via Padma Bridge and Payra Bridge from Dhaka (6 hours).',
    transportationGuide: {
      road: 'Direct luxury AC buses from Dhaka via Padma Bridge and Payra Bridge (290 km).',
      water: 'Overnight luxury passenger launch from Dhaka Sadarghat to Patuakhali, then 1.5 hr bus to Kuakata.'
    },
    rating: 4.8,
    reviewCount: 95,
    reviews: [],
    timeline: [
      { year: '1784', event: 'Rakhine Settlement', details: 'Rakhine pioneers arrive from Arakan and dig the historic freshwater wells.' },
      { year: '2012', event: 'Ancient Boat Excavation', details: 'A 200-year-old 72-foot ancient Rakhine wooden vessel is excavated from the beach sands.' },
      { year: '2022', event: 'Direct Road Connectivity', details: 'Opening of Padma Bridge and Payra Bridge provides seamless highway access.' }
    ],
    isFeatured: true,
    division: { id: 'div-barisal', name: 'Barisal', bnName: 'বরিশাল', slug: 'barisal', latitude: 22.7010, longitude: 90.3696 },
    district: { id: 'dist-patuakhali', divisionId: 'div-barisal', name: 'Patuakhali', bnName: 'পটুয়াখালী', slug: 'patuakhali', latitude: 22.3596, longitude: 90.3298 },
    category: { id: 'cat-beaches', name: 'Beaches & Islands', type: 'NATURE', slug: 'beaches', icon: 'waves', color: '#0284c7', description: 'Beaches and marine sanctuaries' }
  },

  // ---------------------------------------------------------------------------
  // 15. RANGPUR DIVISION: Kantajew Temple (Kantanagar)
  // ---------------------------------------------------------------------------
  {
    id: 'poi-kantajew',
    name: 'Kantajew Temple',
    bnName: 'কান্তজীউ মন্দির (কান্তনগর)',
    subtitle: 'TERRACOTTA MASTERPIECE | DINAJPUR',
    slug: 'kantajew-temple-dinajpur',
    summary: '18th-century Navaratna terracotta masterpiece along the Dhepa River, completely covered with thousands of exquisitely carved terracotta panels of the Ramayana and Mahabharata.',
    description: 'Commissioned by Maharaja Prannath and completed by his son Maharaja Ramnath in 1752 CE, every square inch of Kantajew’s brick exterior is adorned with intricate terracotta friezes depicting mythological battles, Mughal courtiers, hunting scenes, and everyday 18th-century Bengal life.',
    chronicles: 'The nine ornate spires (navaratna) originally reached high into the sky before being toppled during the catastrophic Great Assam Earthquake of June 12, 1897.',
    lore: 'Local tradition recounts that Maharaja Prannath journeyed to Vrindavan on foot to obtain the sacred deity of Kantaji (Krishna) that is enshrined within the inner sanctum.',
    loreTitle: 'THE EPIC TERRACOTTA FRIEZES OF THE RAMAYANA',
    divisionId: 'div-rangpur',
    districtId: 'dist-dinajpur',
    categoryId: 'cat-archaeology',
    categoryType: 'HERITAGE',
    latitude: 25.7924,
    longitude: 88.6653,
    elevation: 32,
    coverImage: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'November to February (Mild weather & annual Rash Mela in late autumn)',
    difficulty: 'EASY',
    accessibility: 'Paved garden courtyards and ramp approaches',
    entryFee: 'Free temple complex entry / small voluntary contribution',
    openingHours: 'Daily: 8:00 AM – 6:00 PM',
    travelRoutesSummary: '20 km north of Dinajpur town via Dinajpur–Tetulia highway; near Kaharole.',
    transportationGuide: {
      train: 'Direct intercity train from Dhaka (Drutojan/Ekota Express) to Dinajpur Station (20 km away).',
      road: 'Highway access via Dinajpur–Birganj road.'
    },
    rating: 4.9,
    reviewCount: 78,
    reviews: [
      {
        id: 'rev-kan-1',
        authorName: 'David McCutchion Heritage Trust',
        authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'December 2023',
        comment: 'Unquestionably the most ornately decorated terracotta temple in the entire subcontinent. The panels capture Mughal musketeers, European trading ships, and the Ramayana with boundless vitality.'
      }
    ],
    timeline: [
      { year: '1704', event: 'Foundation Laid', details: 'Maharaja Prannath begins construction of the navaratna shrine.' },
      { year: '1752', event: 'Dedication by Ramnath', details: 'Adopted son Maharaja Ramnath completes and consecrates the temple to Krishna.' },
      { year: '1897', event: 'Great Assam Earthquake', details: 'Earthquake topples the nine spires; preserved in present flat-topped form.' },
      { year: '1960', event: 'Protected National Monument', details: 'Declared a protected monument under the Antiquities Act.' }
    ],
    isFeatured: true,
    division: { id: 'div-rangpur', name: 'Rangpur', bnName: 'রংপুর', slug: 'rangpur', latitude: 25.7439, longitude: 89.2467 },
    district: { id: 'dist-dinajpur', divisionId: 'div-rangpur', name: 'Dinajpur', bnName: 'দিনাজপুর', slug: 'dinajpur', latitude: 25.6279, longitude: 88.6332 },
    category: { id: 'cat-archaeology', name: 'Archaeology & Heritage', type: 'HERITAGE', slug: 'archaeology', icon: 'landmark', color: '#f59e0b', description: 'Ancient ruins and archaeological monuments' },
    heritageDetail: {
      id: 'hd-kantajew',
      periodEra: 'Late Medieval Bengal (1704–1752 CE)',
      builtYear: '1752 CE',
      architecturalStyle: 'Navaratna Terracotta Brick Temple Architecture',
      historicalSignificance: 'The finest and most profusely ornamented terracotta brick temple in the Indian subcontinent, preserving thousands of relief carvings of social, military, and mythological life.',
      unescoStatus: 'TENTATIVE_LIST',
      preservationStatus: 'Protected Monument under Department of Archaeology',
      verificationStatus: 'VERIFIED_BY_EXPERT',
      verifiedBy: 'Department of Archaeology & Varendra Research Museum',
      sources: [
        { title: 'Terracotta Art of Bengal', author: 'S. K. Saraswati', year: '1976' },
        { title: 'Late Mediaeval Temples of Bengal: Origins and Classification', author: 'David J. McCutchion', year: '1972' }
      ],
      primaryInscriptions: [
        {
          title: 'Kantajew Temple Sanskrit Dedication Plaque',
          script: 'Sanskrit in Gaudiya Bengali Script',
          dateEra: '1752 CE (Saka 1674)',
          material: 'Carved Terracotta Dedication Plaque',
          translation: 'In the Saka year 1674, Maharaja Ramnath, son of Maharaja Prannath, dedicated this magnificent nine-spired palace temple to Sri Radha-Kanta.',
          currentLocation: 'Southern Portal Arch, Kantajew Temple'
        }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // 16. RANGPUR DIVISION: Tajhat Palace
  // ---------------------------------------------------------------------------
  {
    id: 'poi-tajhat',
    name: 'Tajhat Palace',
    bnName: 'তাজহাট রাজবাড়ী',
    subtitle: 'PALACE OF CROWNS | RANGPUR',
    slug: 'tajhat-palace-rangpur',
    summary: 'Grand early 20th-century royal palace built by Maharaja Kumar Gopal Lal Roy, featuring Corinthian colonnades, Roman statues, and an imported Italian white marble staircase.',
    description: 'Completed in 1917 at a cost of 1.5 million silver rupees, Tajhat Palace displays a majestic semi-octagonal dome, sweeping U-shaped imported Italian marble staircase, and houses the Rangpur Archaeological Museum with ancient terrocotta plaques and Sanskrit manuscripts.',
    chronicles: 'Founded by Manna Lal Roy, a wealthy jeweler who traded diamond-encrusted crowns ("Taj"), giving the estate its name Tajhat.',
    lore: 'During the early 1980s, the palace served as the High Court of Bangladesh Rangpur Bench before being converted into a public national archaeological museum.',
    loreTitle: 'THE JEWELER’S PALACE & THE HIGH COURT',
    divisionId: 'div-rangpur',
    districtId: 'dist-rangpur',
    categoryId: 'cat-palaces',
    categoryType: 'HERITAGE',
    latitude: 25.7236,
    longitude: 89.2683,
    elevation: 34,
    coverImage: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'October to March',
    difficulty: 'EASY',
    accessibility: 'Paved garden promenades, ground floor museum access',
    entryFee: 'BDT 20 (Locals) / BDT 300 (Foreigners)',
    openingHours: 'Tue–Sat: 10:00 AM – 5:00 PM (Closed Sundays & half-day Mondays)',
    travelRoutesSummary: '6 km southeast of Rangpur city center.',
    transportationGuide: {
      road: '15 minutes via auto-rickshaw from Rangpur city center.',
      train: 'Rangpur Railway Station (5 km northwest) with Kurigram Express from Dhaka.'
    },
    rating: 4.7,
    reviewCount: 62,
    reviews: [],
    timeline: [
      { year: '1917', event: 'Palace Completed', details: 'Maharaja Kumar Gopal Lal Roy finishes the grand palace.' },
      { year: '1984', event: 'High Court Bench', details: 'Used as High Court Bench of Bangladesh under presidential proclamation.' },
      { year: '2005', event: 'Rangpur Archaeological Museum', details: 'Transferred to Department of Archaeology as public museum.' }
    ],
    isFeatured: false,
    division: { id: 'div-rangpur', name: 'Rangpur', bnName: 'রংপুর', slug: 'rangpur', latitude: 25.7439, longitude: 89.2467 },
    district: { id: 'dist-rangpur', divisionId: 'div-rangpur', name: 'Rangpur', bnName: 'রংপুর', slug: 'rangpur', latitude: 25.7439, longitude: 89.2467 },
    category: { id: 'cat-palaces', name: 'Palaces & Forts', type: 'HERITAGE', slug: 'palaces', icon: 'castle', color: '#f59e0b', description: 'Royal residences and historical palaces' }
  },

  // ---------------------------------------------------------------------------
  // 17. MYMENSINGH DIVISION: Birishiri & Susang Durgapur
  // ---------------------------------------------------------------------------
  {
    id: 'poi-birishiri',
    name: 'Birishiri & Susang Durgapur',
    bnName: 'বিরিশিরি ও সুসং দুর্গাপুর',
    subtitle: 'CERAMIC LAKE & GARO HERITAGE | NETROKONA',
    slug: 'birishiri-susang-durgapur',
    summary: 'Foothills of the Garo mountain range, famed for the turquoise waters of the White Clay / Ceramic Hill Lake, Someshwari river, and indigenous Garo and Hajong heritage.',
    description: 'Located at the northern frontier bordering Meghalaya, Birishiri features the turquoise-tinted China Clay Lake at Bijoypur, the crystal gravels of the Someshwari River, Ranikhong Catholic Mission church atop a hill, and the Tribal Cultural Academy preserving Garo language and Wangala harvest festivals.',
    chronicles: 'Epicenter of the historic Tanka Movement (1946–1950) where Hajong and Garo peasants fought feudal grain taxes under revolutionary leader Comrade Moni Singh.',
    lore: 'Indigenous Garo legends narrate that the turquoise hue of the hill lake is gifted by the rain god Saljong to mirror the clean blue skies of the ancestral Meghalaya mountains.',
    loreTitle: 'THE TURQUOISE LAKE & THE TANKA REVOLUTION',
    divisionId: 'div-mymensingh',
    districtId: 'dist-netrokona',
    categoryId: 'cat-hills',
    categoryType: 'NATURE',
    thematicTrail: 'sylhet',
    latitude: 25.1246,
    longitude: 90.6558,
    elevation: 40,
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'November to February (Crystal waters in Someshwari River and pleasant weather)',
    difficulty: 'MODERATE',
    accessibility: 'Local boat crossing across Someshwari River, then rickshaw/motorcycle to hill lake',
    entryFee: 'Free public access / BDT 20 (Tribal Cultural Academy museum)',
    travelRoutesSummary: '175 km north of Dhaka via Mymensingh–Shyamganj–Birishiri highway.',
    transportationGuide: {
      road: 'Bus from Mohakhali Dhaka to Birishiri (5 hours), crossing Someshwari river by boat.',
      train: 'Train from Dhaka to Jaria Jhanjail railway terminal, then 30 min CNG to Birishiri.'
    },
    rating: 4.8,
    reviewCount: 72,
    reviews: [],
    timeline: [
      { year: '1946', event: 'Hajong Tanka Movement', details: 'Comrade Moni Singh leads peasant uprising for land rights against Susang Zamindars.' },
      { year: '1977', event: 'Tribal Cultural Academy Founded', details: 'Established in Birishiri to preserve indigenous Garo, Hajong, and Koch culture.' }
    ],
    isFeatured: true,
    division: { id: 'div-mymensingh', name: 'Mymensingh', bnName: 'ময়মনসিংহ', slug: 'mymensingh', latitude: 24.7471, longitude: 90.4074 },
    district: { id: 'dist-netrokona', divisionId: 'div-mymensingh', name: 'Netrokona', bnName: 'নেত্রকোণা', slug: 'netrokona', latitude: 24.8709, longitude: 90.7278 },
    category: { id: 'cat-hills', name: 'Hills & Mountains', type: 'NATURE', slug: 'hills', icon: 'mountain', color: '#059669', description: 'Hill tracts and panoramic peaks' }
  },

  // ---------------------------------------------------------------------------
  // 18. MYMENSINGH DIVISION: Shashi Lodge (Muktagacha Rajbari)
  // ---------------------------------------------------------------------------
  {
    id: 'poi-shashi-lodge',
    name: 'Shashi Lodge (Muktagacha Palace)',
    bnName: 'শশী লজ (মুক্তাগাছা রাজবাড়ী)',
    subtitle: 'NEOCLASSICAL ZAMINDAR ESTATE | MYMENSINGH',
    slug: 'shashi-lodge-mymensingh',
    summary: 'Opulent Neoclassical European mansion of Maharaja Shashi Kanta Acharya Chowdhury, featuring a rare Parisian crystal musical fountain and Greco-Roman Venus statues.',
    description: 'Rebuilt in 1905 after the 1897 earthquake, Shashi Lodge is an architectural masterpiece of Mymensingh, boasting Corinthian pilasters, wooden dance ballroom floors, Roman marble statues, and lush courtyards, famed also for traditional Muktagacha Monda sweets.',
    chronicles: 'Seat of the Muktagacha Zamindars, one of the most powerful and cultured landed estates in colonial Bengal.',
    lore: 'The estate was famed for its imported musical fountain from Paris that chimed harmoniously when water flowed, accompanying royal classical music soirees in the ballroom.',
    loreTitle: 'THE MUSICAL FOUNTAIN & THE VENUS STATUES',
    divisionId: 'div-mymensingh',
    districtId: 'dist-mymensingh',
    categoryId: 'cat-palaces',
    categoryType: 'HERITAGE',
    latitude: 24.7570,
    longitude: 90.4072,
    elevation: 19,
    coverImage: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'October to March',
    difficulty: 'EASY',
    accessibility: 'Flat gardens and ground-floor palace salons',
    entryFee: 'BDT 20 (Locals) / BDT 300 (Foreigners)',
    openingHours: 'Tue–Sat: 10:00 AM – 5:00 PM (Closed Sundays)',
    travelRoutesSummary: 'Located in central Mymensingh city along the Brahmaputra riverbank.',
    transportationGuide: {
      train: 'Tista / Jamuna Express from Dhaka Kamalapur to Mymensingh Junction (2.5 hours).',
      road: 'Direct 4-lane highway from Dhaka via Gazipur (120 km).'
    },
    rating: 4.7,
    reviewCount: 58,
    reviews: [],
    timeline: [
      { year: '1897', event: 'Great Earthquake Destruction', details: 'Original wooden lodge destroyed during the 1897 Assam earthquake.' },
      { year: '1905', event: 'Neoclassical Palace Built', details: 'Maharaja Shashi Kanta Acharya completes the grand brick and marble estate.' },
      { year: '2015', event: 'Archaeological Takeover', details: 'Handed over to Department of Archaeology for monument restoration.' }
    ],
    isFeatured: false,
    division: { id: 'div-mymensingh', name: 'Mymensingh', bnName: 'ময়মনসিংহ', slug: 'mymensingh', latitude: 24.7471, longitude: 90.4074 },
    district: { id: 'dist-mymensingh', divisionId: 'div-mymensingh', name: 'Mymensingh', bnName: 'ময়মনসিংহ', slug: 'mymensingh', latitude: 24.7471, longitude: 90.4074 },
    category: { id: 'cat-palaces', name: 'Palaces & Forts', type: 'HERITAGE', slug: 'palaces', icon: 'castle', color: '#f59e0b', description: 'Royal residences and historical palaces' }
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
    description: 'Explore Ahsan Manzil (The Pink Palace), Lalbagh Fort, and take a traditional wooden boat along the Buriganga river.',
    destinationId: 'poi-ahsan-manzil'
  },
  {
    id: 'day-2',
    dayNumber: 2,
    title: 'Day 2: Sylhet - Tea Gardens & Hidden Falls',
    location: 'Sreemangal, Sylhet',
    travelTime: '4 h 15 min',
    description: 'Trek through Malnicherra tea estate, taste seven-layer tea, and hike through Lawachara rainforest canopy.',
    destinationId: 'poi-sreemangal'
  },
  {
    id: 'day-3',
    dayNumber: 3,
    title: 'Day 3: Sylhet - Ratargul Freshwater Swamp Forest',
    location: 'Ratargul, Gowainghat',
    travelTime: '2 h 30 min',
    description: 'Glide in silent wooden paddle boats beneath submerged Koroch and Hijal evergreen trees.',
    destinationId: 'poi-ratargul'
  },
  {
    id: 'day-4',
    dayNumber: 4,
    title: 'Day 4: Bagerhat - Sixty Dome Mosque & Khalifatabad',
    location: 'Bagerhat, Khulna',
    travelTime: '3 h 10 min',
    description: 'UNESCO World Heritage 15th-century Sixty Dome Mosque and sweetwater dighis of Khan Jahan Ali.',
    destinationId: 'poi-sixty-dome'
  },
  {
    id: 'day-5',
    dayNumber: 5,
    title: 'Day 5: Sundarbans - Tiger Sanctuary & Mangrove Delta',
    location: 'Kotka & Hiron Point, Sundarbans',
    travelTime: '5 h 00 min',
    description: 'Liveaboard river cruise through the world’s largest mangrove delta to spot Royal Bengal tigers and spotted deer.',
    destinationId: 'poi-sundarbans'
  },
  {
    id: 'day-6',
    dayNumber: 6,
    title: 'Day 6: Rajshahi - Somapura Mahavihara at Paharpur',
    location: 'Badalgachhi, Naogaon',
    travelTime: '4 h 20 min',
    description: 'UNESCO World Heritage 8th-century Buddhist monastery, cruciform stupa, and 2,800 terracotta plaques.',
    destinationId: 'poi-paharpur'
  },
  {
    id: 'day-7',
    dayNumber: 7,
    title: 'Day 7: Dinajpur - Kantajew Terracotta Temple',
    location: 'Kaharole, Dinajpur',
    travelTime: '3 h 00 min',
    description: 'Marvel at the 18th-century Navaratna terracotta carvings depicting the epic Ramayana and Mahabharata.',
    destinationId: 'poi-kantajew'
  }
];
