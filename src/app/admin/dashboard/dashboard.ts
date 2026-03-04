import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { Order } from '../../models/order.model';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  };

  recentOrders: Order[] = [];
  topProducts: Article[] = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadRecentOrders();
    this.loadTopProducts();
  }

  loadStats(): void {
    // TODO: Implement API calls to get real stats
    this.stats = {
      totalProducts: 150,
      totalOrders: 48,
      totalUsers: 235,
      totalRevenue: 1250000
    };
  }

  loadRecentOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.recentOrders = orders.slice(0, 5);
      },
      error: (error) => {
        console.error('Error loading orders', error);
      }
    });
  }

  loadTopProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.topProducts = products.slice(0, 5);
      },
      error: (error) => {
        console.error('Error loading products', error);
      }
    });
  }

  getStatusText(status: string): string {
    const statusMap: {[key: string]: string} = {
      'pending': 'En attente',
      'confirmed': 'Confirmée',
      'shipped': 'Expédiée',
      'delivered': 'Livrée',
      'cancelled': 'Annulée'
    };
    return statusMap[status] || status;
  }
}