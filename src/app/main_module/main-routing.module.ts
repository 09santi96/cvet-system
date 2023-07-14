import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';



const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'dashboard' ,
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'users', component: UsersComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
