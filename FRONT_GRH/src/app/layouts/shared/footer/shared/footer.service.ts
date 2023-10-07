import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthfakeauthenticationService } from '../../../../core/services/authfake.service';
@Injectable({
    providedIn: 'root'
  })
  export class footerservice{
    constructor(private http:HttpClient,private auth:AuthfakeauthenticationService) { 

    }


    Getfooterinfo(id):Observable<any>{
        return this.http.get<any>("http://localhost:49366/exercices_info/"+id);
    }

  }
