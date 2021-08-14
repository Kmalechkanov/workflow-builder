import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponse } from '../models/auth-response.model';
import { environment as env } from 'src/environments/environment';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtHelperService,
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
    this.loggedIn = authenticated;
    return authenticated;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.clear();
  }

  getTokenData(): Token | null {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    return this.jwtService.decodeToken(token!);
  }

  private checkValidToken(): boolean {
    const token = this.getToken();

    if (token === null || this.jwtService.isTokenExpired(token)) {
      return false;
    }
    return true;
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn = true;
  }
}
