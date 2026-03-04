// src/app/pages/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { RepairRequestService } from '../../services/repair-request.service';
import { User } from '../../models/user.model';
import { Article } from '../../models/article.model';
import { RepairRequest, RepairRequestCreate } from '../../models/repair-request.model';

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

  // Repair Requests
  repairRequests: RepairRequest[] = [];
  myProducts: Article[] = [];
  showRepairForm: boolean = false;
  
  repairData: RepairRequestCreate = {
    article_id: 0,
    description: ''
  };

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private repairRequestService: RepairRequestService,
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
    this.loadRepairRequests();
    this.loadUserProducts();
  }

  updateProfile(): void {
    this.isSaving = true;
    // TODO: Implement API call to update profile
    setTimeout(() => {
      this.isSaving = false;
      alert('Profil mis à jour avec succès!');
    }, 1000);
  }

  // Repair Requests Methods
  loadRepairRequests(): void {
    this.repairRequestService.getUserRepairRequests().subscribe({
      next: (requests) => {
        this.repairRequests = requests;
      },
      error: (error) => {
        console.error('Error loading repair requests', error);
      }
    });
  }

  loadUserProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.myProducts = products.slice(0, 10);
      }
    });
  }

  submitRepairRequest(): void {
    if (!this.repairData.article_id || !this.repairData.description) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    this.repairRequestService.createRepairRequest(this.repairData).subscribe({
      next: (request) => {
        this.repairRequests.unshift(request);
        this.repairData.description = '';
        this.repairData.article_id = 0;
        this.showRepairForm = false;
        alert('Demande envoyée avec succès!');
      },
      error: (error) => {
        alert(error.error?.message || 'Erreur lors de l\'envoi');
      }
    });
  }

  deleteRepairRequest(id: number): void {
    if (confirm('Annuler cette demande de réparation?')) {
      this.repairRequestService.deleteRepairRequest(id).subscribe({
        next: () => {
          this.repairRequests = this.repairRequests.filter(r => r.id !== id);
        },
        error: (error) => {
          alert('Erreur lors de l\'annulation');
        }
      });
    }
  }

  getStatusText(status: string): string {
    const map: {[key: string]: string} = {
      'pending': 'En attente',
      'in_progress': 'En cours',
      'completed': 'Terminé',
      'cancelled': 'Annulé'
    };
    return map[status] || status;
  }

  getStatusClass(status: string): string {
    const map: {[key: string]: string} = {
      'pending': 'status-pending',
      'in_progress': 'status-progress',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };
    return map[status] || '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}