import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestsService } from './http-requests.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorJWTService implements HttpInterceptor{

  constructor(private login:HttpRequestsService) { 
    console.log("soy el interceptor cirroendo!!!! ")
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let currentUser= this.login.getcurrentUser();
    if(currentUser && currentUser.accessToken){
      req= req.clone({
        setHeaders:{
          Authorization:`Bearer ${currentUser.accessToken}`
        }
      })
    }
    console.log("soy el req interceptado!: " + req)
    console.log("soy el currentUser interceptado!: " + currentUser)
    console.log("mirá esto: " + JSON.stringify(currentUser))

    return next.handle(req);
    throw new Error('Method not implemented.');
  }
}
