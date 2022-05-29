import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillServiceService {
  visitorSkillData:any[]=[];
  private url="https://warm-depths-51075.herokuapp.com/skill/info"
  constructor(private http:HttpClient) { }

obtenerDatosSkill(id:number):Observable<any[]>{
  return this.http.post<any[]>(this.url, {id:id});
}

crearDatosSkill(education:any):Observable<any[]>{
  return this.http.post<any[]>("https://warm-depths-51075.herokuapp.com/skill/create", education);
}

eliminarDatoSkill(id:number):Observable<any[]>{
  return this.http.delete<any[]>("https://warm-depths-51075.herokuapp.com/skill/erase", {body:id});
}

editarDatoSkill(update:any):Observable<any[]>{
  return this.http.put<any[]>("https://warm-depths-51075.herokuapp.com/skill/update", update);
}

brindarSkillVisitante(id:number): void {
  this.http.post<any[]>(this.url, {id:id}).subscribe(data=> this.visitorSkillData= data);
}

obtenerDatosSkillVisitante():any[]{
  return this.visitorSkillData
}
}
