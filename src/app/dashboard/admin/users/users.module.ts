import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ViewUserComponent } from './Components/view-user/view-user.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UsersComponent,
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,SharedModule
  ]
})
export class UsersModule { }
