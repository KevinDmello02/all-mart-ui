import { Injectable } from '@angular/core';

import { Observable, of, Subject, throwError } from 'rxjs';
import { tap, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchProductService {

  apiUrl = environment.apiURL;

  constructor(
    private http: HttpClient
  ) { }

  getProductDetailsForDmart(payload):Observable<any> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.post(this.apiUrl + 'dmartProducts/getProductDetails', payload, { 'headers': headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = `An error occurred in getProductDetails: ${err.error.message}`
    console.log(`An error occurred in getProductDetails: ${err.error.message}`)
    return throwError(errorMessage)
  }
}
