import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthApisService } from '../../services/AuthApis.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public isHide: boolean = true;
  public isHideConfirm: boolean = true;
  imgSrc: any;

  registerForm = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
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

  Register(data: FormGroup) {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    let myData = new FormData();

    myData.append('userName', data.value.userName);
    myData.append('email', data.value.email);
    myData.append('country', data.value.country);
    myData.append('phoneNumber', data.value.phoneNumber);
    myData.append('password', data.value.password);
    myData.append('confirmPassword', data.value.confirmPassword);
    myData.append('profileImage', this.imgSrc);

    this._AuthApisService.Register(myData).subscribe({
      next: (res) => {
        this.toastr.success('Register success', 'success!');
        this._Router.navigate(['/auth/verify']);
      },
      error: (err) => {
        this.toastr.error('Register error', 'error!');
      },
    });
  }

  files: File[] = [];

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.imgSrc = this.files[0];
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
