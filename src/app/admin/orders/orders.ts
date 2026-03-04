import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (error) => {
        console.error('Error loading orders', error);
      }
    });
  }

  updateStatus(order: Order): void {
    this.orderService.updateOrderStatus(order.id, order.status).subscribe({
      next: () => {
        alert('Statut mis à jour avec succès');
      },
      error: (error) => {
        alert('Erreur lors de la mise à jour');
      }
    });
  }

  viewOrder(order: Order): void {
    console.log('View order', order);
    // TODO: Open order details modal
  }
}