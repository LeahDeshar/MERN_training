import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUserSubject.next(token);
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map((response) => {
          // Store the token
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.token);
          this.router.navigate(['/dashboard']);
          return response;
        }),
        catchError((error) => {
          console.log('login error', error);
          // handle error
          throw error;
        })
      );
  }

  signup(username: string, email: string, password: string) {
    console.log(username, password, email);
    return this.http
      .post<any>(`${this.apiUrl}/register`, { username, email, password })
      .pipe(
        map((response) => {
          this.router.navigate(['/auth/login']);
          return response;
        }),
        catchError((error) => {
          // handle error
          console.log('register error', error);
          throw error;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
