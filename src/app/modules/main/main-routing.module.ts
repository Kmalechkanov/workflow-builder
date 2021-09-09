import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './component/main.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { WorkflowBuilderComponent } from 'src/app/pages/workflow-builder/workflow-builder.component';
import { AuthenticationsComponent } from 'src/app/pages/authentications/authentications.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'workflow-builder', component: WorkflowBuilderComponent },
      { path: 'authentications', component: AuthenticationsComponent },
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
