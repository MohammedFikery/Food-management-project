import { Subscription } from 'rxjs/internal/Subscription';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../Services/category.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss'],
})
export class AddEditCategoryComponent implements OnInit {
  private addCategorySub!: Subscription;
  formNumber: number = this.data.formId;
  categoryID: number = this.data.catID;
  categoryName: string = this.data.catName;
  constructor(
    private dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _CategoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.newCategory.patchValue({
      name: this.categoryName,
    });
  }

  closeDialog() {
    this.dialogRef.close();
    this.addCategorySub.unsubscribe();
  }
  newCategory = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(256),
      Validators.minLength(3),
    ]),
  });

  addCategory(data: FormGroup) {
    if (this.newCategory.invalid) {
      this.newCategory.markAllAsTouched();
      return;
    }

    if (this.formNumber === 1) {
      this.addCategorySub = this._CategoryService
        .addNewCategory(data.value)
        .subscribe({
          next: (res: any) => {
            this.toastr.success(
              `add ${res.name} success id:${res.id}`,
              'success!'
            );
          },
        });
    } else if (this.formNumber === 2) {
      this.addCategorySub = this._CategoryService
        .editCategory(data.value, this.categoryID)
        .subscribe({
          next: (res: any) => {
            this.toastr.success(
              `update ${res.name} success id:${res.id}`,
              'success!'
            );
          },
        });
    }
  }
}
