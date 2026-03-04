import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css']
})
export class WishlistComponent implements OnInit {
  wishlist: Article[] = [];

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.wishlistService.wishlist$.subscribe(items => {
      this.wishlist = items;
    });
  }

  removeFromWishlist(articleId: number): void {
    this.wishlistService.removeFromWishlist(articleId);
  }

  addToCart(product: Article): void {
    this.cartService.addToCart(product, 1);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('fr-DZ') + ' DA';
  }
}