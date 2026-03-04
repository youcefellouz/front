import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent implements OnInit {
  products: Article[] = [];
  filteredProducts: Article[] = [];
  categories: any[] = [];
  brands: any[] = [];
  
  // Filters
  searchQuery: string = '';
  selectedCategory: string = '';
  selectedBrand: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  inStockOnly: boolean = false;
  sortBy: string = 'default';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number[] = [];
  
  isLoading: boolean = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.updatePagination();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products', error);
        this.isLoading = false;
      }
    });

    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.productService.getBrands().subscribe(brands => {
      this.brands = brands;
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = !this.searchQuery || 
        product.designation.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = !this.selectedCategory || 
        product.category_id.toString() === this.selectedCategory;
      const matchesBrand = !this.selectedBrand || 
        product.brand_id.toString() === this.selectedBrand;
      const matchesMinPrice = !this.minPrice || product.prix >= this.minPrice;
      const matchesMaxPrice = !this.maxPrice || product.prix <= this.maxPrice;
      const matchesStock = !this.inStockOnly || product.quantite > 0;

      return matchesSearch && matchesCategory && matchesBrand && 
             matchesMinPrice && matchesMaxPrice && matchesStock;
    });

    this.sortProducts();
    this.updatePagination();
  }

  sortProducts(): void {
    switch (this.sortBy) {
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.prix - b.prix);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.prix - a.prix);
        break;
      case 'name':
        this.filteredProducts.sort((a, b) => a.designation.localeCompare(b.designation));
        break;
      case 'newest':
        this.filteredProducts.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
    }
  }

  updatePagination(): void {
    const total = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.totalPages = Array(total).fill(0).map((_, i) => i + 1);
  }

  changePage(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addToCart(product: Article): void {
    this.cartService.addToCart(product, 1);
  }

  viewProduct(product: Article): void {
    this.router.navigate(['/products', product.id]);
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.inStockOnly = false;
    this.sortBy = 'default';
    this.applyFilters();
  }

  isNew(product: Article): boolean {
    const createdDate = new Date(product.created_at);
    const now = new Date();
    const daysDiff = (now.getTime() - createdDate.getTime()) / (1000 * 3600 * 24);
    return daysDiff < 30;
  }

  isOnSale(product: Article): boolean {
    return product.quantite < 10;
  }

  getDiscount(product: Article): number {
    return Math.round(((product.prix * 1.15 - product.prix) / (product.prix * 1.15)) * 100);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('fr-DZ') + ' DA';
  }
}