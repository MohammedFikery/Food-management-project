import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/notFound/notFound.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', component: NotFoundComponent, title: 'Not Founded ' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
