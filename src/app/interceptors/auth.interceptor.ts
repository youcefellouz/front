// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../app/services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // إذا كان هناك Token، أضفه للـ Header
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return next(cloned);
  }

  // إذا لم يكن هناك Token، أرسل الطلب عادي
  return next(req);
};