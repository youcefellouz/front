// src/app/services/review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Review, ReviewRequest } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getReviews(articleId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/articles/${articleId}/reviews`);
  }

  addReview(reviewData: ReviewRequest): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/reviews`, reviewData);
  }

  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/reviews/${reviewId}`);
  }

  getAverageRating(articleId: number): Observable<{ average: number; count: number }> {
    return this.http.get<{ average: number; count: number }>(
      `${this.apiUrl}/articles/${articleId}/reviews/average`
    );
  }
}