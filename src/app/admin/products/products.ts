import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class AdminProductsComponent implements OnInit {
  products: Article[] = [];
  filteredProducts: Article[] = [];
  searchQuery: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
      },
      error: (error) => {
        console.error('Error loading products', error);
      }
    });
  }

  filterProducts(): void {
    if (!this.searchQuery) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p =>
        p.designation.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.reference.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  editProduct(product: Article): void {
    console.log('Edit product', product);
    // TODO: Open edit modal
  }

  deleteProduct(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) {
      // TODO: Call API to delete
      this.products = this.products.filter(p => p.id !== id);
      this.filteredProducts = this.filteredProducts.filter(p => p.id !== id);
    }
  }

  openModal(): void {
    // TODO: Open create product modal
    console.log('Open create modal');
  }
}