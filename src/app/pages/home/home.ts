import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  products: Article[] = [];
  dealProducts: Article[] = [];
  categories: any[] = [
    { name: 'Smartphones', icon: 'bi-phone' },
    { name: 'Ordinateurs', icon: 'bi-laptop' },
    { name: 'Audio', icon: 'bi-headphones' },
    { name: 'Caméras', icon: 'bi-camera' },
    { name: 'Gaming', icon: 'bi-controller' },
    { name: 'Télévisions', icon: 'bi-tv' },
    { name: 'Montres', icon: 'bi-watch' },
    { name: 'Accessoires', icon: 'bi-plug' }
  ];
  brands: any[] = [];
  countdown = { hours: 8, minutes: 45, seconds: 22 };
  isLoading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.startCountdown();
  }

  loadData(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products.slice(0, 8);
        this.dealProducts = products.slice(0, 5);
        this.brands = [
          { nom: 'Apple' },
          { nom: 'Samsung' },
          { nom: 'Sony' },
          { nom: 'Dell' },
          { nom: 'HP' },
          { nom: 'Lenovo' },
          { nom: 'Canon' },
          { nom: 'Xiaomi' }
        ];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products', error);
        this.isLoading = false;
      }
    });
  }

  addToCart(product: Article): void {
    this.cartService.addToCart(product, 1);
  }

  startCountdown(): void {
    setInterval(() => {
      this.countdown.seconds--;
      if (this.countdown.seconds < 0) {
        this.countdown.seconds = 59;
        this.countdown.minutes--;
        if (this.countdown.minutes < 0) {
          this.countdown.minutes = 59;
          this.countdown.hours--;
          if (this.countdown.hours < 0) {
            this.countdown.hours = 23;
          }
        }
      }
    }, 1000);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('fr-DZ') + ' DA';
  }
}