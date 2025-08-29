import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { RecipesUSerComponent } from './Components/recipes-user/recipes-user.component';
import { FavouriteComponent } from './Components/favourite/favourite.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UserComponent, RecipesUSerComponent, FavouriteComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
