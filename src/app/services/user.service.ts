import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '../models/token.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private tokenData: Token | null;

    constructor(
        private jwtService: JwtHelperService,
    ) {
        this.tokenData = this.getTokenData();
    }

    getId(): number {
        return +this.tokenData?.sub!;
    }

    getEmail(): string {
        return this.tokenData?.email!;
    }

    private getTokenData(): Token | null {
        const token = localStorage.getItem('token');

        if (!token) {
            return null;
        }

        return this.jwtService.decodeToken(token!);
    }
}