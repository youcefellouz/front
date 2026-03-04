import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  isSaving: boolean = false;
  
  profileData = {
    name: '',
    email: '',
    telephone: '',
    adresse: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.profileData = {
        name: this.user.name,
        email: this.user.email,
        telephone: this.user.telephone || '',
        adresse: this.user.adresse || ''
      };
    }
  }

  updateProfile(): void {
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      alert('Profil mis à jour avec succès!');
    }, 1000);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}