import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobServiceService {
  visitorJobData:any[]=[];
  private url="https://warm-depths-51075.herokuapp.com/job/info"
  constructor(private http:HttpClient) { }

obtenerDatosJob(id:number):Observable<any[]>{
  return this.http.post<any[]>(this.url, {id:id});
}

crearDatosJob(job:any):Observable<any[]>{
  return this.http.post<any[]>("https://warm-depths-51075.herokuapp.com/job/create", job);
}

eliminarDatoJob(id:number):Observable<any[]>{ 

  return this.http.delete<any[]>("https://warm-depths-51075.herokuapp.com/job/erase", {body:id});
}
editarDatoJob(update:any):Observable<any[]>{
  return this.http.put<any[]>("https://warm-depths-51075.herokuapp.com/job/update", update);
}

brindarJobVisitante(id:number): void {
    this.http.post<any[]>(this.url, {id:id}).subscribe(data=> this.visitorJobData= data);
}

obtenerDatosJobVisitante():any[]{
    return this.visitorJobData
}
}
