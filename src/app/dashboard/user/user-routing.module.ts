import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { RecipesUSerComponent } from './Components/recipes-user/recipes-user.component';
import { FavouriteComponent } from './Components/favourite/favourite.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipesUser', pathMatch: 'full' },
  { path: 'recipesUser', component: RecipesUSerComponent },
  { path: 'favorite', component: FavouriteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
