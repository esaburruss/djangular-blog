import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DashboardComponent,
    LoginFormComponent,
  ]
})
export class DashboardModule { }
