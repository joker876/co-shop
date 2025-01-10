import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { smartDeserialize } from '../utils/deserializer-utils';

@Injectable()
export class DeserializationInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse && event.body && typeof event.body === 'object' && event.body instanceof Blob === false) {
          const newBody = smartDeserialize(event.body);
          return event.clone({ body: newBody });
        }
        return event;
      })
    );
  }
}
