import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Article[] = [];
  private wishlistSubject = new BehaviorSubject<Article[]>(this.wishlist);
  wishlist$ = this.wishlistSubject.asObservable();

  constructor() {
    this.loadWishlist();
  }

  // Ajouter à la wishlist
  addToWishlist(article: Article): void {
    if (!this.isInWishlist(article.id)) {
      this.wishlist.push(article);
      this.updateWishlist();
    }
  }

  // Supprimer de la wishlist
  removeFromWishlist(articleId: number): void {
    this.wishlist = this.wishlist.filter(item => item.id !== articleId);
    this.updateWishlist();
  }

  // Vérifier si un produit est dans la wishlist
  isInWishlist(articleId: number): boolean {
    return this.wishlist.some(item => item.id === articleId);
  }

  // Ajouter ou supprimer (toggle)
  toggleWishlist(article: Article): void {
    if (this.isInWishlist(article.id)) {
      this.removeFromWishlist(article.id);
    } else {
      this.addToWishlist(article);
    }
  }

  // Obtenir le nombre d'articles
  getCount(): number {
    return this.wishlist.length;
  }

  // Obtenir toute la wishlist
  getWishlist(): Article[] {
    return this.wishlist;
  }

  // Vider la wishlist
  clearWishlist(): void {
    this.wishlist = [];
    this.updateWishlist();
  }

  // Mettre à jour la wishlist
  private updateWishlist(): void {
    this.wishlistSubject.next([...this.wishlist]);
    this.saveWishlist();
  }

  // Sauvegarder dans localStorage
  private saveWishlist(): void {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  // Charger depuis localStorage
  private loadWishlist(): void {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      this.wishlist = JSON.parse(saved);
      this.wishlistSubject.next(this.wishlist);
    }
  }
}