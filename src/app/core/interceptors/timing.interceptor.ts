import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const start: number = Date.now();
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if ((event as HttpResponse<any>).url?.includes('products')) {
          console.log('Request completed in ' + (Date.now() - start) + ' ms');
        }
      })
    );
  }
}
