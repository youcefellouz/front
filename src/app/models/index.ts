// src/app/models/index.ts

// Article Model
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

// User Model
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  is_admin: boolean;
  telephone: string | null;
  adresse: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  telephone?: string;
  adresse?: string;
}

// Order Model
export interface OrderItem {
  id: number;
  article_id: number;
  order_id: number;
  quantite: number;
  prix_unitaire: number;
  sous_total: number;
  article?: Article;
}

export interface Order {
  id: number;
  user_id: number;
  reference: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  adresse_livraison: string;
  telephone_livraison: string;
  created_at: string;
  updated_at: string;
  user?: User;
  items?: OrderItem[];
}

// Cart Model
export interface CartItem {
  article: Article;
  quantite: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Review Model ⭐ جديد
export interface Review {
  id: number;
  user_id: number;
  article_id: number;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
  };
}

export interface ReviewRequest {
  article_id: number;
  rating: number;
  comment: string;
}

// Repair Request Model ⭐ جديد
export interface RepairRequest {
  id: number;
  user_id: number;
  article_id: number;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  article?: {
    id: number;
    designation: string;
    reference: string;
  };
}

export interface RepairRequestCreate {
  article_id: number;
  description: string;
}

// Discount Model ⭐ جديد
export interface Discount {
  id: number;
  nom: string;
  description: string | null;
  pourcentage: number;
  date_debut: string;
  date_fin: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Analytics Models ⭐ جديد
export interface Recommendation {
  article_id: number;
  designation: string;
  prix: number;
  score: number;
  reason: string;
  image?: string;
}

export interface Prediction {
  period: string;
  predicted_sales: number;
  confidence: number;
  top_products: Array<{
    article_id: number;
    designation: string;
    predicted_quantity: number;
  }>;
}

export interface StockAlert {
  article_id: number;
  designation: string;
  quantite: number;
  seuil_alerte: number;
  status: 'warning' | 'critical';
}

export interface SalesReport {
  period: string;
  total_revenue: number;
  total_orders: number;
  average_order_value: number;
  growth_percentage: number;
}

// API Response Interfaces
export interface ApiResponse<T> {
   data : T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}