import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { smartDeserialize } from './deserializer-utils';

@Injectable()
export class DeserializationInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse && event.body) {
          const newBody = smartDeserialize(event.body);
          return event.clone({ body: newBody });
        }
        return event;
      })
    );
  }
}
