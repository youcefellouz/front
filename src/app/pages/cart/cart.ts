import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [], total: 0, itemCount: 0 };
  discount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  updateQuantity(articleId: number, quantity: number): void {
    this.cartService.updateQuantity(articleId, quantity);
  }

  removeItem(articleId: number): void {
    this.cartService.removeFromCart(articleId);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('fr-DZ') + ' DA';
  }
}