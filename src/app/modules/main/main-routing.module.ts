import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './component/main.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { WorkflowBuilderComponent } from 'src/app/pages/workflow-builder/workflow-builder.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'workflow-builder', component: WorkflowBuilderComponent },
    ],
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class MainRoutingModule { }
