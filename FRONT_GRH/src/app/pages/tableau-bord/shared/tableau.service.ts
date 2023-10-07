import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
@Injectable({
    providedIn: 'root'
  })
  export class tbservice{
    constructor(private http:HttpClient,private auth:AuthfakeauthenticationService) { }
   //total effectif
    Getnbr_effectif():Observable<any>{
      return this.http.get<any>("http://localhost:49366/stat/nombre_effectif");
      }
    //effect atif
    Getnbr_effectifete_actif(societe):Observable<any>{
      return this.http.get<any>("http://localhost:49366/stat/nombre_effectif/actif/"+societe);
      }
     
    Getnbr_cout_effectif(exercice):Observable<any>{
        return this.http.get<any>("http://localhost:49366/stat/couteffectif/"+exercice);
    }
    //impot et charges sociales
    Get_cimpot_charge(exercice):Observable<any>{
      return this.http.get<any>("http://localhost:49366/stat/total_impot_charges/"+exercice);
  }
    Getnbr_effectif_sexe():Observable<any>{
        return this.http.get<any>("http://localhost:49366/stat/nombre_effectif/sexe");
    }
    Getnbr_effectif_departements():Observable<any>{
        return this.http.get<any>("http://localhost:49366/stat/departements");
    }
    Getnbr_effectif_college():Observable<any>{
      return this.http.get<any>("http://localhost:49366/stat/college");
  }
       
    Getnbr_absences(exercice):Observable<any>{
      return this.http.get<any>("http://localhost:49366/stat/absences/"+exercice);
  }
  Get_moyenne_age(societe):Observable<any>{
    return this.http.get<any>("http://localhost:49366/stat/moyenne_age/"+societe);
}
  exercice(exercice):Observable<any>{
    return this.http.get<any>("http://localhost:49366/exercices_info/"+exercice);
   }
 

  }