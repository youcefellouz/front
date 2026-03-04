import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-success.html',
  styleUrls: ['./order-success.css']
})
export class OrderSuccessComponent implements OnInit {
  orderReference: string = '';
  orderDate: Date = new Date();
  totalAmount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const orderData = localStorage.getItem('lastOrder');
    if (orderData) {
      const order = JSON.parse(orderData);
      this.orderReference = order.reference || '#' + Math.random().toString(36).substr(2, 9).toUpperCase();
      this.totalAmount = order.total || this.cartService.getTotal();
    } else {
      this.orderReference = '#' + Math.random().toString(36).substr(2, 9).toUpperCase();
      this.totalAmount = this.cartService.getTotal();
    }
  }
}