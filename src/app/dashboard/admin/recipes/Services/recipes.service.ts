import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../../category/InterFaces/icategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private readonly _HttpClient: HttpClient) {}
  getAllRecipes(data: any): Observable<any> {
    return this._HttpClient.get('Recipe', { params: data });
  }
  GetAllTags(): Observable<any> {
    return this._HttpClient.get('tag/');
  }

  addNewRecipes(data: any): Observable<any> {
    return this._HttpClient.post('Recipe/', data);
  }
  EditRecipes(data: any, id: number): Observable<any> {
    return this._HttpClient.put(`Recipe/${id}`, data);
  }
  getRecipes(id: number): Observable<any> {
    return this._HttpClient.get(`Recipe/${id}`);
  }
  deleteRecipes(recipesID: number): Observable<any> {
    return this._HttpClient.delete(`Recipe/${recipesID}`);
  }
}
