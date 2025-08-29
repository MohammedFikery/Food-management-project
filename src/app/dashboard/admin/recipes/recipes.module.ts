import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditRecipesComponent } from './components/add-edit-recipes/add-edit-recipes.component';
import { ViewRecipesComponent } from './components/view-recipes/view-recipes.component';

@NgModule({
  declarations: [RecipesComponent, AddEditRecipesComponent, ViewRecipesComponent],
  imports: [CommonModule, RecipesRoutingModule, SharedModule],
})
export class RecipesModule {}
