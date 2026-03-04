// src/app/pages/product-details/product-details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
import { Article } from '../../models/article.model';
import { Review, ReviewRequest } from '../../models/review.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Article | null = null;
  relatedProducts: Article[] = [];
  quantity: number = 1;
  activeTab: string = 'description';
  
  // Reviews
  reviews: Review[] = [];
  averageRating: number = 0;
  reviewCount: number = 0;
  showReviewForm: boolean = false;
  
  reviewData: ReviewRequest = {
    article_id: 0,
    rating: 5,
    comment: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private reviewService: ReviewService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const productId = +id;
      this.loadProduct(productId);
      this.loadReviews(productId);
    }
  }

  loadProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loadRelatedProducts(product.category_id);
      },
      error: (error) => {
        console.error('Error loading product', error);
        this.router.navigate(['/products']);
      }
    });
  }

  loadRelatedProducts(categoryId: number): void {
    this.productService.getProductsByCategory(categoryId).subscribe({
      next: (products) => {
        this.relatedProducts = products.slice(0, 4).filter(p => p.id !== this.product?.id);
      }
    });
  }

  loadReviews(articleId: number): void {
    this.reviewService.getReviews(articleId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.calculateAverageRating();
      },
      error: (error) => {
        console.error('Error loading reviews', error);
      }
    });
  }

  calculateAverageRating(): void {
    if (this.reviews.length === 0) {
      this.averageRating = 0;
      this.reviewCount = 0;
      return;
    }
    const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
    this.averageRating = Math.round((sum / this.reviews.length) * 10) / 10;
    this.reviewCount = this.reviews.length;
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
    }
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.quantite) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  viewProduct(product: Article): void {
    this.router.navigate(['/products', product.id]);
  }

  submitReview(): void {
    if (!this.authService.isLoggedIn()) {
      alert('Veuillez vous connecter pour ajouter un avis');
      return;
    }
    if (!this.product || this.reviewData.rating < 1) {
      alert('Veuillez sélectionner une note');
      return;
    }
    this.reviewData.article_id = this.product.id;
    this.reviewService.addReview(this.reviewData).subscribe({
      next: (review) => {
        this.reviews.unshift(review);
        this.calculateAverageRating();
        this.reviewData.comment = '';
        this.reviewData.rating = 5;
        this.showReviewForm = false;
        alert('Merci pour votre avis!');
      },
      error: (error) => {
        alert(error.error?.message || 'Erreur lors de l\'ajout de l\'avis');
      }
    });
  }

  deleteReview(reviewId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet avis?')) {
      this.reviewService.deleteReview(reviewId).subscribe({
        next: () => {
          this.reviews = this.reviews.filter(r => r.id !== reviewId);
          this.calculateAverageRating();
        },
        error: (error) => {
          alert('Erreur lors de la suppression');
        }
      });
    }
  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.round(rating)).fill(0);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-DZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatPrice(price: number): string {
    return price.toLocaleString('fr-DZ') + ' DA';
  }
}