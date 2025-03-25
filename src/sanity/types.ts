export interface SanityImage {
  asset: {
    url: string;
  };
}

export interface Category {
  _id: string;
  title: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: SanityImage;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  image: SanityImage;
} 