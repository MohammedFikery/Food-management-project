import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApisService {
  constructor(private readonly _HttpClient: HttpClient) {
    if (localStorage.getItem('userToken') !== null) this.getProfile();
  }
  public email: string | any = '';

  login(data: object): Observable<any> {
    return this._HttpClient.post(`Users/Login`, data);
  }
  getProfile() {
    let encoded: any = localStorage.getItem('userToken');
    let decoded: any = jwtDecode(encoded);
    localStorage.setItem('role', decoded.userGroup);
    localStorage.setItem('userName', decoded.userName);

    console.log(decoded);
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
