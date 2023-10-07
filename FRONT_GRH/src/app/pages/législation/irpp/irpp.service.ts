import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Irpp } from './irpp.model';
@Injectable({
    providedIn: 'root'
  })
  export class Irppservice{
    constructor(private http:HttpClient) { }
    //console.log(this.auth.currentUserValue.societe_id);
    GetIrpp(societe):Observable<any>{
      return this.http.get<any>("http://localhost:49366/irpps/"+societe);
      }
      GetIrppbyid(id):Observable<any>{
        return this.http.get<any>("http://localhost:49366/irpp_byid/"+id);
        }
     
    AddIrpp(irpp:any,societe):Observable<any>{
        return this.http.post<any>("http://localhost:49366/irpp_add/"+societe,irpp);
    }

    deleteirpp(id:any):Observable<any>{

      return this.http.delete<any>("http://localhost:49366/irpp_delete/"+id);  
}
updateirpp(irpp){  
  return this.http.put<any>("http://localhost:49366/irpp_update",irpp);
 }




  }