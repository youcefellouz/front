// src/app/services/repair-request.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RepairRequest, RepairRequestCreate } from '../models/repair-request.model';

@Injectable({
  providedIn: 'root'
})
export class RepairRequestService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserRepairRequests(): Observable<RepairRequest[]> {
    return this.http.get<RepairRequest[]>(`${this.apiUrl}/repair-requests`);
  }

  createRepairRequest(data: RepairRequestCreate): Observable<RepairRequest> {
    return this.http.post<RepairRequest>(`${this.apiUrl}/repair-requests`, data);
  }

  deleteRepairRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/repair-requests/${id}`);
  }

  getAllRepairRequests(): Observable<RepairRequest[]> {
    return this.http.get<RepairRequest[]>(`${this.apiUrl}/admin/repair-requests`);
  }

  updateRepairRequestStatus(id: number, status: string): Observable<RepairRequest> {
    return this.http.put<RepairRequest>(
      `${this.apiUrl}/admin/repair-requests/${id}/status`,
      { status }
    );
  }
}