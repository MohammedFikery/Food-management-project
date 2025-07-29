import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthApisService } from '../../services/AuthApis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verfiy-acc',
  templateUrl: './verfiy-acc.component.html',
  styleUrls: ['./verfiy-acc.component.scss'],
})
export class VerfiyAccComponent {
  verifyAccount = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    code: new FormControl(null, [Validators.required]),
  });

  constructor(
    private readonly _AuthApisService: AuthApisService,
    private toastr: ToastrService,
    private _Router: Router
  ) {}

  login() {
    if (this.verifyAccount.invalid) {
      this.verifyAccount.markAllAsTouched();
      return;
    }

    const data = this.verifyAccount.value;

    this._AuthApisService.verify(data).subscribe({
      next: (res) => {
        console.log('verify success', res);
        this.toastr.success('verify success!', 'success!');
        this._Router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('verify error', 'error');
      },
    });
  }
}
