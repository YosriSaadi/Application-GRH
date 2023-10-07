import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { HttpClient,HttpResponse } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ShiftService {


     
     constructor(private http:HttpClient) {
     
    }


    



    
    //api

    addshift(shift){
        return this.http.post("http://localhost:49366/shifts_add",shift);
    }
    Getregimeids():Observable<any>{
        return this.http.get<any>("http://localhost:49366/regimesids");
        }
    Getshift(soicete):Observable<any>{
        return this.http.get<any>("http://localhost:49366/shift/"+soicete);
        }  
        Getshiftbyid(id):Observable<any>{
            return this.http.get<any>("http://localhost:49366/shiftsbyid/"+id);
            }
    
    deletshift(id:any):Observable<any>{

            return this.http.delete<any>("http://localhost:49366/shifts_delete/"+id);  
    }
    updateshift(shift){  
        return this.http.put<any>("http://localhost:49366/shifts_update",shift);
       }





}
