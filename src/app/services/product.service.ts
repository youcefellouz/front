// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article, PaginatedResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // جلب كل المنتجات
  getProducts(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articles`);
  }

  // جلب منتج محدد
  getProduct(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/articles/${id}`);
  }

  // جلب المنتجات حسب الفئة
  getProductsByCategory(categoryId: number): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/categories/${categoryId}/articles`);
  }

  // جلب الماركات
  getBrands(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/brands`);
  }

  // جلب التصنيفات
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  // جلب العروض
  getDiscounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/discounts`);
  }
}