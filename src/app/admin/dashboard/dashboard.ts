// src/app/admin/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { AnalyticsService } from '../../services/analytics.service';
import { DiscountService } from '../../services/discount.service';
import { Order } from '../../models/order.model';
import { Article } from '../../models/article.model';
import { Recommendation, StockAlert, SalesReport } from '../../models/analytics.model';
import { Discount } from '../../models/discount.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
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
  
  // Analytics ⭐ جديد
  trendingProducts: Recommendation[] = [];
  stockAlerts: StockAlert[] = [];
  salesReport: SalesReport | null = null;
  activeDiscounts: Discount[] = [];
  selectedPeriod: string = 'monthly';

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private analyticsService: AnalyticsService,
    private discountService: DiscountService
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadRecentOrders();
    this.loadTopProducts();
    this.loadAnalytics();
    this.loadActiveDiscounts();
  }

  loadStats(): void {
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

  // Analytics Methods ⭐ جديد
  loadAnalytics(): void {
    this.analyticsService.getTrendingRecommendations().subscribe({
      next: (products) => {
        this.trendingProducts = products.slice(0, 5);
      }
    });

    this.analyticsService.getStockAlerts().subscribe({
      next: (alerts) => {
        this.stockAlerts = alerts;
      }
    });

    this.analyticsService.getSalesReport(this.selectedPeriod).subscribe({
      next: (report) => {
        this.salesReport = report;
      }
    });
  }

  loadActiveDiscounts(): void {
    this.discountService.getActiveDiscounts().subscribe({
      next: (discounts) => {
        this.activeDiscounts = discounts.filter(d => d.is_active);
      }
    });
  }

  changeReportPeriod(period: string): void {
    this.selectedPeriod = period;
    this.analyticsService.getSalesReport(period).subscribe({
      next: (report) => {
        this.salesReport = report;
      }
    });
  }

  resolveAlert(alertId: number): void {
    this.analyticsService.resolveAlert(alertId).subscribe({
      next: () => {
            this.stockAlerts = this.stockAlerts.filter(a => a.article_id !== alertId);
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

  formatNumber(num: number): string {
    return num.toLocaleString('fr-DZ');
  }

  formatPercent(num: number): string {
    return (num >= 0 ? '+' : '') + num.toFixed(1) + '%';
  }
}