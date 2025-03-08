// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthInterceptorService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // If token exists, clone the request and add the Authorization header
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Pass the cloned request to the next handler
      return next.handle(clonedRequest).pipe(
        catchError(this.handleError.bind(this)) // Handle errors globally
      );
    }

    // If no token, pass the original request
    return next.handle(req).pipe(
      catchError(this.handleError.bind(this)) // Handle errors globally
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // If Unauthorized (401), log the user out or redirect to login
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }

    // Return an observable with a user-facing error message
    return throwError(error);
  }
}
