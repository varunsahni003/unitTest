import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {

  constructor(private _http: HttpClient) {}

  fetch(url: any) {
    return this._http.get(url).pipe(map(data => data), catchError((e: any) => Observable.throw(e)));
  }

  // private handleError(error: any): void { }
}
