import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthApisService } from '../../services/AuthApis.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  public isHide: boolean = true;
  public isHideConfirm: boolean = true;

  resetPassword = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    seed: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3),
    ]),
  });

  constructor(
    private readonly _AuthApisService: AuthApisService,
    private toastr: ToastrService,
    private _Router: Router
  ) {}

  login() {
    if (this.resetPassword.invalid) {
      this.resetPassword.markAllAsTouched();
      return;
    }

    const data = this.resetPassword.value;

    this._AuthApisService.resetPassword(data).subscribe({
      next: (res) => {
        this.toastr.success('resetPassword success!', 'success!');
        this._Router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.toastr.error('resetPassword Error!', 'Error!');
      },
    });
  }
}
