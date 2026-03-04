// src/app/services/discount.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Discount } from '../models/discount.model';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getActiveDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>(`${this.apiUrl}/discounts`);
  }

  getDiscount(id: number): Observable<Discount> {
    return this.http.get<Discount>(`${this.apiUrl}/discounts/${id}`);
  }

  getArticleDiscounts(articleId: number): Observable<Discount[]> {
    return this.http.get<Discount[]>(`${this.apiUrl}/articles/${articleId}/discounts`);
  }

  calculateDiscountedPrice(originalPrice: number, discountPercent: number): number {
    return originalPrice * (1 - discountPercent / 100);
  }
}