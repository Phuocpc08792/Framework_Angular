import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Category {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/categories'; // URL của backend

  constructor(private http: HttpClient) { }

  // Lấy tất cả danh mục
  getAll(): Observable<Category[]> {
    return this.http.get<{ status: number; message: string; data: Category[] }>(`${this.apiUrl}/list`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // Lấy danh mục theo ID
  getById(id: number): Observable<Category> {
    return this.http.get<{ status: number; data: Category }>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // Thêm danh mục mới
  create(name: string): Observable<Category> {
    return this.http.post<{ status: number; message: string; data: Category }>(`${this.apiUrl}/add`, { name })
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // Cập nhật danh mục
  update(id: number, name: string): Observable<Category> {
    return this.http.put<{ status: number; message: string; data: Category }>(`${this.apiUrl}/${id}`, { name })
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // Xóa danh mục
  delete(id: number): Observable<void> {
    return this.http.delete<{ status: number; message: string }>(`${this.apiUrl}/${id}`)
      .pipe(
        map(() => void 0),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Đã xảy ra lỗi không xác định!';
    if (error.error instanceof ErrorEvent) {
      // Lỗi phía client
      errorMessage = `Lỗi: ${error.error.message}`;
    } else {
      // Lỗi phía server
      errorMessage = `Mã lỗi: ${error.status}\nThông báo: ${error.error.message || error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}