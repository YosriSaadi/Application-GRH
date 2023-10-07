import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { HttpClient,HttpResponse } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class RegimeService {


     
     constructor(private http:HttpClient) {
     
    }


    



    
    //api

    addregime(regime,societe){
        return this.http.post("http://localhost:49366/regime_add/"+societe,regime);
    }
    Getregime(societe):Observable<any>{
        return this.http.get<any>("http://localhost:49366/regimes/"+societe);
        }
        Getregimebyid(code):Observable<any>{
            return this.http.get<any>("http://localhost:49366/regimebyid/"+code);
            }
    
    deletregime(id:any):Observable<any>{

            return this.http.delete<any>("http://localhost:49366/regime_delete/"+id);  
    }
    updateregime(regime){  
        return this.http.put<any>("http://localhost:49366/regime_update",regime);
       }





}

