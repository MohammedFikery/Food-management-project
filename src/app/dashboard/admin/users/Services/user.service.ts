import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly _HttpClient: HttpClient) {}

  gatAllUSer(data: any): Observable<any> {
    return this._HttpClient.get('Users', { params: data });
  }
  deleteUser(userID: number): Observable<any> {
    return this._HttpClient.delete(`Users/${userID}`);
  }
}
