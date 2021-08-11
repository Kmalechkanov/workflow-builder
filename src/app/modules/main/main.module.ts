import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { MainComponent } from './component/main.component';
import { MainRoutingModule } from './main-routing.module';
import { WorkflowBuilderComponent } from 'src/app/pages/workflow-builder/workflow-builder.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlowComponent } from 'src/app/components/flow/flow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    WorkflowBuilderComponent,
    HeaderComponent,
    FlowComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CdkTreeModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
  ],
})
export class MainModule { }
