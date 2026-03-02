// src/app/models/user.model.ts

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  is_admin: boolean;
  telephone: string | null;
  adresse: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  telephone?: string;
  adresse?: string;
}