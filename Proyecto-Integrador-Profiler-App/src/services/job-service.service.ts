import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobServiceService {
  private url="http://localhost:8080/job/info"
  constructor(private http:HttpClient) { }

obtenerDatosJob(id:number):Observable<any[]>{
  return this.http.post<any[]>(this.url, {id:id});
}

crearDatosJob(job:any):Observable<any[]>{
  return this.http.post<any[]>("http://localhost:8080/job/create", job);
}

eliminarDatoJob(id:number):Observable<any[]>{ 

  return this.http.delete<any[]>("http://localhost:8080/job/erase", {body:id});
}
editarDatoJob(update:any):Observable<any[]>{
  return this.http.put<any[]>("http://localhost:8080/job/update", update);
}
}
