import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly HttpClient: HttpClient) {}
  getAllCategory(data: any): Observable<any> {
    return this.HttpClient.get('Category', { params: data });
  }
  addNewCategory(data: string): Observable<any> {
    return this.HttpClient.post(`Category/`, data);
  }
  editCategory(data: string, catId: number): Observable<any> {
    return this.HttpClient.put(`Category/${catId}`, data);
  }
  deleteCategory(catId: number): Observable<any> {
    return this.HttpClient.delete(`Category/${catId}`);
  }
}
