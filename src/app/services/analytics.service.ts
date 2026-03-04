// src/app/services/analytics.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Recommendation, Prediction, StockAlert, SalesReport } from '../models/analytics.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Recommendations
  getSimilarRecommendations(articleId: number): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(
      `${this.apiUrl}/analytics/recommendations/similar/${articleId}`
    );
  }

  getTrendingRecommendations(): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(
      `${this.apiUrl}/analytics/recommendations/trending`
    );
  }

  getPersonalizedRecommendations(): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(
      `${this.apiUrl}/analytics/recommendations/products`
    );
  }

  // Predictions
  getSalesPredictions(): Observable<Prediction[]> {
    return this.http.get<Prediction[]>(`${this.apiUrl}/analytics/predictions`);
  }

  generatePredictions(): Observable<Prediction[]> {
    return this.http.post<Prediction[]>(`${this.apiUrl}/analytics/predictions`, {});
  }

  getDetailedForecast(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/analytics/forecast/detailed`);
  }

  getForecastAccuracy(): Observable<{ accuracy: number; metrics: any }> {
    return this.http.get<{ accuracy: number; metrics: any }>(
      `${this.apiUrl}/analytics/forecast/accuracy`
    );
  }

  // Alerts
  getStockAlerts(): Observable<StockAlert[]> {
    return this.http.get<StockAlert[]>(`${this.apiUrl}/analytics/alerts`);
  }

  markAlertAsRead(alertId: number): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/analytics/alerts/${alertId}/read`,
      {}
    );
  }

  resolveAlert(alertId: number): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/analytics/alerts/${alertId}/resolve`,
      {}
    );
  }

  // Reports
  getSalesReport(period: string = 'monthly'): Observable<SalesReport> {
    return this.http.get<SalesReport>(
      `${this.apiUrl}/analytics/reports/sales?period=${period}`
    );
  }

  getTopProducts(limit: number = 10): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/analytics/products/top?limit=${limit}`
    );
  }

  getTopCustomers(limit: number = 10): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/analytics/customers/top?limit=${limit}`
    );
  }
}