export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  featured?: boolean;
  flavors?: string[];
  longDescription?: string;
  ingredients?: string;
  nutritionalInfo?: {
    label: string;
    value: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedFlavor?: string;
}

export interface HeroSectionData {
  type: 'hero';
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}

export interface CategoriesSectionData {
  type: 'categories';
  title: string;
  items: string[];
}

export interface FeaturedProductsSectionData {
  type: 'featured-products';
  title: string;
  subtitle?: string;
  count: number;
}

export interface BenefitsSectionData {
  type: 'benefits';
  items: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export type CMSSection = HeroSectionData | CategoriesSectionData | FeaturedProductsSectionData | BenefitsSectionData;

export interface HomeContent {
  sections: CMSSection[];
}