import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { AuthenticationComponent } from './component/authentication.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
  ],
  exports: [
  ],
})
export class AuthenticationModule { }
