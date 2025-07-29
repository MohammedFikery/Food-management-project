import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { VerfiyAccComponent } from './components/verfiy-acc/verfiy-acc.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, VerfiyAccComponent, ForgotpasswordComponent, ResetPasswordComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SharedModule],
})
export class AuthModule {}
