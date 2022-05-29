import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationServiceService {
    visitorEduData:any[]=[];
    private url="https://warm-depths-51075.herokuapp.com/education/info"
    constructor(private http:HttpClient) { }

  obtenerDatosEducacion(id:number):Observable<any[]>{
    return this.http.post<any[]>(this.url, {id:id});
  }
  
  crearDatosEducacion(education:any):Observable<any[]>{
    return this.http.post<any[]>("https://warm-depths-51075.herokuapp.com/education/create", education);
  }

  eliminarDatoEducacion(id:number):Observable<any[]>{

    return this.http.delete<any[]>("https://warm-depths-51075.herokuapp.com/education/erase", {body:id});
  }
  
  editarDatoEducacion(update:any):Observable<any[]>{
    // const headers = { 'Access-Control-Allow-Origin': 'http://localhost:8080/education/udpate', "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE"};
    return this.http.put<any[]>("https://warm-depths-51075.herokuapp.com/education/update", update);
  }

  brindarEducacionVisitante(id:number): void {
    this.http.post<any[]>(this.url, {id:id}).subscribe(data=> this.visitorEduData= data);
  }

  obtenerDatosEducacionVisitante():any[]{
    return this.visitorEduData
  }
}
