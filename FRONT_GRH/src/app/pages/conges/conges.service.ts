import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { HttpClient,HttpResponse } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class CongesService {


     
     constructor(private http:HttpClient) {
     
    }


    



    
    //api

    addconges(conge,exercice){
        return this.http.post("http://localhost:49366/conges_add/"+exercice,conge);
    }
    Getconges(exercice):Observable<any>{
        return this.http.get<any>("http://localhost:49366/conges/"+exercice);
    }
        Getcongesbyid(code):Observable<any>{
            return this.http.get<any>("http://localhost:49366/congesbyid/"+code);
            }
    
    deleteconges(id:any):Observable<any>{

            return this.http.delete<any>("http://localhost:49366/conges_delete/"+id);  
    }
    updateconges(conge,id,nb){  
        return this.http.put<any>("http://localhost:49366/conges_update/"+id+"/"+nb,conge);
       }
    Get_employe_matricule(matricule):Observable<any>{
        return this.http.get<any>("http://localhost:49366/employee/matricule/"+matricule);
    }

    Get_typeconge(societe):Observable<any>{
        return this.http.get<any>("http://localhost:49366/type_conges/"+societe);
    }
    
    Get_droit_conge(matricule,exercice):Observable<any>{
        return this.http.get<any>("http://localhost:49366/doitconge/"+matricule+"/"+exercice);
    }
       //vérification cloture
       mois_cloture(mois,societe):Observable<any>{
        return this.http.get<any>("http://localhost:49366/mois/cloture/"+mois+"/"+societe);
    }
     //vérification jour férié
     verification_planning(date,matricule):Observable<any>{
        return this.http.get<any>("http://localhost:49366/planning/verification/"+date+"/"+matricule);
    }
    //employees
    employes(societe):Observable<any>{

        return this.http.get<any>("http://localhost:49366/employes/"+societe);  
    }




}

