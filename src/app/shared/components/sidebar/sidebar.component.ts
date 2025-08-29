import { Component, EventEmitter, Input, Output } from '@angular/core';

interface IMenu {
  title: string;
  icon: string;
  menuLink: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() expanded: boolean = false;
  @Output() toggle = new EventEmitter<void>();

  onToggleClick() {
    this.toggle.emit();
  }
  isCollapsed = false;
  @Output() toggle = new EventEmitter<void>();

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit();
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'SuperAdmin' ? true : false;
  }
  isUser(): boolean {
    return localStorage.getItem('role') === 'SystemUser' ? true : false;
  }
  menu: IMenu[] = [
    {
      title: 'home',
      icon: 'fa-house',
      menuLink: '/dashboard/home',
      isActive: this.isAdmin() || this.isUser(),
    },
    {
      title: 'Users',
      icon: 'fa-user',
      menuLink: '/dashboard/admin/users',
      isActive: this.isAdmin(),
    },
    {
      title: 'Recipes',
      icon: 'fa-table-cells-large',
      menuLink: '/dashboard/admin/recipes',
      isActive: this.isAdmin(),
    },
    {
      title: 'Categories',
      icon: 'fa-layer-group',
      menuLink: '/dashboard/admin/category',
      isActive: this.isAdmin(),
    },
    {
      title: 'Users Recipes',
      icon: 'fa-user',
      menuLink: '/dashboard/user/recipesUser',
      isActive: this.isUser(),
    },
    {
      title: 'favorite',
      icon: 'fa-heart',
      menuLink: '/dashboard/user/favorite',
      isActive: this.isUser(),
    },
  ];

  Logout() {
    localStorage.clear();
  }
}
