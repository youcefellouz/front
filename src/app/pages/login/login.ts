// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginData: LoginRequest = {
    email: '',
    password: ''
  };
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // إعادة توجيه حسب نوع المستخدم
        if (response.user.is_admin) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Login error', error);
        this.errorMessage = error.error?.message || 'Erreur de connexion. Vérifiez vos identifiants.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}