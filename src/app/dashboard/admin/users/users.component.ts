import { Role } from './../../../Core/Enums/Role.enum';
import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DeleteItemComponent } from 'src/app/shared/components/delete-item/delete-item.component';
import { ViewRecipesComponent } from '../recipes/components/view-recipes/view-recipes.component';
import { IRecipesData, IRecipes, Tag } from '../recipes/interfaces/irecipes';
import { UserService } from './Services/user.service';
import { IUser, IUserdata } from './Interfaces/iuserdata';
import { ViewUserComponent } from './Components/view-user/view-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  private userSub?: Subscription;
  private readonly _UserService = inject(UserService);
  pageNumber = 1;
  pageSize = 10;
  paramName: any = 'userName';
  groupsNumber: number | '' = '';
  totalNumberOfRecords = 0;
  name = '';
  UserData!: IUser;
  listData: IUserdata[] = [];
  showFirstLastButtons = true;
  readonly dialog = inject(MatDialog);
  Role = Role;
  openDeleteDialog(data: IUserdata) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      panelClass: 'delete-dialog',
      disableClose: true,
      data: { parm: data, formName: 'User' },
    });

    dialogRef.afterClosed().subscribe(() => this.getUser());
  }
  openViewDialog(data: IUserdata) {
    const dialogRef = this.dialog.open(ViewUserComponent, {
      disableClose: true,
      data: { parm: data },
    });

    dialogRef.afterClosed().subscribe(() => this.getUser());
  }

  getUser() {
    const userPram = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      [this.paramName]: this.name,
      groups: this.groupsNumber,
    };
    this.userSub = this._UserService.gatAllUSer(userPram).subscribe({
      next: (res: any) => {
        console.log('res', res);
        this.UserData = res;
        this.listData = res.data;
        this.totalNumberOfRecords = res.totalNumberOfRecords;
      },
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  handlePageEvent(e: any) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    this.getUser();
  }
}
