import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginserviceService {
  private apiUrl = 'https://fakestoreapi.com/auth/login';

  constructor(private http: HttpClient) {}

  // login(credentials: { username: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, credentials);
  // }
  login(credentials: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, credentials, { headers });
  }
}
