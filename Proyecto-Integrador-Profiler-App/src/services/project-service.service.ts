import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  visitorProjectData:any[]=[];
  private url="https://warm-depths-51075.herokuapp.com/project/info"
  constructor(private http:HttpClient) { }

obtenerDatosProject(id:number):Observable<any[]>{
  return this.http.post<any[]>(this.url, {id:id});
}

crearDatosProject(project:any):Observable<any[]>{
  return this.http.post<any[]>("https://warm-depths-51075.herokuapp.com/project/create", project);
}

eliminarDatoProject(id:number):Observable<any[]>{ 

  return this.http.delete<any[]>("https://warm-depths-51075.herokuapp.com/project/erase", {body:id});
}

editarDatoProject(update:any):Observable<any[]>{
  return this.http.put<any[]>("https://warm-depths-51075.herokuapp.com/project/update", update);
}

brindarProjectVisitante(id:number): void {
  this.http.post<any[]>(this.url, {id:id}).subscribe(data=> this.visitorProjectData= data);
}

obtenerDatosProjectVisitante():any[]{
  return this.visitorProjectData
}
}
