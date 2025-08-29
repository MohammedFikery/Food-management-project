import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRecipesService {
  constructor(private readonly _HttpClient: HttpClient) {}
  addToFavorite(data: object): Observable<any> {
    return this._HttpClient.post('userRecipe/', data);
  }
  GetFavoriteRecipes(): Observable<any> {
    return this._HttpClient.get('userRecipe/');
  }
  RemoveFromFavorite(id: number): Observable<any> {
    return this._HttpClient.delete(`userRecipe/${id}`);
  }
}
