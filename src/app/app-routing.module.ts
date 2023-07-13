import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth_module/components/login/login.component';
import { MainComponent } from './main_module/components/main/main.component';
import { RegisterComponent } from './auth_module/components/register/register.component';
import { DashboardComponent } from './main_module/components/dashboard/dashboard.component';
import { UsersComponent } from './main_module/components/users/users.component';

import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  {
    path: 'main',
    component: MainComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard', component: DashboardComponent,
      },
      {
        path: 'users', component: UsersComponent
      }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'forgot-password',
    loadChildren: () => 
      import('./auth_module/components/forgot-password/forgot-password.module').then(
        (m) =>m.ForgotPasswordModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
