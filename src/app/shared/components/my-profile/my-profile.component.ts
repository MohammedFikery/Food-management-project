import { Role } from './../../../Core/Enums/Role.enum';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../../Services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit, OnDestroy {
  imagePath: string = '';
  user: any = {};
  private currentUser!: Subscription;
  Role = Role;
  ngOnInit(): void {
    this.getCurrentUser();
  }
  ngOnDestroy(): void {
    this.currentUser.unsubscribe;
  }
  private readonly _SharedService = inject(SharedService);
  getCurrentUser() {
    this.currentUser = this._SharedService.getCurrentUser().subscribe({
      next: (res) => {
        this.user = res;
        this.imagePath =
          'https://upskilling-egypt.com:3006/' + `${res.imagePath}`;
      },
    });
  }
}
