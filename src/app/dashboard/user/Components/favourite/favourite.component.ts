import { UserRecipesService } from 'src/app/dashboard/user/Services/user-recipes.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  ICategoryData,
  ICategory,
} from 'src/app/dashboard/admin/category/InterFaces/icategory';
import { CategoryService } from 'src/app/dashboard/admin/category/Services/category.service';
import { ViewRecipesComponent } from 'src/app/dashboard/admin/recipes/components/view-recipes/view-recipes.component';
import {
  IRecipesData,
  IRecipes,
  Tag,
} from 'src/app/dashboard/admin/recipes/interfaces/irecipes';
import { RecipesService } from 'src/app/dashboard/admin/recipes/Services/recipes.service';
import { DeleteItemComponent } from 'src/app/shared/components/delete-item/delete-item.component';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent implements OnInit, OnDestroy {
  private readonly _RecipesService = inject(RecipesService);
  private readonly _CategoryService = inject(CategoryService);
  private readonly _UserRecipesService = inject(UserRecipesService);

  private FavSub?: Subscription;
  private allTagsSub?: Subscription;
  private categorySub?: Subscription;

  pageNumber = 1;
  pageSize = 10;
  tagId: number | null = null;
  categoryId: number | null = null;
  recipesId = 0;
  totalNumberOfRecords = 0;
  name = '';
  CategoryData: ICategoryData[] = [];
  AllTags: Tag[] = [];
  RecipesData!: IRecipesData;
  listData: any[] = [];
  listFilterData: any[] = [];
  showFirstLastButtons = true;
  readonly dialog = inject(MatDialog);
  viewMode: 'grid' | 'list' = 'grid';

  openDeleteDialog(data: IRecipes) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      panelClass: 'delete-dialog',
      disableClose: true,
      data: { parm: data, formName: 'recipes' },
    });
    dialogRef.afterClosed().subscribe(() => this.getFavRecipes());
  }

  openViewDialog(data: IRecipes) {
    const dialogRef = this.dialog.open(ViewRecipesComponent, {
      disableClose: true,
      data: { parm: data },
    });
    dialogRef.afterClosed().subscribe(() => this.getFavRecipes());
  }

  getFavRecipes() {
    this.FavSub = this._UserRecipesService.GetFavoriteRecipes().subscribe({
      next: (res: any) => {
        this.RecipesData = res;
        this.listData = res.data ?? [];
        this.totalNumberOfRecords = res.totalNumberOfRecords ?? 0;
        this.applyFilters();
      },
    });
  }

  applyFilters() {
    this.listFilterData = this.listData.filter((x: any) => {
      const matchName = this.name
        ? x.recipe.name.toLowerCase().includes(this.name.toLowerCase())
        : true;

      const matchTag = this.tagId ? x.recipe.tag.id === this.tagId : true;

      const matchCategory = this.categoryId
        ? x.recipe.category &&
          x.recipe.category.some((c: any) => c.id === this.categoryId)
        : true;

      return matchName && matchTag && matchCategory;
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
    const categoryPram = {
      pageSize: 1000000,
      pageNumber: 1,
      name: '',
    };
    this.categorySub = this._CategoryService
      .getAllCategory(categoryPram)
      .subscribe({
        next: (res: ICategory | any) => {
          this.CategoryData = res.data ?? [];
        },
      });
  }

  ngOnInit(): void {
    this.getFavRecipes();
    this.getAllTags();
    this.getCategory();
  }

  ngOnDestroy(): void {
    this.FavSub?.unsubscribe();
    this.allTagsSub?.unsubscribe();
    this.categorySub?.unsubscribe();
  }

  handlePageEvent(e: any) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    this.getFavRecipes();
  }

  RemoveFromFavorite(id: number) {
    this._UserRecipesService.RemoveFromFavorite(id).subscribe({
      next: () => {
        this.listData = this.listData.filter((x: any) => x.id !== id);
        this.applyFilters();
      },
    });
  }
}
