import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class NonAuthGuardService implements CanLoad {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    canLoad(): boolean {
        if (this.authService.isAuthenticated()) {
            this.router.navigate([]);
            return false;
        }
        return true;
    }
}