import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { VerfiyAccComponent } from './components/verfiy-acc/verfiy-acc.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      { path: 'verify', component: VerfiyAccComponent, title: 'verifyAccount' },
      {
        path: 'forgot',
        component: ForgotpasswordComponent,
        title: 'ForgotPassWord',
      },
      {
        path: 'resetPassword',
        component: ResetPasswordComponent,
        title: 'ResetPassword',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
