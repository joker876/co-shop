import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

type _AngularHttpClientOptions = {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body' | 'events' | 'response';
  params?:
    | HttpParams
    | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private _http = inject(HttpClient);

  get<R = any>(url: string, options: _AngularHttpClientOptions = {}) {
    options = { withCredentials: true, ...options };
    return this._http.get<R>(url, options as any);
  }
  post<B = undefined, R = any>(url: string, body: B, options: _AngularHttpClientOptions = {}) {
    options = { withCredentials: true, ...options };
    return this._http.post<R>(url, body, options as any);
  }
  put<B = undefined, R = any>(url: string, body: B, options: _AngularHttpClientOptions = {}) {
    options = { withCredentials: true, ...options };
    return this._http.put<R>(url, body, options as any);
  }
  patch<B = undefined, R = any>(url: string, body: B, options: _AngularHttpClientOptions = {}) {
    options = { withCredentials: true, ...options };
    return this._http.patch<R>(url, body, options as any);
  }
  delete<R = any>(url: string, options: _AngularHttpClientOptions = {}) {
    options = { withCredentials: true, ...options };
    return this._http.delete<R>(url, options as any);
  }
  head<R = any>(url: string, options: _AngularHttpClientOptions = {}) {
    options = { withCredentials: true, ...options };
    return this._http.head<R>(url, options as any);
  }
  options<R = any>(url: string, options: _AngularHttpClientOptions = {}) {
    options = { withCredentials: true, ...options };
    return this._http.options<R>(url, options as any);
  }
}
