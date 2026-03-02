// src/app/models/cart.model.ts
import { Article } from './article.model';

export interface CartItem {
  article: Article;
  quantite: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}