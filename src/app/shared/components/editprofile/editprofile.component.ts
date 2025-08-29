import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SharedService } from '../../Services/shared.service';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss'],
})
export class EditprofileComponent implements OnDestroy, OnInit {
  ngOnInit(): void {
    this.getCurrentProfile();
  }
  private readonly _SharedService = inject(SharedService);
  ngOnDestroy(): void {
    this.EditProfileSub?.unsubscribe();
  }

  files: File[] = [];
  private EditProfileSub?: Subscription;
  imgSrc: any;
  hide = true;
  currentUser: any;
  private readonly toastr = inject(ToastrService);

  ProfileForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(8),
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    country: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    phoneNumber: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  onSelect(event: any) {
    const selectedFile = event.addedFiles[0];
    if (selectedFile) {
      this.files = [selectedFile];
    }
    this.imgSrc = this.files[0];
  }
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  EditProfile(data: FormGroup) {
    if (this.ProfileForm.invalid) {
      this.ProfileForm.markAllAsTouched();
      return;
    }
    let myData = new FormData();

    myData.append('userName', data.value.userName);
    myData.append('email', data.value.email);
    myData.append('country', data.value.country);
    myData.append('phoneNumber', data.value.phoneNumber);
    myData.append('confirmPassword', data.value.confirmPassword);
    myData.append('profileImage', this.files[0]);

    this.EditProfileSub = this._SharedService
      .editCurrentUser(myData)
      .subscribe({
        next: (res) => {
          this.toastr.success(res.message, 'success!');
        },
      });
  }
  getCurrentProfile() {
    this._SharedService.getCurrentUser().subscribe({
      next: (res) => {
        this.currentUser = res;
        this.ProfileForm.patchValue({
          userName: this.currentUser.userName,
          email: this.currentUser.email,
          country: this.currentUser.country,
          phoneNumber: this.currentUser.phoneNumber,
        });
        if (res.imagePath) {
          const imageUrl = `https://upskilling-egypt.com:3006/${this.currentUser.imagePath}`;

          fetch(imageUrl)
            .then((imgRes) => imgRes.blob())
            .then((blob) => {
              const file = new File([blob], '', {
                type: blob.type,
              });
              this.files = [file];
            });
        }
      },
    });
  }
}
