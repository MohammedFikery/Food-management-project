import { AuthApisService } from './../../services/AuthApis.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public isHide: boolean = true;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3),
    ]),
  });

  constructor(
    private readonly _AuthApisService: AuthApisService,
    private toastr: ToastrService
  ) {}

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const data = this.loginForm.value;

    this._AuthApisService.login(data).subscribe({
      next: (res) => {
        this.toastr.success('Login success', 'success!');
      },
      error: (err) => {
        this.toastr.success('Login error!', 'Error!');
      },
    });
  }
}
