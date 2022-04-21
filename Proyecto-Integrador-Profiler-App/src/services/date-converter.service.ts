import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateConverterService {

  constructor() { }

  convert(date:string){
    if(date==""||date==null) return date;
    date=date.split("-").reverse().join("-")
    return date;
  }

  undoConvert(date:string){
    if(date==""||date==null) return date;
    date=date.split("-").reverse().join("-")
    return date;
  }
}
