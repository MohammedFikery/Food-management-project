import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/dashboard/admin/category/Services/category.service';
import { RecipesService } from 'src/app/dashboard/admin/recipes/Services/recipes.service';
import { UserService } from 'src/app/dashboard/admin/users/Services/user.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss'],
})
export class DeleteItemComponent implements OnInit {
  FormName: String = this.data.formName;
  Formdata: object | any = this.data;
  private deleteSub!: Subscription;
  constructor(
    private MatDialogRef: MatDialogRef<DeleteItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _CategoryService: CategoryService,
    private readonly _RecipesService: RecipesService,
    private readonly _UserService: UserService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    console.log('Formdata', this.Formdata);
  }
  closeDialog() {
    this.MatDialogRef.close();
    this.deleteSub.unsubscribe();
  }

  delete() {
    if (this.FormName === 'category') {
      this.deleteSub = this._CategoryService
        .deleteCategory(this.Formdata.parm.id)
        .subscribe({
          next: (res: any) => {
            this.toastr.success(
              `delete ${res.affected} ${this.Formdata.parm.name}`,
              'success!'
            );
            this.closeDialog();
          },
        });
    } else if (this.FormName === 'recipes') {
      this.deleteSub = this._RecipesService
        .deleteRecipes(this.Formdata.parm.id)
        .subscribe({
          next: (res: any) => {
            this.toastr.success(
              `delete ${res.affected} ${this.Formdata.parm.name}`,
              'success!'
            );
            this.closeDialog();
          },
        });
    } else if (this.FormName === 'User') {
      this.deleteSub = this._UserService
        .deleteUser(this.Formdata.parm.id)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            this.toastr.success(
              `delete ${res.message} ${this.Formdata.parm.userName}`,
              'success!'
            );
            this.closeDialog();
          },
        });
    }
  }
}
