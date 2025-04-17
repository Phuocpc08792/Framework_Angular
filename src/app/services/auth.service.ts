import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Khôi phục trạng thái người dùng từ localStorage khi khởi động
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }

    // Kiểm tra phiên đăng nhập từ backend
    this.checkSession().subscribe({
      error: (err) => {
        console.error('Lỗi khi kiểm tra phiên:', err);
        this.logoutLocally(); // Nếu không có phiên, đăng xuất cục bộ
      }
    });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, data, { withCredentials: true });
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, data, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          if (response.status === 200 && response.user) {
            this.currentUserSubject.next(response.user);
            localStorage.setItem('currentUser', JSON.stringify(response.user)); // Lưu vào localStorage
          }
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.API_URL}/logout`, { withCredentials: true })
      .pipe(
        tap(() => {
          this.logoutLocally(); // Đăng xuất cục bộ
        })
      );
  }

  private logoutLocally(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser'); // Xóa thông tin người dùng khỏi localStorage
  }

  checkSession(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/check-session`, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          if (response.isLoggedIn && response.user) {
            this.currentUserSubject.next(response.user);
            localStorage.setItem('currentUser', JSON.stringify(response.user)); // Cập nhật localStorage
          } else {
            this.logoutLocally(); // Nếu không có phiên, đăng xuất cục bộ
          }
        }),
        catchError((err) => {
          this.logoutLocally();
          throw err;
        })
      );
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}