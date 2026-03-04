// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = {
    items: [],
    total: 0,
    itemCount: 0
  };

  private cartSubject = new BehaviorSubject<Cart>(this.cart);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  // إضافة منتج للسلة
  addToCart(article: Article, quantity: number = 1): void {
    const existingItem = this.cart.items.find(
      item => item.article.id === article.id
    );

    if (existingItem) {
      existingItem.quantite += quantity;
    } else {
      this.cart.items.push({ article, quantite: quantity });
    }

    this.updateCart();
  }

  // إزالة منتج من السلة
  removeFromCart(articleId: number): void {
    this.cart.items = this.cart.items.filter(
      item => item.article.id !== articleId
    );
    this.updateCart();
  }

  // تحديث الكمية
  updateQuantity(articleId: number, quantity: number): void {
    const item = this.cart.items.find(
      item => item.article.id === articleId
    );

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(articleId);
      } else {
        item.quantite = quantity;
        this.updateCart();
      }
    }
  }

  // تفريغ السلة
  clearCart(): void {
    this.cart = { items: [], total: 0, itemCount: 0 };
    this.updateCart();
  }

  // حساب الإجمالي
  private updateCart(): void {
    this.cart.itemCount = this.cart.items.reduce(
      (count, item) => count + item.quantite,
      0
    );

    this.cart.total = this.cart.items.reduce(
      (total, item) => total + (item.article.prix * item.quantite),
      0
    );

    this.cartSubject.next({ ...this.cart });
    this.saveCart();
  }

  // حفظ السلة في localStorage
  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // تحميل السلة من localStorage
  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.cartSubject.next(this.cart);
    }
  }

  // الحصول على عدد العناصر
  getItemCount(): number {
    return this.cart.itemCount;
  }

  // الحصول على الإجمالي
  getTotal(): number {
    return this.cart.total;
  }
}