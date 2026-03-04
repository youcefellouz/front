import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayoutComponent implements OnInit {
  pageTitle: string = 'Tableau de bord';
  adminName: string = 'Admin';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updatePageTitle(event.urlAfterRedirects);
      });
    
    const user = this.authService.getCurrentUser();
    if (user) {
      this.adminName = user.name;
    }
  }

  updatePageTitle(url: string): void {
    const titles: {[key: string]: string} = {
      '/admin/dashboard': 'Tableau de bord',
      '/admin/products': 'Gestion des produits',
      '/admin/orders': 'Gestion des commandes',
      '/admin/users': 'Gestion des utilisateurs',
      '/admin/categories': 'Gestion des catégories',
      '/admin/brands': 'Gestion des marques'
    };
    this.pageTitle = titles[url] || 'Administration';
  }

  toggleSidebar(): void {
    const sidebar = document.querySelector('.admin-sidebar');
    sidebar?.classList.toggle('active');
  }

  logout(): void {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}