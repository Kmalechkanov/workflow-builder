import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userEmail!: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userEmail = this.userService.getEmail();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['auth', 'login']);
  }
}
