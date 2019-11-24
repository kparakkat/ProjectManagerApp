import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ResultData } from './resultdata';
import { catchError } from 'rxjs/operators';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  
  constructor(private httpClient: HttpClient) { }

  getProjectById(projectId: number) : Observable<Project> {
    return this.makeRequest(`getByProjectId/${projectId}`);
  }

  getAllProjects() : Observable<Project[]> {
    return this.makeRequest(`getAllProjects`);
  }
  
  private makeRequest(path: string): Observable<any> {
    let url = `http://localhost:9092/project/${path}`;
    return this.httpClient.get<any>(url);
  }

  addProject(project: Project): Observable<ResultData>{
    let url = `http://localhost:9092/project/addProject`;
    return this.httpClient.post<ResultData>(url, project, this.httpOptions).pipe(
        catchError(this.handleError));
  }

  editProject(project: Project): Observable<ResultData>{
    let url = `http://localhost:9092/project/updateProject`;
    return this.httpClient.put<ResultData>(url, project, this.httpOptions).pipe(
        catchError(this.handleError));
  }

  deleteProject(projectId: Number): Observable<ResultData>{
    let url = `http://localhost:9092/project/deleteProject/${projectId}`;
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
