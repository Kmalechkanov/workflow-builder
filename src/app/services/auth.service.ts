import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponse } from '../models/authResponse.model';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
  ) { }

  login$(email: string, password: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(env.api + '/login', {
      email,
      password,
    }).pipe(
      tap((result) => {
        if (result.accessToken) {
          this.saveToken(result.accessToken);
        }
      }),
    );
  }

  isAuthenticated(): boolean {
    const authenticated = this.checkValidToken();
    this.loggedIn.next(authenticated);
    return authenticated;
  }

  getToken() : string | null {
    return localStorage.getItem('token');
  }

  private checkValidToken() {
    const token = this.getToken();
    const helper = new JwtHelperService();

    if(token === null || helper.isTokenExpired(token)) {
      return false;
    }
    return true;
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }
}
