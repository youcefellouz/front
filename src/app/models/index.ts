// src/app/models/index.ts
export * from './article.model';
export * from './user.model';
export * from './order.model';
export * from './cart.model';

// موديلات إضافية (سنكملها لاحقاً)
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}