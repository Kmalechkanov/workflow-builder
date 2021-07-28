import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';
import { NotFoundComponent } from '../../pages/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { NonAuthGuardService } from 'src/app/guards/non-auth-guard.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: JwtHelperService,
      useFactory: () => new JwtHelperService()
    },
    AuthGuardService,
    NonAuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
