import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {Utilisateur} from '../utilisateur.model';
@Injectable({
  providedIn: 'root'
})
export class utilisateursservice{

constructor(private http:HttpClient) { }

Getusers():Observable<any>{
  return this.http.get<any>("http://localhost:49366/utilisateurs");
  }

adduser(utilisateur){
 return this.http.post("http://localhost:49366/adduser",utilisateur);

}

deleteuser(id:any):Observable<any>{
  return this.http.delete<any>("http://localhost:49366/deleteuser/"+id);

 }
 edituser(utilisateur,id){
  return this.http.put<any>("http://localhost:49366/update/user/"+id,utilisateur);

 }
 GetsocieteNames():Observable<any>{
  return this.http.get<any>("http://localhost:49366/societesnames");
  }
  Getuser(username,password):Observable<any>{
    return this.http.get<any>("http://localhost:49366/user/"+username+"/"+password);
    }

}
