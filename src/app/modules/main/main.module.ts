import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { MainComponent } from './component/main.component';
import { MainRoutingModule } from './main-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class MainModule { }
