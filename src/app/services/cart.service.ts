import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api/cart';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  addToCart(productId: number, quantity: number): Observable<any> {
    if (!this.authService.isLoggedIn()) {
      return throwError(() => new Error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!'));
    }
    return this.http.post(`${this.apiUrl}/add/${productId}`, { quantity }, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  getCart(): Observable<any[]> {
    if (!this.authService.isLoggedIn()) {
      return throwError(() => new Error('Vui lòng đăng nhập để xem giỏ hàng!'));
    }
    return this.http.get<any[]>(this.apiUrl, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Đã xảy ra lỗi!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Lỗi: ${error.error.message}`;
    } else {
      errorMessage = `Mã lỗi: ${error.status}\nThông báo: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}