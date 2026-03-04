import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-orders.html',
  styleUrls: ['./user-orders.css']
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];
  isLoading: boolean = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getUserOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading orders', error);
        this.isLoading = false;
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

  cancelOrder(orderId: number): void {
    if (confirm('Êtes-vous sûr de vouloir annuler cette commande?')) {
      this.orderService.cancelOrder(orderId).subscribe({
        next: () => {
          alert('Commande annulée avec succès');
          this.loadOrders();
        },
        error: (error) => {
          alert('Erreur lors de l\'annulation');
        }
      });
    }
  }
}