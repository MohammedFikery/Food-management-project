import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../../Services/shared.service';
import { GlobalInterceptor } from 'src/app/Core/interceptors/global.interceptor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.currentUser.unsubscribe;
  }
  private currentUser!: Subscription;
  ngOnInit(): void {
    this.getCurrentUser();
  }
  username: string = localStorage.getItem('userName') ?? 'User';
  imagePath: string = '';
  private readonly _SharedService = inject(SharedService);
  private readonly Router = inject(Router);
  getCurrentUser() {
    this.currentUser = this._SharedService.getCurrentUser().subscribe({
      next: (res) => {
        this.imagePath =
          'https://upskilling-egypt.com:3006/' + `${res.imagePath}`;
      },
    });
  }
  logOut() {
    localStorage.clear();
    this.Router.navigate(['/auth/login']);
  }
}
