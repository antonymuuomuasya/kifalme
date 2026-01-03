
export type WasteType = 'Cartons' | 'PET Plastic' | 'White Paper' | 'Metal Scraps' | 'Glass' | 'Textile';

export interface WasteCategory {
  type: WasteType;
  icon: string;
  color: string;
  rate: number; // KES per KG
  minWeight: number; // Minimum KG for pickup
}

export interface PickupTransaction {
  id: string;
  type: WasteType;
  weight: number;
  earnings: number;
  status: 'Ongoing' | 'Completed' | 'Rejected';
  paymentStatus: 'Escrow' | 'Pending' | 'Paid';
  date: string;
  location: string;
}

export interface SustainabilityTip {
  title: string;
  content: string;
  category: string;
}

export interface CollectionPoint {
  id: string;
  name: string;
  location: string;
  description: string;
  lat: number;
  lng: number;
}

export interface SavedLocation {
  id: string;
  label: string;
  address: string;
  icon: string;
}

export type AppTab = 'home' | 'sell' | 'history' | 'rewards' | 'map';
