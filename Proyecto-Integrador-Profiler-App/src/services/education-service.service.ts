import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationServiceService {
    private url="http://localhost:8080/education/info"
    constructor(private http:HttpClient) { }

  obtenerDatosEducacion(id:number):Observable<any[]>{
    return this.http.post<any[]>(this.url, {id:id});
  }
  
  crearDatosEducacion(education:any):Observable<any[]>{
    return this.http.post<any[]>("http://localhost:8080/education/create", education);
  }

  eliminarDatoEducacion(id:number):Observable<any[]>{

    return this.http.delete<any[]>("http://localhost:8080/education/erase", {body:id});
  }
  editarDatoEducacion(update:any):Observable<any[]>{
    // const headers = { 'Access-Control-Allow-Origin': 'http://localhost:8080/education/udpate', "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE"};
    return this.http.put<any[]>("http://localhost:8080/education/update", update);
  }
}
