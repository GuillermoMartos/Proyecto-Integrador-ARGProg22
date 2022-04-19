import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  private url="http://localhost:8080/project/info"
  constructor(private http:HttpClient) { }

obtenerDatosProject(id:number):Observable<any[]>{
  return this.http.post<any[]>(this.url, {id:id});
}

crearDatosProject(project:any):Observable<any[]>{
  return this.http.post<any[]>("http://localhost:8080/project/create", project);
}

eliminarDatoProject(id:number):Observable<any[]>{ 

  return this.http.delete<any[]>("http://localhost:8080/project/erase", {body:id});
}
editarDatoProject(update:any):Observable<any[]>{
  return this.http.put<any[]>("http://localhost:8080/project/update", update);
}
}
