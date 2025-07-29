import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  baseurl: string = 'https://upskilling-egypt.com:3006/api/v1/';
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let myRequest = request.clone({
      url: this.baseurl + request.url,
    });
    return next.handle(myRequest);
  }
}
