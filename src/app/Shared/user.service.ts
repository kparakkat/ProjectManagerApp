import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';
import { ResultData } from './resultdata';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  
  constructor(private httpClient: HttpClient) { }

  getUserById(userId: number) : Observable<User> {
    return this.makeRequest(`getById/${userId}`);
  }

  getAllUsers() : Observable<User[]> {
    return this.makeRequest(`all`);
  }
  
  private makeRequest(path: string): Observable<any> {
    let url = `http://localhost:9092/user/${path}`;
    return this.httpClient.get<any>(url);
  }

  addUser(user: User): Observable<ResultData>{
    let url = `http://localhost:9092/user/addUser`;
    // return this.httpClient.post<User>(url, user, this.httpOptions);
    return this.httpClient.post<ResultData>(url, user, this.httpOptions).pipe(
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
