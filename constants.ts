
import { WasteCategory, PickupTransaction, CollectionPoint, SavedLocation } from './types';

export const COLORS = {
  primary: '#065f46',
  secondary: '#64748b',
  accent: '#10b981',
  background: '#f8fafc',
};

export const WASTE_CATEGORIES: WasteCategory[] = [
  { type: 'Cartons', icon: '📦', color: 'bg-orange-100 text-orange-700', rate: 10, minWeight: 50 },
  { type: 'PET Plastic', icon: '🥤', color: 'bg-blue-100 text-blue-700', rate: 20, minWeight: 20 },
  { type: 'White Paper', icon: '📄', color: 'bg-slate-100 text-slate-700', rate: 15, minWeight: 30 },
  { type: 'Metal Scraps', icon: '🔩', color: 'bg-slate-200 text-slate-700', rate: 30, minWeight: 100 },
  { type: 'Glass', icon: '🍶', color: 'bg-emerald-100 text-emerald-700', rate: 5, minWeight: 40 },
  { type: 'Textile', icon: '👕', color: 'bg-purple-100 text-purple-700', rate: 12, minWeight: 25 },
];

export const SAVED_LOCATIONS: SavedLocation[] = [
  { id: 'loc-1', label: 'Home', address: 'Plot 42, Syokimau Estate', icon: '🏠' },
  { id: 'loc-2', label: 'Office', address: 'Delta Towers, Athi River', icon: '🏢' },
  { id: 'loc-3', label: 'Warehouse', address: 'Mlolongo Sector 4', icon: '🏭' },
];

export const MOCK_TRANSACTIONS: PickupTransaction[] = [
  { id: 'KFM-V32P0P', type: 'Glass', weight: 450, earnings: 2250, status: 'Completed', paymentStatus: 'Paid', date: '2023-10-24', location: 'Athi River' },
  { id: 'KFM-TX102', type: 'Cartons', weight: 60, earnings: 600, status: 'Ongoing', paymentStatus: 'Escrow', date: '2023-10-26', location: 'Machakos' },
  { id: 'KFM-TX103', type: 'Metal Scraps', weight: 120, earnings: 3600, status: 'Completed', paymentStatus: 'Pending', date: '2023-10-20', location: 'Mlolongo' },
];

export const MOCK_COLLECTION_POINTS: CollectionPoint[] = [
  { 
    id: 'CP-1', 
    name: 'Athi River Hub', 
    location: 'Athi River Industrial Area', 
    description: 'Central hub for bulk industrial recyclables.', 
    lat: -0.2, 
    lng: 0.1 
  },
  { 
    id: 'CP-2', 
    name: 'Mlolongo Point', 
    location: 'Mombasa Road, Mlolongo', 
    description: 'Convenient residential collection point.', 
    lat: 0.2, 
    lng: -0.3 
  },
  { 
    id: 'CP-3', 
    name: 'Machakos Hub', 
    location: 'Machakos Town Centre', 
    description: 'Community drop-off for small households.', 
    lat: -0.4, 
    lng: 0.4 
  },
];

export const IMPACT_STATS = {
  tonnesRecycled: 12.5,
  carbonSaved: 4.8,
  ecoPoints: 1250,
  pickupsCompleted: 45,
  totalEarnings: 15450,
};
