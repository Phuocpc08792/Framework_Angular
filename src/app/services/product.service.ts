import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
  categoryId: number;
  Category?: { id: number; name: string };
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<{ status: number; message: string; data: Product[] }>(this.apiUrl).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }


  getById(id: number): Observable<Product> {
    return this.http.get<{ status: number; data: Product }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  create(product: { name: string; price: number; image?: string; description?: string; categoryId: number }): Observable<Product> {
    return this.http.post<{ status: number; message: string; data: Product }>(this.apiUrl, product).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  update(id: number, product: { name: string; price: number; image?: string; description?: string; categoryId: number }): Observable<Product> {
    return this.http.put<{ status: number; message: string; data: Product }>(`${this.apiUrl}/${id}`, product).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<{ status: number; message: string }>(`${this.apiUrl}/${id}`).pipe(
      map(() => void 0),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Đã xảy ra lỗi không xác định!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Lỗi: ${error.error.message}`;
    } else {
      errorMessage = `Mã lỗi: ${error.status}\nThông báo: ${error.error.message || error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}