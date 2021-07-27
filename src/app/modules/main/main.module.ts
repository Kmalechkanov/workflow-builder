import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { MainComponent } from './component/main.component';
import { MainRoutingModule } from './main-routing.module';

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
})
export class MainModule { }
