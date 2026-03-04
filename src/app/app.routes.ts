import { Routes } from '@angular/router';

// Public Pages
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ProductsComponent } from './pages/products/products';
import { ProductDetailsComponent } from './pages/product-details/product-details';
import { CartComponent } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';
import { OrderSuccessComponent } from './pages/order-success/order-success';
import { UserProfileComponent } from './pages/user-profile/user-profile';
import { UserOrdersComponent } from './pages/user-orders/user-orders';
import { WishlistComponent } from './pages/wishlist/wishlist';
import { NotFoundComponent } from './pages/not-found/not-found';

// Admin Pages
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout';
import { AdminDashboardComponent } from './admin/dashboard/dashboard';
import { AdminProductsComponent } from './admin/products/products';
import { AdminOrdersComponent } from './admin/orders/orders';
import { AdminUsersComponent } from './admin/users/users';

// Guards
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  // Public Routes
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [authGuard] },
  { path: 'orders', component: UserOrdersComponent, canActivate: [authGuard] },
  { path: 'wishlist', component: WishlistComponent },
  { path: '404', component: NotFoundComponent },
  
  // Admin Routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'users', component: AdminUsersComponent }
    ]
  },
  
  // Wildcard Route
  { path: '**', redirectTo: '/404' }
];