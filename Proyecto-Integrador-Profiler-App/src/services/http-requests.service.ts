import { Injectable, Output, EventEmitter } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
  @Output() send : EventEmitter<any>= new EventEmitter();
  private apiGetUser: string = 'http://localhost:8080/';
  currentUser:BehaviorSubject<any>;

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
    this.currentUser=new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("userIdPortfolio")||"{}"));
  }

  loginUser (email:string, password:string): Observable<any> {
    let user= this.http
      .post<any>(this.apiGetUser+"user/login/", {email, password}, this.httpOptions).pipe(map(data=>{
        sessionStorage.setItem("userIdPortfolio", JSON.stringify(data));
        this.currentUser.next(data);
        return data;
      }))
      .pipe(catchError(this.handleError));
    return user;
  }

  signUpUser(email:string, password:string, name:string){
    return this.http.post(this.apiGetUser+"creador", {email, password, name}, this.httpOptions)
    .pipe(catchError(this.handleError))
  }

  getcurrentUser(){
    return this.currentUser.value;
  }

}
