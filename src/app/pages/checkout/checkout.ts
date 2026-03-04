import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent implements OnInit {
  cart: Cart = { items: [], total: 0, itemCount: 0 };
  isSubmitting: boolean = false;
  
  checkoutData = {
    name: '',
    email: '',
    telephone: '',
    adresse: '',
    wilaya: '',
    codePostal: '',
    paymentMethod: 'cash'
  };

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      if (cart.items.length === 0) {
        this.router.navigate(['/cart']);
      }
    });
  }

  submitOrder(): void {
    this.isSubmitting = true;
    
    // Simuler l'envoi de la commande
    setTimeout(() => {
      this.cartService.clearCart();
      this.router.navigate(['/order-success']);
      this.isSubmitting = false;
    }, 2000);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('fr-DZ') + ' DA';
  }
}