import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Societe } from './societe.model';
import 'rxjs/add/operator/map'
@Injectable({
  providedIn: 'root'
})
export class SocieteService {

  formData:Societe;
  list:Societe[];
  readonly uri:'http://localhost:50629/api/GRH_SOCIETE';
  constructor(private http:HttpClient) { }

  postsociete(formData:Societe){
    return this.http.post(this.uri+'/api/GRH_SOCIETE',formData);
  }

  /*getdata(){
    let url="http://localhost:50629/api/GRH_SOCIETE";
    return this.http.get(url);
  }*/
  
  GettSociete():Observable<Societe>{
  return this.http.get<Societe>("http://localhost:49366/getsociete/cstt")
  }
 
}
