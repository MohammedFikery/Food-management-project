import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { Tag } from '../../interfaces/irecipes';
import { RecipesService } from '../../Services/recipes.service';

import {
  ICategory,
  ICategoryData,
} from '../../../category/InterFaces/icategory';
import { CategoryService } from '../../../category/Services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-recipes',
  templateUrl: './add-edit-recipes.component.html',
  styleUrls: ['./add-edit-recipes.component.scss'],
})
export class AddEditRecipesComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.allTagsSub?.unsubscribe();
    this.categorySub?.unsubscribe();
    this.getRecipesSub?.unsubscribe();
    this.addEditRecipesSub?.unsubscribe();
  }
  ngOnInit(): void {
    this.getAllTags();
    this.getCategory();
    this.recipesId = this._ActivatedRoute.snapshot.params['id'];
    this.getRecipes();
  }
  files: File[] = [];
  private allTagsSub?: Subscription;
  private categorySub!: Subscription;
  private getRecipesSub!: Subscription;
  private addEditRecipesSub!: Subscription;
  imgSrc: any;
  private readonly _RecipesService = inject(RecipesService);
  private readonly _CategoryService = inject(CategoryService);
  private readonly toastr = inject(ToastrService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  recipesId: number = 0;
  recipesData: any;

  AllTags: Tag[] = [];
  listData: ICategoryData[] = [];

  recipesForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    description: new FormControl('', Validators.maxLength(250)),
    price: new FormControl('', [Validators.required]),
    tagId: new FormControl('', [Validators.required]),
    categoriesIds: new FormControl([], [Validators.required]),
  });

  onSelect(event: any) {
    const selectedFile = event.addedFiles[0];
    if (selectedFile) {
      this.files = [selectedFile];
    }
    this.imgSrc = this.files[0];
  }
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  getAllTags() {
    this.allTagsSub = this._RecipesService.GetAllTags().subscribe({
      next: (res: Tag[]) => {
        this.AllTags = res;
      },
    });
  }
  getRecipes() {
    if (this.recipesId > 0) {
      this.getRecipesSub = this._RecipesService
        .getRecipes(this.recipesId)
        .subscribe({
          next: (res: any) => {
            this.recipesData = res;
            this.recipesForm.patchValue({
              name: res.name,
              description: res.description,
              price: res.price,
              tagId: res.tag.id,
              categoriesIds: res.category.map((x: any) => x.id),
            });

            if (res.imagePath) {
              const imageUrl = `https://upskilling-egypt.com:3006/${res.imagePath}`;

              fetch(imageUrl)
                .then((imgRes) => imgRes.blob())
                .then((blob) => {
                  const file = new File([blob], 'recipe-image.jpg', {
                    type: blob.type,
                  });
                  this.files = [file];
                });
            }
          },
        });
    }
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
          this.listData = res.data;
        },
      });
  }
  addRecipes(data: FormGroup) {
    if (this.recipesForm.invalid) {
      this.recipesForm.markAllAsTouched();
      return;
    }
    let myData = new FormData();

    myData.append('name', data.value.name);
    myData.append('description', data.value.description);
    myData.append('price', data.value.price);
    myData.append('tagId', data.value.tagId);
    myData.append('categoriesIds', data.value.categoriesIds);
    myData.append('recipeImage', this.files[0]);

    if (this.recipesId > 0) {
      this.addEditRecipesSub = this._RecipesService
        .EditRecipes(myData, this.recipesId)
        .subscribe({
          next: (res) => {
            this.toastr.success(res.message, 'success!');
          },
        });
    } else {
      this.addEditRecipesSub = this._RecipesService
        .addNewRecipes(myData)
        .subscribe({
          next: (res) => {
            this.toastr.success(res.message, 'success!');
            this.recipesForm.reset();
          },
        });
    }
  }
}
