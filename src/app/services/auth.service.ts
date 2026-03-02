// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, LoginRequest, RegisterRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  constructor(private http: HttpClient) {}

  // 🔐 تسجيل الدخول
  login(credentials: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // حفظ الـ Token والمستخدم
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.userKey, JSON.stringify(response.user));
        }
      }),
      catchError(this.handleError)
    );
  }

  // 📝 إنشاء حساب جديد
  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.userKey, JSON.stringify(response.user));
        }
      }),
      catchError(this.handleError)
    );
  }

  // 🚪 تسجيل الخروج
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    // اختياري: إرسال طلب للـ Backend لإلغاء الـ Token
    // this.http.post(`${this.apiUrl}/logout`, {}).subscribe();
  }

  // ✅ التحقق مما إذا كان المستخدم مسجل دخول
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // 👤 الحصول على بيانات المستخدم الحالي
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  // 🔑 الحصول على الـ Token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // ❌ معالجة الأخطاء
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}