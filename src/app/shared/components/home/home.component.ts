import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  userName: string = localStorage.getItem('userName') ?? 'user';
  userRole: string = localStorage.getItem('role') ?? 'SuperAdmin';
}
