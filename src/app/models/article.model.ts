// src/app/models/article.model.ts

export interface Category {
  id: number;
  nom: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: number;
  nom: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: number;
  reference: string;
  designation: string;
  description: string | null;
  prix: number;
  quantite: number;
  image: string | null;
  is_available: boolean;
  category_id: number;
  brand_id: number;
  category?: Category;
  brand?: Brand;
  created_at: string;
  updated_at: string;
}