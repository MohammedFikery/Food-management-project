import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  public baseurl: string = 'https://upskilling-egypt.com:3006/api/v1/';
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this._NgxSpinnerService.show();
    let myRequest = request.clone({
      url: this.baseurl + request.url,
      setHeaders: {
        Authorization: `${localStorage.getItem('userToken')}`,
      },
    });
    return next.handle(myRequest).pipe(
      finalize(() => {
        this._NgxSpinnerService.hide();
      })
    );
  }
}
