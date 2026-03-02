// src/app/pages/register/register.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerData: RegisterRequest = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    telephone: '',
    adresse: ''
  };
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  passwordsMatch: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.passwordsMatch = true;

    // التحقق من تطابق كلمات المرور
    if (this.registerData.password !== this.registerData.password_confirmation) {
      this.passwordsMatch = false;
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.isLoading = true;

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.successMessage = 'Compte créé avec succès! Redirection...';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        console.error('Registration error', error);
        this.errorMessage = error.error?.message || 'Une erreur est survenue lors de la création du compte.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}