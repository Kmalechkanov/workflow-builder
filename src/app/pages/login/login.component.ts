import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  invalid = false;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';

    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.email,
        Validators.required,
      ])],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.invalid = false;

    if (this.form.valid) {
      const email = this.form.get('email')!.value;
      const password = this.form.get('password')!.value;
      this.authService.login$(email, password).pipe(take(1))
        .subscribe(
          res => {
            this.router.navigate([this.returnUrl]);
          },
          err => {
            this.invalid = true;
            this.form.get('password')!.reset(); 
          },
        );
    }
  }
}
