import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Parenttask } from './parenttask';
import { Observable, throwError } from 'rxjs';
import { ResultData } from './resultdata';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParenttaskService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  
  constructor(private httpClient: HttpClient) { }

  getByParentTaskId(id: number) : Observable<Parenttask> {
    return this.makeRequest(`getByParentTaskId/${id}`);
  }

  getAllParentTasks() : Observable<Parenttask[]> {
    return this.makeRequest(`getAllParentTasks`);
  }
  
  private makeRequest(path: string): Observable<any> {
    let url = `http://localhost:9092/parentTask/${path}`;
    return this.httpClient.get<any>(url);
  }

  saveParentTask(parentTask: Parenttask): Observable<Parenttask>{
    let url = `http://localhost:9092/parentTask/saveParentTask`;
    return this.httpClient.post<Parenttask>(url, parentTask, this.httpOptions).pipe(
        catchError(this.handleError));
  }

  deleteParentTask(id: Number): Observable<ResultData>{
    let url = `http://localhost:9092/parentTask/deleteParentTask/${id}`;
    return this.httpClient.delete<ResultData>(url).pipe(
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
