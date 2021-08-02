import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { MainComponent } from './component/main.component';
import { MainRoutingModule } from './main-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { WorkflowBuilderComponent } from 'src/app/pages/workflow-builder/workflow-builder.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CdkTreeModule } from '@angular/cdk/tree';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    WorkflowBuilderComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CdkTreeModule,
  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class MainModule { }
