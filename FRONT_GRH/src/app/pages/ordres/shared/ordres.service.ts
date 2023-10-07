import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
@Injectable({
    providedIn: 'root'
  })
  export class ordresservice{
    constructor(private http:HttpClient) { }
    Getmois():Observable<any>{
        return this.http.get<any>("http://localhost:49366/mois");
        }
    updatemois(mois,ordre){
            return this.http.put<any>("http://localhost:49366/mois/update/"+ordre,mois);
        }
    deletemois(ordre:any):Observable<any>{
            return this.http.delete<any>("http://localhost:49366/mois/delete/"+ordre);  
        }
    addmois(societe,mois){
            return this.http.post("http://localhost:49366/mois/add/"+societe,mois);
    }

  }