import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpHeaders: HttpHeaders | { [header: string]: string | string[]; };
  
  constructor(private http:HttpClient, private authService:AuthService) { }

      // Global functions to perform crud operations
            // POST
      post(url: string, body: {}): Observable<any> {
        return this.http.post(Environment.BASE_URL + url, body, {
            headers: this.httpHeaders
        }).pipe(catchError(error => {
            return throwError(() => new Error(error))
        }))
    }
             // GET
    get(url: string): Observable<any> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAuthorizationToken()}`);
      return this.http.get(Environment.BASE_URL + url, { headers }).pipe(
        catchError(error => {
          return throwError(() => new Error(error));
        })
      );
    }
}
