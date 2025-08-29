import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/Core/Enums/Role.enum';
import { UserRecipesService } from 'src/app/dashboard/user/Services/user-recipes.service';

@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.scss'],
})
export class ViewRecipesComponent {
  constructor(
    private MatDialogRef: MatDialogRef<ViewRecipesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _UserRecipesService: UserRecipesService,
    private _Toastr: ToastrService
  ) {}
  userRole: string | any = localStorage.getItem('role');
  formdata: object | any = this.data.parm;
  addSub!: Subscription;

  closeDialog() {
    this.MatDialogRef.close();
  }
  addToFavorite(id: number) {
    const AddData = {
      recipeId: id,
    };

    this._UserRecipesService.addToFavorite(AddData).subscribe({
      next: (res) => {
        this._Toastr.success('success add To Favorite');
      },
    });
  }
}
