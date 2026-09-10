import { Destination } from '../types';

export interface ResidenceLocation {
  id: string;
  name: string;
  bnName: string;
  district: string;
  divisionSlug: string;
  latitude: number;
  longitude: number;
  tagline: string;
}

export interface TransitStep {
  instruction: string;
  detail: string;
  distanceKm?: number;
  iconType: 'start' | 'highway' | 'bridge' | 'rail' | 'water' | 'flight' | 'destination';
}

export interface TransitModeDetail {
  mode: 'road' | 'rail' | 'air' | 'water';
  label: string;
  iconName: string;
  durationText: string;
  estimatedCost: string;
  operatorOrHighway: string;
  recommendedTime: string;
  frequency: string;
  notes: string;
  steps: TransitStep[];
}

export interface CalculatedRoute {
  origin: ResidenceLocation;
  destination: Destination;
  straightDistanceKm: number;
  roadDistanceKm: number;
  roadDurationMinutes: number;
  roadDurationText: string;
  coordinates: [number, number][];
  modes: TransitModeDetail[];
}

// 8 Administrative Division Residence Departure Presets
export const RESIDENCE_PRESETS: ResidenceLocation[] = [
  {
    id: 'res-dhaka',
    name: 'Dhaka',
    bnName: 'ঢাকা',
    district: 'Dhaka Central Hub',
    divisionSlug: 'dhaka',
    latitude: 23.8103,
    longitude: 90.4125,
    tagline: 'Capital Hub (Dhanmondi / Gulshan / Shahbagh)',
  },
  {
    id: 'res-chittagong',
    name: 'Chittagong',
    bnName: 'চট্টগ্রাম',
    district: 'Agrabad / GEC Circle',
    divisionSlug: 'chittagong',
    latitude: 22.3569,
    longitude: 91.8325,
    tagline: 'Port City Commercial Hub',
  },
  {
    id: 'res-sylhet',
    name: 'Sylhet',
    bnName: 'সিলেট',
    district: 'Zindabazar / Ambarkhana',
    divisionSlug: 'sylhet',
    latitude: 24.8949,
    longitude: 91.8687,
    tagline: 'Surma Valley Tea & Cloud Region',
  },
  {
    id: 'res-rajshahi',
    name: 'Rajshahi',
    bnName: 'রাজশাহী',
    district: 'Shaheb Bazar / Padma Riverfront',
    divisionSlug: 'rajshahi',
    latitude: 24.3745,
    longitude: 88.6042,
    tagline: 'Silk City & Varendra Heartland',
  },
  {
    id: 'res-khulna',
    name: 'Khulna',
    bnName: 'খুলনা',
    district: 'Shibbari / Sonadanga',
    divisionSlug: 'khulna',
    latitude: 22.8456,
    longitude: 89.5403,
    tagline: 'Sundarbans Delta Gateway',
  },
  {
    id: 'res-barisal',
    name: 'Barisal',
    bnName: 'বরিশাল',
    district: 'Sadartoli / Kirtankhola Hub',
    divisionSlug: 'barisal',
    latitude: 22.7010,
    longitude: 90.3696,
    tagline: 'Riverine Venice of Bengal',
  },
  {
    id: 'res-rangpur',
    name: 'Rangpur',
    bnName: 'রংপুর',
    district: 'Jahaj Company Mor',
    divisionSlug: 'rangpur',
    latitude: 25.7439,
    longitude: 89.2467,
    tagline: 'Northern Teesta & Tajhat Hub',
  },
  {
    id: 'res-mymensingh',
    name: 'Mymensingh',
    bnName: 'ময়মনসিংহ',
    district: 'Ganginar Par',
    divisionSlug: 'mymensingh',
    latitude: 24.7471,
    longitude: 90.4074,
    tagline: 'Old Brahmaputra Heritage Hub',
  },
];

// Strategic Bridge & Highway Transit Nodes across Bangladesh
const CORRIDOR_NODES = {
  // Padma Multipurpose Bridge (Connecting Dhaka/Central to Khulna & Barisal)
  padmaMawa: [23.4752, 90.2647] as [number, number],
  padmaJanjira: [23.4183, 90.1852] as [number, number],
  bhangaJunction: [23.3850, 89.9850] as [number, number],

  // Bangabandhu Jamuna Bridge (Connecting Dhaka/East to Rajshahi & Rangpur)
  tangailHighway: [24.2513, 89.9167] as [number, number],
  jamunaEast: [24.3942, 89.7915] as [number, number],
  jamunaWest: [24.4011, 89.7420] as [number, number],
  sirajganjJunction: [24.4533, 89.7006] as [number, number],
  bograJunction: [24.8465, 89.3725] as [number, number],

  // Meghna & Gomti Bridges (Connecting Dhaka to Chittagong & Cox's Bazar)
  kachpurBridge: [23.7056, 90.5283] as [number, number],
  meghnaBridge: [23.5786, 90.6272] as [number, number],
  comillaBypass: [23.4607, 91.1809] as [number, number],
  feniCorridor: [23.0186, 91.3966] as [number, number],
  chittagongCity: [22.3569, 91.8325] as [number, number],

  // Bhairab Meghna Bridge (Connecting Dhaka to Sylhet)
  narsingdiHighway: [23.9194, 90.7176] as [number, number],
  bhairabBridge: [24.0450, 90.9856] as [number, number],
  brahmanbariaBypass: [24.0125, 91.1200] as [number, number],
  habiganjBypass: [24.3800, 91.4150] as [number, number],
  moulvibazarBypass: [24.4820, 91.7650] as [number, number],
};

// Calculate Haversine distance in kilometers
export function calculateHaversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

// Generate realistic Highway-following polyline coordinates
export function generateHighwayRoutePoints(
  origin: ResidenceLocation,
  dest: Destination
): [number, number][] {
  const oLat = origin.latitude;
  const oLng = origin.longitude;
  const dLat = dest.latitude;
  const dLng = dest.longitude;

  const points: [number, number][] = [[oLat, oLng]];

  // Case 1: Within same city / close proximity (< 30km)
  const directDist = calculateHaversineKm(oLat, oLng, dLat, dLng);
  if (directDist < 30) {
    // Local city boulevard midpoint
    const midLat = (oLat + dLat) / 2 + 0.005;
    const midLng = (oLng + dLng) / 2 + 0.005;
    points.push([midLat, midLng]);
    points.push([dLat, dLng]);
    return points;
  }

  // Case 2: Origin is Dhaka (Central hub routing)
  if (origin.divisionSlug === 'dhaka') {
    if (dest.division?.slug === 'khulna' || dest.division?.slug === 'barisal') {
      // Cross Padma Multipurpose Bridge
      points.push(CORRIDOR_NODES.padmaMawa);
      points.push(CORRIDOR_NODES.padmaJanjira);
      points.push(CORRIDOR_NODES.bhangaJunction);

      if (dest.division?.slug === 'barisal') {
        points.push([23.0050, 90.1500]); // Madaripur/Barisal Highway
      } else if (dest.id === 'poi-sixty-dome' || dest.id === 'poi-sundarbans') {
        points.push([23.0800, 89.8200]); // Gopalganj Highway
        points.push([22.7500, 89.8000]); // Bagerhat entry
      }
    } else if (dest.division?.slug === 'rajshahi' || dest.division?.slug === 'rangpur') {
      // Cross Jamuna Bridge
      points.push(CORRIDOR_NODES.tangailHighway);
      points.push(CORRIDOR_NODES.jamunaEast);
      points.push(CORRIDOR_NODES.jamunaWest);
      points.push(CORRIDOR_NODES.sirajganjJunction);

      if (dest.division?.slug === 'rangpur' || dest.id === 'poi-mahasthangarh') {
        points.push(CORRIDOR_NODES.bograJunction);
        if (dest.id === 'poi-kantajew') {
          points.push([25.6200, 88.6400]); // Dinajpur bypass
        }
      } else if (dest.id === 'poi-paharpur') {
        points.push(CORRIDOR_NODES.bograJunction);
        points.push([24.9500, 89.0500]); // Naogaon Highway
      }
    } else if (dest.division?.slug === 'sylhet') {
      // Cross Bhairab Meghna Bridge
      points.push(CORRIDOR_NODES.narsingdiHighway);
      points.push(CORRIDOR_NODES.bhairabBridge);
      points.push(CORRIDOR_NODES.brahmanbariaBypass);
      points.push(CORRIDOR_NODES.habiganjBypass);

      if (dest.id === 'poi-sreemangal') {
        points.push(CORRIDOR_NODES.moulvibazarBypass);
      }
    } else if (dest.division?.slug === 'chittagong') {
      // Dhaka-Chittagong Expressway N1
      points.push(CORRIDOR_NODES.kachpurBridge);
      points.push(CORRIDOR_NODES.meghnaBridge);
      points.push(CORRIDOR_NODES.comillaBypass);
      points.push(CORRIDOR_NODES.feniCorridor);

      if (dest.id === 'poi-coxs-bazar' || dest.id === 'poi-saint-martin') {
        points.push(CORRIDOR_NODES.chittagongCity);
        points.push([21.8500, 92.0500]); // Dohazari-Chakaria highway
      }
    } else if (dest.division?.slug === 'mymensingh') {
      points.push([24.2000, 90.4100]); // Gazipur - Bhaluka Highway (N3)
      points.push([24.5500, 90.4100]); // Trishal bypass
    }
  } else {
    // Inter-district cross connection: add natural curvature midpoint
    const midLat = (oLat + dLat) / 2 + 0.08;
    const midLng = (oLng + dLng) / 2 + 0.05;
    points.push([midLat, midLng]);
  }

  points.push([dLat, dLng]);
  return points;
}

// Compute comprehensive route and transit intelligence
export function calculateResidenceRoute(
  origin: ResidenceLocation,
  dest: Destination
): CalculatedRoute {
  const straightDistanceKm = calculateHaversineKm(
    origin.latitude,
    origin.longitude,
    dest.latitude,
    dest.longitude
  );

  // Realistic highway road curvature factor (typically 1.25x - 1.35x of straight line in Bangladesh)
  const roadFactor = straightDistanceKm < 25 ? 1.15 : 1.32;
  const roadDistanceKm = Math.round(straightDistanceKm * roadFactor);

  // Average highway cruising speed taking delta traffic into account (~50-55 km/h)
  const averageSpeedKmh = roadDistanceKm < 50 ? 35 : 55;
  const roadDurationMinutes = Math.round((roadDistanceKm / averageSpeedKmh) * 60);

  const hours = Math.floor(roadDurationMinutes / 60);
  const mins = roadDurationMinutes % 60;
  const roadDurationText = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  const coordinates = generateHighwayRoutePoints(origin, dest);

  // Build Multi-Modal Transit Breakdown
  const modes: TransitModeDetail[] = [];

  // 1. ROAD MODE
  let highwayCode = 'National Highway';
  let expresswayToll = 'Nominal Bridge / Expressway Toll';
  let bestTime = 'Depart before 6:30 AM to bypass city exit bottlenecks';

  if (dest.division?.slug === 'khulna' || dest.division?.slug === 'barisal') {
    highwayCode = 'Dhaka-Mawa-Bhanga Expressway (N8) & Padma Bridge';
    expresswayToll = 'Padma Bridge Toll: BDT 750 (Car) / BDT 2,400 (Bus)';
  } else if (dest.division?.slug === 'chittagong') {
    highwayCode = 'Dhaka-Chittagong 4-Lane Highway (N1)';
    expresswayToll = 'Meghna & Gomti Toll: BDT 200';
  } else if (dest.division?.slug === 'sylhet') {
    highwayCode = 'Dhaka-Sylhet Highway (N2)';
    expresswayToll = 'Bhairab Bridge Toll: BDT 150';
  } else if (dest.division?.slug === 'rajshahi' || dest.division?.slug === 'rangpur') {
    highwayCode = 'Dhaka-Tangail-Jamuna Expressway (N4/N5)';
    expresswayToll = 'Bangabandhu Bridge Toll: BDT 550 (Car) / BDT 1,000 (Bus)';
  }

  const busFareMin = Math.max(150, Math.round(roadDistanceKm * 2.2));
  const busFareMax = Math.max(300, Math.round(roadDistanceKm * 3.8));

  modes.push({
    mode: 'road',
    label: 'Road & Highway',
    iconName: 'car',
    durationText: roadDurationText,
    estimatedCost: `BDT ${busFareMin.toLocaleString()} – ${busFareMax.toLocaleString()} (Bus) / BDT ${(roadDistanceKm * 18).toLocaleString()} (Private AC)`,
    operatorOrHighway: highwayCode,
    recommendedTime: bestTime,
    frequency: 'Departures every 15–30 mins from central terminals',
    notes: `${expresswayToll}. Multiple highway service areas available.`,
    steps: [
      {
        instruction: `Start from ${origin.name} (${origin.district})`,
        detail: `Head toward major arterial corridor from ${origin.tagline}`,
        iconType: 'start',
      },
      {
        instruction: `Connect to ${highwayCode}`,
        detail: `Smooth cruising along designated national highway corridor`,
        distanceKm: Math.round(roadDistanceKm * 0.7),
        iconType: 'highway',
      },
      {
        instruction: `Arrive at ${dest.name}, ${dest.district?.name || 'Bangladesh'}`,
        detail: `Local transit or rickshaw/CNG auto to landmark entrance`,
        iconType: 'destination',
      },
    ],
  });

  // 2. RAILWAY MODE (If destination is connected to BR network)
  const hasRail = dest.transportationGuide?.train !== undefined || roadDistanceKm > 60;
  if (hasRail) {
    const trainHours = Math.floor((roadDistanceKm / 48) * 60 / 60);
    const trainMins = Math.round(((roadDistanceKm / 48) * 60) % 60);
    const trainDuration = `${trainHours}h ${trainMins}m`;

    modes.push({
      mode: 'rail',
      label: 'Bangladesh Railway',
      iconName: 'train',
      durationText: trainDuration,
      estimatedCost: `BDT ${Math.round(roadDistanceKm * 1.4)} (Shovon) – BDT ${Math.round(roadDistanceKm * 3.2)} (Snigdha AC)`,
      operatorOrHighway: 'Bangladesh Railway Intercity Express',
      recommendedTime: 'Advance booking via eticket.railway.gov.bd',
      frequency: '3–6 daily intercity departures',
      notes: dest.transportationGuide?.train || `Connects through major division rail junction to ${dest.name}.`,
      steps: [
        {
          instruction: `Board intercity train from ${origin.name} Railway Station`,
          detail: `Depart from primary railway hub`,
          iconType: 'start',
        },
        {
          instruction: `Scenic rail journey across green delta plains`,
          detail: `Comfortable air-conditioned intercity carriages with onboard pantry`,
          iconType: 'rail',
        },
        {
          instruction: `Alight at destination rail station and transfer to ${dest.name}`,
          detail: `Short local transfer to final archaeological/heritage site`,
          iconType: 'destination',
        },
      ],
    });
  }

  // 3. AIR MODE (For distant destinations like Cox's Bazar, Sylhet, Saidpur, Rajshahi)
  const isAirEligible =
    roadDistanceKm > 200 &&
    (dest.transportationGuide?.air !== undefined ||
      dest.division?.slug === 'chittagong' ||
      dest.division?.slug === 'sylhet' ||
      dest.division?.slug === 'rangpur');

  if (isAirEligible) {
    modes.push({
      mode: 'air',
      label: 'Domestic Flight',
      iconName: 'plane',
      durationText: '45m flight (+ 1h transfer)',
      estimatedCost: 'BDT 3,800 – 6,500 (One-way)',
      operatorOrHighway: 'Biman Bangladesh / US-Bangla / Air Astra',
      recommendedTime: 'Arrive at domestic terminal 1 hour prior to departure',
      frequency: 'Multiple daily scheduled flights',
      notes: dest.transportationGuide?.air || `Daily flights connecting from Dhaka Hazrat Shahjalal International Airport (DAC).`,
      steps: [
        {
          instruction: `Depart from Hazrat Shahjalal Domestic Terminal`,
          detail: `Check in 60 mins before scheduled flight`,
          iconType: 'flight',
        },
        {
          instruction: `Flight over delta waterways to regional airport`,
          detail: `Panoramic aerial view of the Brahmaputra and Bay of Bengal`,
          iconType: 'flight',
        },
        {
          instruction: `Airport taxi or shuttle directly to ${dest.name}`,
          detail: `Comfortable air-conditioned transit to destination`,
          iconType: 'destination',
        },
      ],
    });
  }

  // 4. WATERWAY / LAUNCH MODE (For Southern delta & riverine destinations)
  const isWaterEligible =
    dest.division?.slug === 'barisal' ||
    dest.division?.slug === 'khulna' ||
    dest.categoryType === 'NATURE' ||
    dest.transportationGuide?.water !== undefined;

  if (isWaterEligible) {
    modes.push({
      mode: 'water',
      label: 'River Launch / Ferry',
      iconName: 'ship',
      durationText: 'Overnight / 6h – 9h cruise',
      estimatedCost: 'BDT 350 (Deck) – BDT 1,800 (VIP AC Cabin)',
      operatorOrHighway: 'BIWTA Sadarghat Launch Fleet',
      recommendedTime: 'Launches depart Sadarghat Launch Terminal nightly (7:00 PM – 9:00 PM)',
      frequency: 'Nightly passenger launch flotilla',
      notes: dest.transportationGuide?.water || `Traditional double-decker river passenger vessels traversing the Meghna and Padma rivers under starlight.`,
      steps: [
        {
          instruction: `Board night launch at Sadarghat Terminal`,
          detail: `Savor evening breeze along the Buriganga river`,
          iconType: 'water',
        },
        {
          instruction: `Cruising through broad moonlit river channels`,
          detail: `Authentic Bengali riverine culinary experience on board`,
          iconType: 'water',
        },
        {
          instruction: `Morning disembarkation and scenic arrival at ${dest.name}`,
          detail: `Early morning mist over delta waters`,
          iconType: 'destination',
        },
      ],
    });
  }

  return {
    origin,
    destination: dest,
    straightDistanceKm,
    roadDistanceKm,
    roadDurationMinutes,
    roadDurationText,
    coordinates,
    modes,
  };
}
