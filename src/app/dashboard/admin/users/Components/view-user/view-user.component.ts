import { Role } from './../../../../../Core/Enums/Role.enum';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewRecipesComponent } from '../../../recipes/components/view-recipes/view-recipes.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent {
  constructor(
    private MatDialogRef: MatDialogRef<ViewRecipesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  Role = Role;
  user: object | any = this.data.parm;
  closeDialog() {
    this.MatDialogRef.close();
  }
}
