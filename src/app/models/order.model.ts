// src/app/models/order.model.ts
import { Article } from './article.model';
import { User } from './user.model';

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