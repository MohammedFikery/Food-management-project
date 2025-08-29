import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CategoryService } from './Services/category.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ICategory, ICategoryData } from './InterFaces/icategory';
import { MatDialog } from '@angular/material/dialog';
import { HomeComponent } from 'src/app/shared/components/home/home.component';
import { AddEditCategoryComponent } from './Components/add-edit-category/add-edit-category.component';
import { DeleteItemComponent } from 'src/app/shared/components/delete-item/delete-item.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnDestroy, OnInit {
  private readonly _CategoryService = inject(CategoryService);
  private categorySub!: Subscription;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalNumberOfRecords: number = 0;
  name: string = '';

  CategoryData!: ICategory;
  listData: ICategoryData[] = [];
  showFirstLastButtons = true;

  readonly dialog = inject(MatDialog);
  openDialog(
    formID: number,
    categoryId: number = 0,
    categoryName: string | null = ''
  ) {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      panelClass: 'custom-dialog',
      disableClose: true,
      data: { formId: formID, catID: categoryId, catName: categoryName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategory();
    });
  }

  openDeleteDialog(data: ICategoryData) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      panelClass: 'delete-dialog',
      disableClose: true,
      data: { parm: data, formName: 'category' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategory();
    });
  }

  getCategory() {
    let categoryPram = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.name,
    };
    this.categorySub = this._CategoryService
      .getAllCategory(categoryPram)
      .subscribe({
        next: (res: ICategory | any) => {
          this.CategoryData = res;
          this.listData = res.data;
          this.totalNumberOfRecords = res.totalNumberOfRecords;
        },
      });
  }
  ngOnInit(): void {
    this.getCategory();
  }
  ngOnDestroy(): void {
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
  }
  handlePageEvent(e: any) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    this.getCategory();
  }
}
