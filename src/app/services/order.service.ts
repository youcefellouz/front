import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // إنشاء طلب جديد
  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, orderData);
  }

  // جلب كل طلبات المستخدم
  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  // جلب تفاصيل طلب محدد
  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`);
  }

  // إلغاء طلب
  cancelOrder(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/${id}/cancel`, {});
  }

  // (Admin) جلب كل الطلبات
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/admin/orders`);
  }

  // (Admin) تحديث حالة الطلب
  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/orders/${id}/status`, { status });
  }
}