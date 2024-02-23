import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndPoints} from '../common/ApiEndPoints'
import {Environment} from '../environments/environment'
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';




@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = Environment.BASE_URL;
  public redirectUrl = "/dashboard";


  
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const bodyData = {
      username: username,
      password: password,
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(`${this.apiUrl}${ApiEndPoints.SIGNIN}`, bodyData, {
      headers: headers,
      observe: 'response'
    }).pipe(
      map( response=> {
        sessionStorage.setItem(Environment.USER, JSON.stringify(response.body));
        console.log(response.body)
        sessionStorage.setItem(Environment.TOKEN, response.body.token);
        console.log(response.body.token)
        
     return response
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  logout() {
    sessionStorage.removeItem(Environment.TOKEN);
    sessionStorage.removeItem(Environment.USER);
    //this.username = null;
    //this.password = null;
  }

  isLoggedIn() {
    let token = sessionStorage.getItem(Environment.TOKEN)
    //return token !== null;
    return !(token === null)
   
  }
 

  getLoggedInUser() : any {
    let item = sessionStorage.getItem(Environment.USER)
    if (item != null) {
      return JSON.parse(item)
    } else {
      return null
    }
  }
  // retrieve the authorization token stored in the session storage
    getAuthorizationToken() : String {
      return sessionStorage.getItem(Environment.TOKEN) ?? "";
    }
  
    private handleError(error: any) {
      return throwError(error);
    }
  }
  
