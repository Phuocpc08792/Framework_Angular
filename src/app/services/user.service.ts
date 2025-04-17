import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: 'admin' | 'user';
    status: 'active' | 'inactive';
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = 'http://localhost:3000/api/users';

    constructor(private http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl).pipe(catchError(this.handleError));
    }

    getById(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
    }

    create(user: { name: string; email: string; password: string; phone?: string; role: 'admin' | 'user'; status: 'active' | 'inactive' }): Observable<User> {
        return this.http.post<User>(this.apiUrl, user).pipe(catchError(this.handleError));
    }

    update(id: number, user: { name: string; email: string; password?: string; phone?: string; role: 'admin' | 'user'; status: 'active' | 'inactive' }): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${id}`, user).pipe(catchError(this.handleError));
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Đã xảy ra lỗi!';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Lỗi: ${error.error.message}`;
        } else {
            errorMessage = `Mã lỗi: ${error.status}\nThông báo: ${error.message}`;
        }
        return throwError(() => new Error(errorMessage));
    }
}
