import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Task } from './task';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResultData } from './resultdata';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  
  constructor(private httpClient: HttpClient) { }

  getTaskById(taskId: number) : Observable<Task> {
    return this.makeRequest(`getByTaskId/${taskId}`);
  }

  getAllTasks() : Observable<Task[]> {
    return this.makeRequest(`getAllTasks`);
  }

  getTasksByProjectId(projectId: number) : Observable<Task[]> {
    return this.makeRequest(`getByProjectId/${projectId}`);
  }
  
  private makeRequest(path: string): Observable<any> {
    let url = `http://localhost:9092/task/${path}`;
    return this.httpClient.get<any>(url);
  }

  saveTask(task: Task): Observable<Task>{
    let url = `http://localhost:9092/task/saveTask`;
    return this.httpClient.post<Task>(url, task, this.httpOptions).pipe(
        catchError(this.handleError));
  }

  deleteTask(taskId: Number): Observable<ResultData>{
    let url = `http://localhost:9092/task/deleteTask/${taskId}`;
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
