import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthApisService } from '../../services/AuthApis.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent {
  forgotPassword = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    private readonly _AuthApisService: AuthApisService,
    private toastr: ToastrService,
    private _Router: Router
  ) {}

  login() {
    if (this.forgotPassword.invalid) {
      this.forgotPassword.markAllAsTouched();
      return;
    }

    const data: any = this.forgotPassword.value;

    this._AuthApisService.forgot(data).subscribe({
      next: (res) => {
        console.log(' success', res);
        this._Router.navigate(['/auth/resetPassword']);
        this._AuthApisService.email = this.forgotPassword.value.email;
        this.toastr.success(' success!', 'success!');
      },
    });
  }
}
