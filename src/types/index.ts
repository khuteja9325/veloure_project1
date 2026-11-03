export type ScentFamily = 
  | 'Woody' 
  | 'Amber' 
  | 'Floral' 
  | 'Citrus' 
  | 'Fresh' 
  | 'Gourmand' 
  | 'Aquatic' 
  | 'Spicy';

export type FragranceMood = 
  | 'Romantic' 
  | 'Confident' 
  | 'Calm' 
  | 'Mysterious' 
  | 'Energetic' 
  | 'Elegant';

export type FragranceSeason = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export type FragranceOccasion = 
  | 'Everyday' 
  | 'Evening' 
  | 'Romantic' 
  | 'Office' 
  | 'Wedding' 
  | 'Vacation' 
  | 'Night Out' 
  | 'Black Tie';

export interface FragranceReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

export interface Fragrance {
  id: string;
  brand: string;
  name: string;
  tagline: string;
  price: number; // base 50ml price
  rating: number;
  reviewCount: number;
  image: string;
  scentFamily: ScentFamily;
  secondaryFamily?: ScentFamily;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  longevity: 'Moderate (6h)' | 'Long Lasting (8-10h)' | 'Eternal (12h+)';
  projection: 'Intimate' | 'Moderate' | 'Strong' | 'Enormous';
  sillage: 'Soft' | 'Moderate' | 'Heavy';
  season: FragranceSeason[];
  occasion: FragranceOccasion[];
  moods: FragranceMood[];
  description: string;
  story: string;
  gender: 'Unisex' | 'Feminine-leaning' | 'Masculine-leaning';
  sizes: { [size: string]: number };
  isNewArrival?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string; // unique item instance id
  fragranceId: string;
  fragrance: Fragrance;
  size: string;
  price: number;
  quantity: number;
}

export interface WishlistItem {
  fragranceId: string;
  category: 'Favorites' | 'Date Night' | 'Summer' | 'Gift Ideas';
  addedAt: string;
}

export interface ScentProfile {
  id: string;
  createdDate: string;
  dominantFamilies: { family: ScentFamily; percentage: number }[];
  favoriteNotes: string[];
  personality: string;
  preferredLongevity: string;
  preferredProjection: string;
  idealOccasions: string[];
  idealSeasons: string[];
  vibe: string;
  recommendedFragranceIds: string[];
}

export interface LayeringCombo {
  id: string;
  scent1Id: string;
  scent2Id: string;
  date: string;
  name: string;
  score: number;
  resultingProfile: string;
  description: string;
  bestOccasion: string;
  bestSeason: string;
}

export interface DiscoveryBoxItem {
  id: string;
  selectedFragranceIds: string[]; // exactly 5
  boxColor: 'Obsidian Noir' | 'Velvet Gold' | 'Alabaster Ivory';
  giftMessage?: string;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  giftWrapping: boolean;
  total: number;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  deliveryMethod: string;
  status: 'Confirmed' | 'In Preparation' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}
