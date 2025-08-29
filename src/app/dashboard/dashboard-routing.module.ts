import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from '../shared/components/home/home.component';
import { adminGuard } from '../Core/guards/admin.guard';
import { userGuard } from '../Core/guards/user.guard';
import { MyProfileComponent } from '../shared/components/my-profile/my-profile.component';
import { EditprofileComponent } from '../shared/components/editprofile/editprofile.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'admin',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'user',
        canActivate: [userGuard],
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      { path: 'myProfile', component: MyProfileComponent },
      { path: 'editProfile', component: EditprofileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, SharedModule],
})
export class DashboardRoutingModule {}
