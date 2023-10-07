import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { HttpClient,HttpResponse } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ParametrageService {


     
     constructor(private http:HttpClient) {
     
    }


    



    
    //api
 /****************************département***********************************/
    addd(societe,d){
        return this.http.post("http://localhost:49366/departement_add/"+societe,d);
    }
    Getd():Observable<any>{
        return this.http.get<any>("http://localhost:49366/departements");
    }
    Getdbyid(code):Observable<any>{
            return this.http.get<any>("http://localhost:49366/departement_byid/"+code);
    }
    
    deleted(id:any):Observable<any>{

            return this.http.delete<any>("http://localhost:49366/departement_delete/"+id);  
    }
    updated(d){  
        return this.http.put<any>("http://localhost:49366/departement_update",d);
    }
    /****************************service***********************************/
    addSe(d){
        return this.http.post("http://localhost:49366/service_add",d);
    }
    GetSe():Observable<any>{
        return this.http.get<any>("http://localhost:49366/services");
    }
    GetSebyid(code):Observable<any>{
            return this.http.get<any>("http://localhost:49366/service_byid/"+code);
    }
    
    deleteSe(id:any):Observable<any>{
            return this.http.delete<any>("http://localhost:49366/service_delete/"+id);  
    }
    updateSe(d){  
        return this.http.put<any>("http://localhost:49366/service_update",d);
    }
    /************************section**********************************/
       addSec(d){
        return this.http.post("http://localhost:49366/section_add",d);
    }
    GetSec():Observable<any>{
        return this.http.get<any>("http://localhost:49366/sections");
        }
    GetSecbyid(code):Observable<any>{
            return this.http.get<any>("http://localhost:49366/section_byid/"+code);
    }
    
    deleteSec(id:any):Observable<any>{
            return this.http.delete<any>("http://localhost:49366/section_delete/"+id);  
    }
    updateSec(d){  
        return this.http.put<any>("http://localhost:49366/section_update",d);
    }


    
       
    
   
   

      
    //qualification
    Getqualification(societe):Observable<any>{
        return this.http.get<any>("http://localhost:49366/type_qualification/"+societe); 
    }

    
    add_qual(societe,q){
        return this.http.post("http://localhost:49366/type_qualification_add/"+societe,q);
    }
    Getd_qual_byid(code):Observable<any>{
        return this.http.get<any>("http://localhost:49366/type_qualification_typebyid/"+code);
    }
    addqualification(societe,q){
        return this.http.post("http://localhost:49366/type_qualification_add/"+societe,q);
    }
    deletequalification(id:any):Observable<any>{
        return this.http.delete<any>("http://localhost:49366/type_qualification_delete/"+id);  
}
updatequalf(d){  
    return this.http.put<any>("http://localhost:49366/type_qualification_update",d);
}
 //collège
 Getcollege():Observable<any>{
    return this.http.get<any>("http://localhost:49366/type_college");
}
getcollegebyid(code):Observable<any>{
    return this.http.get<any>("http://localhost:49366/type_college_typebyid/"+code);
}
addtcollege(q){
    return this.http.post("http://localhost:49366/type_college_add",q);
}
deletecollege(id:any):Observable<any>{
    return this.http.delete<any>("http://localhost:49366/type_college_delete/"+id);  
}
updatecollege(d){  
    return this.http.put<any>("http://localhost:49366/type_college_update",d);
}
 /****************************Primes***********************************/
 Getprime():Observable<any>{
    return this.http.get<any>("http://localhost:49366/prime_type");
    }
addtypeprimes(societe,p){
    return this.http.post("http://localhost:49366/prime_type_add/"+societe,p);
}
updateprime(d){  
    return this.http.put<any>("http://localhost:49366/prime_type_update",d);
   }
deleteprime(id:any):Observable<any>{

    return this.http.delete<any>("http://localhost:49366/prime_type_delete/"+id);  
}
getprimebyid(code):Observable<any>{
    return this.http.get<any>("http://localhost:49366/prime_typebyid/"+code);
    }
    /*****************************retneue******************************/

    Get_type_retenue(societe):Observable<any>{
        return this.http.get<any>("http://localhost:49366/type_retenus/"+societe); 
    }
    add_typeretenue(societe,d){  
        return this.http.put<any>("http://localhost:49366/retenu_add/"+societe,d);
    }
    getretbyid(code):Observable<any>{
        return this.http.get<any>("http://localhost:49366/retenu_typeids/"+code);
        }
    
    deletetype_reteneue(id:any):Observable<any>{

            return this.http.delete<any>("http://localhost:49366/retenu_delete/"+id);  
    }

    updateretenue(r){  
        return this.http.put<any>("http://localhost:49366/retenu_update",r);
       }
         /*****************************motifs******************************/

    Get_motifs(societe):Observable<any>{
        return this.http.get<any>("http://localhost:49366/motifs/"+societe); 
    }
    add_typemotif(societe,d){  
        return this.http.post<any>("http://localhost:49366/motifs_add/"+societe,d);
    }
    getmotifbyid(code):Observable<any>{
        return this.http.get<any>("http://localhost:49366/motif_typebyid/"+code);
        }
    
    deletemotif(id:any):Observable<any>{

            return this.http.delete<any>("http://localhost:49366/motif_delete/"+id);  
    }

    updatmotif(r){  
        return this.http.put<any>("http://localhost:49366/motifs_update",r);
       }

              /*****************************type conges******************************/
    Get_types_conges(societe):Observable<any>{
                return this.http.get<any>("http://localhost:49366/type_conges/"+societe); 
    }
    add_type_conges(societe,c){  
        return this.http.post<any>("http://localhost:49366/type_conges_add/"+societe,c);
    }
    getcongesbyid(code):Observable<any>{
        return this.http.get<any>("http://localhost:49366/type_conges_typebyid/"+code);
        }
    delete_conges(id:any):Observable<any>{

            return this.http.delete<any>("http://localhost:49366/type_conges_delete/"+id);  
    }
    update_conge(c){  
        return this.http.put<any>("http://localhost:49366/type_conges_update",c);
       }


         /*****************************libelle prets******************************/
         Get_libelle_prets(societe):Observable<any>{
            return this.http.get<any>("http://localhost:49366/libelle_prets/"+societe); 
         }
          add_libelle_prets(societe,c){  
        return this.http.post<any>("http://localhost:49366/libelle_prets_add/"+societe,c);
        }

        Getlibellepretbyid(code):Observable<any>{
            return this.http.get<any>("http://localhost:49366/libelle_prets_typebyid/"+code);
            }
        delete_libelle_pret(id:any):Observable<any>{
    
                return this.http.delete<any>("http://localhost:49366/libelee_prets_delete/"+id);  
        }
        update_libelle_prets(p){  
            return this.http.put<any>("http://localhost:49366/libelle_prets_update",p);
           }



}

