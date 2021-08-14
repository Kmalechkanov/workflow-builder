import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '../models/token.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        private authService: AuthService,
    ) { }
    
    getId(): number {
        return +this.authService.getTokenData()!.sub!;
    }

    getEmail(): string {
        return this.authService.getTokenData()!.email!;
    }
}