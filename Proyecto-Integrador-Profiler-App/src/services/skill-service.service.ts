import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillServiceService {
  private url="http://localhost:8080/skill/info"
  constructor(private http:HttpClient) { }

obtenerDatosSkill(id:number):Observable<any[]>{
  return this.http.post<any[]>(this.url, {id:id});
}

crearDatosSkill(education:any):Observable<any[]>{
  return this.http.post<any[]>("http://localhost:8080/skill/create", education);
}

eliminarDatoSkill(id:number):Observable<any[]>{
  return this.http.delete<any[]>("http://localhost:8080/skill/erase", {body:id});
}
editarDatoSkill(update:any):Observable<any[]>{
  return this.http.put<any[]>("http://localhost:8080/skill/update", update);
}
}
