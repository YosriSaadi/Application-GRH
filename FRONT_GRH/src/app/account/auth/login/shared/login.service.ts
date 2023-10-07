import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
  })
  export class loginservice{
    constructor(private http:HttpClient) { }


    Getexercices(user):Observable<any>{
        return this.http.get<any>("http://localhost:49366/societes/exercices/"+user);
    }
    
  }