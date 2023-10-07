import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
@Injectable({
    providedIn: 'root'
  })
  export class calendrierservice{
    constructor(private http:HttpClient) { }
    Getcalendrier(shift):Observable<any>{
      return this.http.get<any>("http://localhost:49366/calendrier/"+shift);
      }
      addcalendrier(cl){
        return this.http.post("http://localhost:49366/calendrier/add",cl);
    }
    deletecalendrier(id:any):Observable<any>{

      return this.http.delete<any>("http://localhost:49366/calendrier/delete/"+id);  
    }

    updatecalendrier(cl,id){  
      return this.http.put<any>("http://localhost:49366/calendrier/update/"+id,cl);
     }
     
  




  }