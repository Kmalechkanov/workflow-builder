import { Injectable } from '@angular/core';
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