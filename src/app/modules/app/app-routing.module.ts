import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModule } from '../authentication/authentication.module';
import { MainModule } from '../main/main.module';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { NonAuthGuardService } from 'src/app/guards/non-auth-guard.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthenticationModule,
    canLoad: [NonAuthGuardService],
  },
  {
    path: '',
    loadChildren: () => MainModule,
    canLoad: [AuthGuardService],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
