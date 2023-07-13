import { NgModule,  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './auth_module/components/login/login.component';
import { MainComponent } from './main_module/components/main/main.component';
import { RegisterComponent } from './auth_module/components/register/register.component';
import { MenuComponent } from './main_module/components/menu/menu.component';
import { DashboardComponent } from './main_module/components/dashboard/dashboard.component';
import { UsersComponent } from './main_module/components/users/users.component';

import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//material components
import { MaterialModule } from './shared/material.module';
import { ForgotPasswordModule } from './auth_module/components/forgot-password/forgot-password.module';






@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegisterComponent,
    LoginComponent,
    MenuComponent,
    DashboardComponent,
    UsersComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    MaterialModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
