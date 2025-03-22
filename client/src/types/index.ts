export interface Offer {
  id: number;
  title: string;
  company: Company;
  price: number;
  originalPrice?: number;
  discount?: number;
  internet: {
    amount: number;
    unit: string;
  };
  minutes: {
    amount: number;
    description: string;
  };
  messages: {
    amount: number;
  };
  validity: number;
  code: string;
  tag?: string;
  features?: Feature[];
  isPopular?: boolean;
  isLimited?: boolean;
}

export interface Company {
  id: number;
  name: string;
  nameAr: string;
  logo?: string;
  color: string;
}

export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface ExtendedOffer extends Offer {
  rating?: number;
  subscribers?: number;
  additionalFeatures?: AdditionalFeature[];
  termsAndConditions?: string[];
}

export interface AdditionalFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export type OfferType = 'all' | 'internet' | 'calls' | 'combo' | 'special';
export type PriceRange = 'all' | 'under50' | '50to100' | '100to200' | 'over200';
export type SortOption = 'popular' | 'priceAsc' | 'priceDesc' | 'newest';
export type ViewMode = 'grid' | 'list';

export interface FilterOptions {
  company: string;
  offerType: OfferType;
  priceRange: PriceRange;
  sortBy: SortOption;
  searchQuery: string;
}
