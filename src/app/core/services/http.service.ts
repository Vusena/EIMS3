import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Environment } from '../environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpHeaders: HttpHeaders

  constructor(private http: HttpClient, private authService: AuthService) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': 'Bearer ' +
        + this.authService.getAuthorizationToken()
    })
  }

  // Global functions to perform crud operations
  // Authentication POST
  post(url: string, body: {}): Observable<any> {
    return this.http.post(Environment.BASE_URL + url, body, {
      headers: this.httpHeaders
    }).pipe(catchError(error => {
      return throwError(() => new Error(error))
    }))
  }

  postData(url: string, body: {}): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAuthorizationToken()}`);
    return this.http.post(Environment.BASE_URL + url, body, { headers, observe: "response", })

  }
  // GET
  get(url: string, params?: { [key: string]: string }): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAuthorizationToken()}`);
    return this.http.get(Environment.BASE_URL + url, { headers })
  }
}
