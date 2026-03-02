// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // ⭐ مهم
import { authInterceptor } from './interceptors/auth.interceptor'; // ⭐ استيراد الـ interceptor

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // ⭐ تسجيل الـ HttpClient مع الـ Interceptor
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};