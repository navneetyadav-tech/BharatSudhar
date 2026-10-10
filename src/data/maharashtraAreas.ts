export interface MaharashtraArea {
  id: string;
  name: string;
  city: 'Mumbai' | 'Pune' | 'Thane' | 'Navi Mumbai' | 'Nagpur' | 'Nashik' | 'Chhatrapati Sambhajinagar' | 'Kolhapur' | 'Solapur';
  ward: string;
  pincode: string;
  lat: number;
  lng: number;
  displayAddress: string;
}

export const MAHARASHTRA_CITIES = [
  'All Maharashtra',
  'Mumbai',
  'Pune',
  'Thane',
  'Navi Mumbai',
  'Nagpur',
  'Nashik',
  'Chhatrapati Sambhajinagar',
  'Kolhapur',
  'Solapur',
] as const;

export const MAHARASHTRA_AREAS: MaharashtraArea[] = [
  // ==================== MUMBAI (BMC) ====================
  {
    id: 'mum-bandra-w',
    name: 'Bandra West (Hill Road & Linking Road)',
    city: 'Mumbai',
    ward: 'BMC H-West Ward',
    pincode: '400050',
    lat: 19.0596,
    lng: 72.8295,
    displayAddress: 'Bandra West, Mumbai, Maharashtra (BMC H-West Ward - 400050)',
  },
  {
    id: 'mum-andheri-w',
    name: 'Andheri West (Lokhandwala & Oshiwara)',
    city: 'Mumbai',
    ward: 'BMC K-West Ward',
    pincode: '400053',
    lat: 19.1363,
    lng: 72.8277,
    displayAddress: 'Andheri West, Lokhandwala, Mumbai, Maharashtra (BMC K-West Ward - 400053)',
  },
  {
    id: 'mum-andheri-e',
    name: 'Andheri East (MIDC & Chakala Metro)',
    city: 'Mumbai',
    ward: 'BMC K-East Ward',
    pincode: '400093',
    lat: 19.1176,
    lng: 72.8631,
    displayAddress: 'Andheri East, MIDC, Mumbai, Maharashtra (BMC K-East Ward - 400093)',
  },
  {
    id: 'mum-dadar-w',
    name: 'Dadar West (Shivaji Park & Gokhale Road)',
    city: 'Mumbai',
    ward: 'BMC G-North Ward',
    pincode: '400028',
    lat: 19.0282,
    lng: 72.8397,
    displayAddress: 'Dadar West, Shivaji Park, Mumbai, Maharashtra (BMC G-North Ward - 400028)',
  },
  {
    id: 'mum-colaba',
    name: 'Colaba & Fort (South Mumbai Heritage Zone)',
    city: 'Mumbai',
    ward: 'BMC A Ward',
    pincode: '400005',
    lat: 18.9220,
    lng: 72.8347,
    displayAddress: 'Colaba & Fort, South Mumbai, Maharashtra (BMC A Ward - 400005)',
  },
  {
    id: 'mum-juhu',
    name: 'Juhu Beach & Vile Parle West',
    city: 'Mumbai',
    ward: 'BMC K-West Ward',
    pincode: '400049',
    lat: 19.1075,
    lng: 72.8263,
    displayAddress: 'Juhu & Vile Parle West, Mumbai, Maharashtra (BMC K-West Ward - 400049)',
  },
  {
    id: 'mum-borivali-w',
    name: 'Borivali West (IC Colony & Shimpoli)',
    city: 'Mumbai',
    ward: 'BMC R-Central Ward',
    pincode: '400103',
    lat: 19.2307,
    lng: 72.8567,
    displayAddress: 'Borivali West, IC Colony, Mumbai, Maharashtra (BMC R-Central Ward - 400103)',
  },
  {
    id: 'mum-powai',
    name: 'Powai (Hiranandani Gardens & IIT Bombay)',
    city: 'Mumbai',
    ward: 'BMC S Ward',
    pincode: '400076',
    lat: 19.1176,
    lng: 72.9060,
    displayAddress: 'Powai, Hiranandani, Mumbai, Maharashtra (BMC S Ward - 400076)',
  },
  {
    id: 'mum-ghatkopar-e',
    name: 'Ghatkopar East (Tilak Road & Station Area)',
    city: 'Mumbai',
    ward: 'BMC N Ward',
    pincode: '400077',
    lat: 19.0860,
    lng: 72.9090,
    displayAddress: 'Ghatkopar East, Mumbai, Maharashtra (BMC N Ward - 400077)',
  },
  {
    id: 'mum-chembur',
    name: 'Chembur East (Diamond Garden & RC Marg)',
    city: 'Mumbai',
    ward: 'BMC M-West Ward',
    pincode: '400071',
    lat: 19.0522,
    lng: 72.8994,
    displayAddress: 'Chembur East, Mumbai, Maharashtra (BMC M-West Ward - 400071)',
  },
  {
    id: 'mum-lower-parel',
    name: 'Lower Parel & Worli (Senapati Bapat Marg)',
    city: 'Mumbai',
    ward: 'BMC G-South Ward',
    pincode: '400013',
    lat: 19.0130,
    lng: 72.8315,
    displayAddress: 'Lower Parel & Worli, Mumbai, Maharashtra (BMC G-South Ward - 400013)',
  },

  // ==================== PUNE (PMC / PCMC) ====================
  {
    id: 'pun-shivaji-nagar',
    name: 'Shivaji Nagar (FC Road & JM Road)',
    city: 'Pune',
    ward: 'PMC Ward 7 (Ghole Road)',
    pincode: '411005',
    lat: 18.5314,
    lng: 73.8446,
    displayAddress: 'Shivaji Nagar, FC Road, Pune, Maharashtra (PMC Ward 7 - 411005)',
  },
  {
    id: 'pun-kothrud',
    name: 'Kothrud (Paud Road & DP Road)',
    city: 'Pune',
    ward: 'PMC Ward 12 (Kothrud Ward)',
    pincode: '411038',
    lat: 18.5074,
    lng: 73.8077,
    displayAddress: 'Kothrud, Paud Road, Pune, Maharashtra (PMC Ward 12 - 411038)',
  },
  {
    id: 'pun-baner',
    name: 'Baner & Balewadi High Street',
    city: 'Pune',
    ward: 'PMC Ward 9 (Aundh-Baner)',
    pincode: '411045',
    lat: 18.5590,
    lng: 73.7868,
    displayAddress: 'Baner & Balewadi, Pune, Maharashtra (PMC Ward 9 - 411045)',
  },
  {
    id: 'pun-viman-nagar',
    name: 'Viman Nagar (Symbiosis & Datta Mandir Chowk)',
    city: 'Pune',
    ward: 'PMC Ward 3 (Nagar Road)',
    pincode: '411014',
    lat: 18.5679,
    lng: 73.9143,
    displayAddress: 'Viman Nagar, Pune, Maharashtra (PMC Ward 3 - 411014)',
  },
  {
    id: 'pun-hinjawadi',
    name: 'Hinjawadi Infotech Park (Phase 1, 2, 3)',
    city: 'Pune',
    ward: 'PMRDA Special Planning Zone',
    pincode: '411057',
    lat: 18.5913,
    lng: 73.7389,
    displayAddress: 'Hinjawadi IT Park, Pune, Maharashtra (PMRDA Area - 411057)',
  },
  {
    id: 'pun-hadapsar',
    name: 'Hadapsar & Magarpatta Cybercity',
    city: 'Pune',
    ward: 'PMC Ward 19 (Hadapsar)',
    pincode: '411028',
    lat: 18.5089,
    lng: 73.9259,
    displayAddress: 'Hadapsar, Magarpatta, Pune, Maharashtra (PMC Ward 19 - 411028)',
  },
  {
    id: 'pun-wakad',
    name: 'Wakad & Hinjawadi Link Road',
    city: 'Pune',
    ward: 'PCMC Zone B',
    pincode: '411057',
    lat: 18.5987,
    lng: 73.7688,
    displayAddress: 'Wakad, Pimpri-Chinchwad, Pune, Maharashtra (PCMC - 411057)',
  },
  {
    id: 'pun-koregaon-park',
    name: 'Koregaon Park (North Main Road)',
    city: 'Pune',
    ward: 'PMC Ward 21 (Dhole Patil Road)',
    pincode: '411001',
    lat: 18.5362,
    lng: 73.8940,
    displayAddress: 'Koregaon Park, Pune, Maharashtra (PMC Ward 21 - 411001)',
  },
  {
    id: 'pun-pimpri',
    name: 'Pimpri & Chinchwad Station Area',
    city: 'Pune',
    ward: 'PCMC Zone A',
    pincode: '411018',
    lat: 18.6298,
    lng: 73.7997,
    displayAddress: 'Pimpri-Chinchwad, Pune, Maharashtra (PCMC Zone A - 411018)',
  },

  // ==================== THANE & NAVI MUMBAI ====================
  {
    id: 'tha-naupada',
    name: 'Naupada & Gokhale Road, Thane',
    city: 'Thane',
    ward: 'TMC Naupada Ward Div 1',
    pincode: '400602',
    lat: 19.1868,
    lng: 72.9723,
    displayAddress: 'Naupada, Thane West, Maharashtra (TMC Div 1 - 400602)',
  },
  {
    id: 'tha-ghodbunder',
    name: 'Ghodbunder Road & Majiwada, Thane',
    city: 'Thane',
    ward: 'TMC Majiwada-Manpada Div 3',
    pincode: '400615',
    lat: 19.2396,
    lng: 72.9781,
    displayAddress: 'Ghodbunder Road, Thane West, Maharashtra (TMC Div 3 - 400615)',
  },
  {
    id: 'nvm-vashi',
    name: 'Vashi (Sector 17 & Palm Beach Road)',
    city: 'Navi Mumbai',
    ward: 'NMMC Zone 1 (Vashi Ward)',
    pincode: '400703',
    lat: 19.0771,
    lng: 72.9986,
    displayAddress: 'Vashi Sector 17, Navi Mumbai, Maharashtra (NMMC - 400703)',
  },
  {
    id: 'nvm-nerul',
    name: 'Nerul & Seawoods Grand Central',
    city: 'Navi Mumbai',
    ward: 'NMMC Zone 2 (Nerul Ward)',
    pincode: '400706',
    lat: 19.0256,
    lng: 73.0166,
    displayAddress: 'Nerul & Seawoods, Navi Mumbai, Maharashtra (NMMC - 400706)',
  },
  {
    id: 'nvm-kharghar',
    name: 'Kharghar (Utsav Chowk & Central Park)',
    city: 'Navi Mumbai',
    ward: 'Panvel Municipal Corporation Ward 4',
    pincode: '410210',
    lat: 19.0473,
    lng: 73.0699,
    displayAddress: 'Kharghar, Navi Mumbai, Maharashtra (Panvel PMC - 410210)',
  },

  // ==================== NAGPUR (NMC) ====================
  {
    id: 'nag-dharampeth',
    name: 'Dharampeth & Ramdaspeth',
    city: 'Nagpur',
    ward: 'NMC Dharampeth Zone 2',
    pincode: '440010',
    lat: 21.1458,
    lng: 79.0658,
    displayAddress: 'Dharampeth, Nagpur, Maharashtra (NMC Zone 2 - 440010)',
  },
  {
    id: 'nag-sadar',
    name: 'Sadar & Civil Lines (Residency Road)',
    city: 'Nagpur',
    ward: 'NMC Mangalwari Zone 10',
    pincode: '440001',
    lat: 21.1610,
    lng: 79.0818,
    displayAddress: 'Sadar & Civil Lines, Nagpur, Maharashtra (NMC Zone 10 - 440001)',
  },
  {
    id: 'nag-sitabuldi',
    name: 'Sitabuldi & Mahal (Central Market)',
    city: 'Nagpur',
    ward: 'NMC Dhantoli Zone 4',
    pincode: '440012',
    lat: 21.1466,
    lng: 79.0882,
    displayAddress: 'Sitabuldi, Nagpur, Maharashtra (NMC Zone 4 - 440012)',
  },

  // ==================== NASHIK (NMC) ====================
  {
    id: 'nas-college-rd',
    name: 'College Road & Gangapur Road',
    city: 'Nashik',
    ward: 'NMC West Division Ward 6',
    pincode: '422005',
    lat: 20.0063,
    lng: 73.7628,
    displayAddress: 'College Road, Nashik, Maharashtra (NMC West Div - 422005)',
  },
  {
    id: 'nas-panchavati',
    name: 'Panchavati (Godavari Ghats)',
    city: 'Nashik',
    ward: 'NMC Panchavati Division Ward 2',
    pincode: '422003',
    lat: 20.0110,
    lng: 73.7981,
    displayAddress: 'Panchavati, Nashik, Maharashtra (NMC North Div - 422003)',
  },

  // ==================== CHHATRAPATI SAMBHAJINAGAR ====================
  {
    id: 'aur-cidco',
    name: 'CIDCO Cannaught Place & Town Centre',
    city: 'Chhatrapati Sambhajinagar',
    ward: 'CSMC Ward Division 4',
    pincode: '431003',
    lat: 19.8762,
    lng: 75.3433,
    displayAddress: 'CIDCO, Chhatrapati Sambhajinagar, Maharashtra (CSMC Div 4 - 431003)',
  },
  {
    id: 'aur-kranti-chowk',
    name: 'Kranti Chowk & Samarth Nagar',
    city: 'Chhatrapati Sambhajinagar',
    ward: 'CSMC Ward Division 1',
    pincode: '431001',
    lat: 19.8698,
    lng: 75.3214,
    displayAddress: 'Kranti Chowk, Chhatrapati Sambhajinagar, Maharashtra (CSMC Div 1 - 431001)',
  },

  // ==================== KOLHAPUR (KMC) ====================
  {
    id: 'kol-rajarampuri',
    name: 'Rajarampuri & Tarabai Park',
    city: 'Kolhapur',
    ward: 'KMC Ward Division 5',
    pincode: '416008',
    lat: 16.6974,
    lng: 74.2433,
    displayAddress: 'Rajarampuri, Kolhapur, Maharashtra (KMC Ward 5 - 416008)',
  },

  // ==================== SOLAPUR (SMC) ====================
  {
    id: 'sol-saat-rasta',
    name: 'Saat Rasta & Railway Lines',
    city: 'Solapur',
    ward: 'SMC Central Ward Division 3',
    pincode: '413001',
    lat: 17.6599,
    lng: 75.9064,
    displayAddress: 'Saat Rasta, Solapur, Maharashtra (SMC Ward 3 - 413001)',
  },
];

// Helper to filter areas by search query and optional city filter
export function filterMaharashtraAreas(query: string, cityFilter?: string): MaharashtraArea[] {
  const cleanQuery = query.trim().toLowerCase();
  return MAHARASHTRA_AREAS.filter((area) => {
    const matchesCity = !cityFilter || cityFilter === 'All Maharashtra' || area.city === cityFilter;
    if (!matchesCity) return false;
    if (!cleanQuery) return true;

    return (
      area.name.toLowerCase().includes(cleanQuery) ||
      area.city.toLowerCase().includes(cleanQuery) ||
      area.ward.toLowerCase().includes(cleanQuery) ||
      area.pincode.includes(cleanQuery) ||
      area.displayAddress.toLowerCase().includes(cleanQuery)
    );
  });
}

// Find nearest Maharashtra area by coordinates
export function findNearestMaharashtraArea(lat: number, lng: number): MaharashtraArea {
  let closest = MAHARASHTRA_AREAS[0];
  let minDistance = Infinity;

  for (const area of MAHARASHTRA_AREAS) {
    const dLat = area.lat - lat;
    const dLng = area.lng - lng;
    const distSq = dLat * dLat + dLng * dLng;
    if (distSq < minDistance) {
      minDistance = distSq;
      closest = area;
    }
  }

  return closest;
}
