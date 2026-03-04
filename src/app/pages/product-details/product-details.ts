import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Article | null = null;
  relatedProducts: Article[] = [];
  quantity: number = 1;
  activeTab: string = 'description';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(+id);
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
        this.relatedProducts = products.slice(0, 4);
      }
    });
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

  formatPrice(price: number): string {
    return price.toLocaleString('fr-DZ') + ' DA';
  }
}