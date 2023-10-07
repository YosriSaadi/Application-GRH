import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
@Injectable({
    providedIn: 'root'
  })
  export class societeservice{
    constructor(private http:HttpClient,private auth:AuthfakeauthenticationService) { }
    Getsociete():Observable<any>{
      return this.http.get<any>("http://localhost:49366/getsociete/id/"+this.auth.currentUserValue.societe_id);
      }
     
    updatesociete(societe:any,id:any):Observable<any>{
        return this.http.put<any>("http://localhost:49366/update/societe/"+id,societe);
    }

    Getleselementdepaie():Observable<any>{
      return this.http.get<any>("http://localhost:49366/societe/elementpaie/"+this.auth.currentUserValue.societe_id);
      }
    editelementdepaie(element:any,id:any):Observable<any>{
        return this.http.put<any>("http://localhost:49366/societe/elementpaie/update/"+id,element);
      
       }




  }