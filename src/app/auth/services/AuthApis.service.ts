import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApisService {
  constructor(private readonly _HttpClient: HttpClient) {}

  login(data: object): Observable<any> {
    return this._HttpClient.post(`Users/Login`, data);
  }
  Register(data: object): Observable<any> {
    return this._HttpClient.post(`Users/Register`, data);
  }
  verify(data: object): Observable<any> {
    return this._HttpClient.put(`Users/verify`, data);
  }
  forgot(data: object): Observable<any> {
    return this._HttpClient.post(`Users/Reset/Request`, data);
  }
  resetPassword(data: object): Observable<any> {
    return this._HttpClient.post(`Users/Reset`, data);
  }
}
