import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpPrefixInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<Request>,
    next: HttpHandler
  ): Observable<HttpEvent<Request>> {
    const reqAllRequierments = req.clone({
      url: `https://cors-anywhere.herokuapp.com/http://metaweather.com/${req.url}`,
    });

    return next.handle(reqAllRequierments);
  }
}
