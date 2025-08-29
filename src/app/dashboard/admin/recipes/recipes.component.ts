import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemComponent } from 'src/app/shared/components/delete-item/delete-item.component';
import { RecipesService } from './Services/recipes.service';
import { IRecipes, IRecipesData, Tag } from './interfaces/irecipes';
import { AddEditRecipesComponent } from './components/add-edit-recipes/add-edit-recipes.component';
import { ICategory, ICategoryData } from '../category/InterFaces/icategory';
import { CategoryService } from '../category/Services/category.service';
import { ViewRecipesComponent } from './components/view-recipes/view-recipes.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  private readonly _RecipesService = inject(RecipesService);
  private readonly _CategoryService = inject(CategoryService);

  private RecipesSub?: Subscription;
  private allTagsSub?: Subscription;
  private categorySub!: Subscription;

  pageNumber = 1;
  pageSize = 10;
  tagId: number | '' = '';
  categoryId: number | '' = '';
  recipesId = 0;
  totalNumberOfRecords = 0;
  name = '';
  RecipesData!: IRecipesData;
  listData: IRecipes[] = [];
  CategoryData: ICategoryData[] = [];
  AllTags: Tag[] = [];
  showFirstLastButtons = true;

  readonly dialog = inject(MatDialog);

  openDeleteDialog(data: IRecipes) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      panelClass: 'delete-dialog',
      disableClose: true,
      data: { parm: data, formName: 'recipes' },
    });

    dialogRef.afterClosed().subscribe(() => this.getRecipes());
  }
  openViewDialog(data: IRecipes) {
    const dialogRef = this.dialog.open(ViewRecipesComponent, {
      disableClose: true,
      data: { parm: data },
    });

    dialogRef.afterClosed().subscribe(() => this.getRecipes());
  }

  getRecipes() {
    const RecipesPram = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.name,
      tagId: this.tagId,
      categoryId: this.categoryId,
      recipesId: this.recipesId,
    };

    this.RecipesSub = this._RecipesService
      .getAllRecipes(RecipesPram)
      .subscribe({
        next: (res: IRecipesData) => {
          console.log('res', res);
          this.RecipesData = res;
          this.listData = res.data;

          this.totalNumberOfRecords = res.totalNumberOfRecords;
        },
      });
  }

  getAllTags() {
    this.allTagsSub = this._RecipesService.GetAllTags().subscribe({
      next: (res: Tag[]) => {
        this.AllTags = res;
      },
    });
  }
  getCategory() {
    let categoryPram = {
      pageSize: 1000000,
      pageNumber: 1,
      name: '',
    };
    this.categorySub = this._CategoryService
      .getAllCategory(categoryPram)
      .subscribe({
        next: (res: ICategory | any) => {
          this.CategoryData = res.data;
        },
      });
  }
  ngOnInit(): void {
    this.getRecipes();
    this.getAllTags();
    this.getCategory();
  }

  ngOnDestroy(): void {
    this.RecipesSub?.unsubscribe();
    this.allTagsSub?.unsubscribe();
    this.categorySub?.unsubscribe();
  }

  handlePageEvent(e: any) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    this.getRecipes();
  }
}
