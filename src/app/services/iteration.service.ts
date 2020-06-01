import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase
} from "@angular/common/http";
import { IterationReport } from "../dto/iterationReport";
import { mergeMap as _observableMergeMap, catchError as _observableCatch, publishReplay, refCount } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { environment } from "src/environments/environment";
import { ApiException } from '../tfs-reports/tfs-report-service.';
import { APIS } from 'src/app/constant';

@Injectable({
  providedIn: "root"
})
export class IterationService {
  _http: HttpClient;

  private baseUrl = environment.baseUrl;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(http: HttpClient) {
    this._http = http;
  }

  getCurrent(data): Observable<IterationReport> {
    //console.log(data);
    let url_ = this.baseUrl + "/api/Iteration/Current";
    url_ = url_.replace(/[?&]$/, "");

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    // console.log(url_);

    return this._http.post<IterationReport>(url_, data, httpOptions);
  }

  getCurrent2(userSettings): Observable<IterationReport> {
    let url_ = this.baseUrl + "/api/Iteration/Current2";

    //const content_ = JSON.stringify(userSettings);
    const content_ = userSettings;

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json"
      })
    };

    return this._http.request("post", url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processRequest(response_);
        }),

      )
      .pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
          try {
            return this.processRequest(<any>response_);
          }
          catch (e) {
            return <Observable<number>><any>_observableThrow(e);
          }
        }
        else
          return <Observable<number>><any>_observableThrow(response_);
      }));
  }

  getAllPending(data): Observable<IterationReport> {
    let url_ = this.baseUrl + "/api/Iteration/AllPending";
    url_ = url_.replace(/[?&]$/, "");

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this._http.post<IterationReport>(url_, data, httpOptions);
  }

  getAllPending2(userSettings) {

    let url_ = this.baseUrl + "/api/Iteration/AllPending2";

    //const content_ = JSON.stringify(userSettings);
    const content_ = userSettings;

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json"
      })
    };

    return this._http.request("post", url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processRequest(response_);
        }),

      )
      .pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
          try {
            return this.processRequest(<any>response_);
          }
          catch (e) {
            return <Observable<number>><any>_observableThrow(e);
          }
        }
        else
          return <Observable<number>><any>_observableThrow(response_);
      }));
  }

  getBugsForDashboard(): Observable<any> {
    const url_ = environment.baseUrl + APIS.BUG_REPORT;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    return this._http.get<any>(url_, httpOptions);
  }



  protected processRequest(response: HttpResponseBase): Observable<any> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {};

    if (response.headers) {
      for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }
    }
    if (status === 200) {
      return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        result200 = _responseText === "" ? null : <any>JSON.parse(_responseText, this.jsonParseReviver);
        return _observableOf(result200);
      }));
    }
    else if (status === 500) {
      return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return this.throwException("A server side error occurred.", status, _responseText, _headers);
      }));
    }
    else if (status !== 200 && status !== 204) {
      return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return this.throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<any>(<any>null);
  }

  protected throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
      return _observableThrow(result);
    else
      return _observableThrow(new ApiException(message, status, response, headers, null));
  }

  protected blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
      if (!blob) {
        observer.next("");
        observer.complete();
      } else {
        let reader = new FileReader();
        reader.onload = event => {
          observer.next((<any>event.target).result);
          observer.complete();
        };
        reader.readAsText(blob);
      }
    });
  }
}
