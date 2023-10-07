import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder,FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import * as moment from 'moment';
import{employes} from './shared/data'
import {paieservice} from './shared/paie.service'
import{societe} from '../societe/list-societe/societe.model';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import {ToastrService} from 'ngx-toastr'
import { Table,paie,employe } from './shared/paie.model';
import { paieSortableDirective, SortEvent } from './shared/paie-sortable.directive';
import { isEmpty } from 'rxjs-compat/operator/isEmpty';
@Component({
  selector: 'app-paie',
  templateUrl: './paie.component.html',
  styleUrls: ['./paie.component.scss'],
  providers: [paieservice, DecimalPipe]
})
export class PaieComponent implements OnInit {
  @ViewChildren(paieSortableDirective) headers: QueryList<paieSortableDirective>;
  active:number=1;
  annee:string;
  total_brute:any=0;
  cot_patronale:any=0;
  verif_paie:boolean=false;
  total_cotisation:any=0;
  salaire_imposable:any=0;
  indemnit_retenue:any;
  net_payer:any=0;
  breadCrumbItems: Array<{}>;
  info_societe:societe;
  current_date:any;
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  brute:Array<paie> = [];
  cotisation:Array<paie> = [];
  impot:Array<paie> = [];
  retenue:Array<paie> = [];
  contri_patronale:Array<paie> = [];
  employes:Array<employe> = [];
  selected_employes:Array<employe> = [];
  employe:employe=null;
  mois_paie:string;
  nb_jours_absences:number=0;
  nombre_enfant:number=0;
  mois:[];
  conges_pris:number=0;
  taux_h:any=0;
  departements:[];
  section:[];
  services:[];
  college:[];
  isChecked:boolean=false;
  constructor(public service:paieservice,public toast: ToastrService,private auth:AuthfakeauthenticationService) { 
    //Borderaux paie
    this.current_date=moment().format("DD/MM/YYYY");
    this.service.Get_Boredeaux(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
      this.service.a=response
     })
    //société
    this.service.Get_societe(this.auth.currentUserValue.societe_id).subscribe(response=>{      
      this.info_societe=response
     })
     //mois
     this.service.Getmois().subscribe(response=>{  
      this.mois=response;
     })
      //départements
      this.service.Getdepartements().subscribe(response=>{  
        this.departements=response;
       })
      //service
      this.service.Getservices().subscribe(response=>{  
        this.services=response;
       })
      //section
      this.service.Getsection().subscribe(response=>{  
          this.section=response;
        })
      //college
       this.service.Getcollege().subscribe(response=>{  
        this.college=response;
      })
   /*   //Brute
     this.service.Get_paie(14,"brute").subscribe(response=>{      
      this.brute=response
     })
     //Cotisation
     this.service.Get_paie(14,"cotisation").subscribe(response=>{      
      this.cotisation=response

     })
      //Contribution patronale
       this.service.Get_paie(14,"contribution patronale").subscribe(response=>{      
        this.cot_pat=response
     })

      //impot
      this.service.Get_paie(14,"impot").subscribe(response=>{      
        this.impot=response
       })
     //retenue
     this.service.Get_paie(14,"retenue").subscribe(response=>{      
      this.retenue=response
     })*/
     //info employe
     this.service.Get_infoemploye(3,this.auth.currentUserValue.exercice_id).subscribe(response=>{      
      this.employe=response[0]
     })      
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Paie' }, { label: 'Consultation Bulletin de paie', active: true }];
  }
   /**
     * Sort table data
     * @param param0 sort the column
     *
     */
    onSort({ column, direction }: SortEvent) {
      // resetting other headers
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
      this.service.sortColumn = column;
      this.service.sortDirection = direction;
    }

    print(component,paie){
      console.log(paie)
      this.cot_patronale=paie.cot_pat
      this.total_cotisation=paie.montant_retenue_cnss
      this.mois_paie=paie.mois
      this.total_brute=paie.salaire_brut
      this.net_payer=paie.net_payer
      this.total_cotisation=paie.montant_retenue_cnss
      this.salaire_imposable=paie.salaire_imposable;
      //conges_pris
      this.service.conges_pris_mois(paie.matricule,paie.n_mois,this.auth.currentUserValue.exercice_id).subscribe(response=>{   
      this.conges_pris=response[0].nbr_jours;
      })
      //absences nombre jours
      this.service.absences_nombre_jours(paie.matricule,paie.n_mois,this.auth.currentUserValue.exercice_id).subscribe(response=>{   
        this.nb_jours_absences=response[0].nbr_jours;
        })

     
      //nombre_enfants de l'employé
      this.service.nombre_enfants(paie.matricule).subscribe(response=>{      
        this.nombre_enfant=response[0].nombre
        console.log(this.nombre_enfant)
       })
      //annee
      this.service.exercice(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
        this.annee=response[0].exercice
       })
       //Brute
     this.service.Get_paie(paie.id,"brute").subscribe(response=>{      
      this.brute=response
     })
     //Cotisation
     this.service.Get_paie(paie.id,"cotisation").subscribe(response=>{      
      this.cotisation=response

     })
       //Contribution patronale
       this.service.Get_paie(paie.id,"contribution patronale").subscribe(response=>{      
        this.contri_patronale=response
     })
      //impot
      this.service.Get_paie(paie.id,"impot").subscribe(response=>{      
        this.impot=response
       })
       //indemnité calculer avant le retenue
       this.service.Get_paie(paie.id,"Indemnite retenue").subscribe(response=>{      
        this.indemnit_retenue=response;
       })
     //retenue
     this.service.Get_paie(paie.id,"retenue").subscribe(response=>{      
      this.retenue=response
     })
     //info employe
     this.service.Get_infoemploye(paie.matricule,this.auth.currentUserValue.exercice_id).subscribe(response=>{      
      this.employe=response[0]
      this.taux_h=(response[0].sal_base/response[0].nbrhm).toFixed(3)
    
     })
     this.service.exercice(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
      this.annee=response[0].exercice;
      })

     /* let printContents = document.getElementById(component).innerHTML;
      let originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      */
   this.service.exercice(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
      this.annee=response[0].exercice
      var divToPrint = document.getElementById(component);
      var newWin = window.open('', component);
      newWin.document.open();
      newWin.document.write('<html><link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" media="print"/><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
      newWin.document.close();
      setTimeout(function() {
        newWin.close();
      }, 10);
       })
      
    

    }
    employe_matricule(event){
      this.service.Getemployebymatricule(event.target.value).subscribe(response=>{      
        this.employes=response
       })
    }
    employe_departement(event){
     this.service.Getemployedepartements(event.target.value).subscribe(response=>{      
        this.employes=response
       })
    }
    employe_service(event){
      this.service.Getemployeservices(event.target.value).subscribe(response=>{      
         this.employes=response
        })
     }
     employe_section(event){
      this.service.Getemployesection(event.target.value).subscribe(response=>{      
         this.employes=response
        })
     }
     all_employes(event){
      if(event.target.checked){
      this.service.Getallemeployes().subscribe(response=>{      
        this.employes=response
       })
     }else{
      this.employes=null
    }
    }
    

     generationpaie(){
    
      this.service.mois_cloture((<HTMLInputElement>document.getElementById("mois_paie")).value,this.auth.currentUserValue.societe_id).subscribe(response=>{ 
       if(response[0].cloture){
        Swal.fire({
          icon: 'error',
          title: 'Génération de paies annulée',
          text: 'Ce mois est déjà clôturé!',
        })

       }else{
         if(this.selected_employes.length==0){
          Swal.fire({
            icon: 'error',
            title: 'Génération de paies annulée',
            text: 'Vous devez sélectionner les employés!',
          })
  
         }else{  
        var   mois=(<HTMLInputElement>document.getElementById("mois_paie")).value;
        for( let i=0; i<this.selected_employes.length; i++){
          this.service.vérification_bordereaux(this.selected_employes[i].matricule,this.auth.currentUserValue.exercice_id,mois).subscribe(info=>{ 
         
        //console.log(info)
        //console.log(info.length==0)
         if(info.length==0){
           console.log("d5al")
          this.verif_paie=true;
         
         //vérification 3ala mois wmatricule
          this.service.generepaie(this.selected_employes[i].matricule,this.auth.currentUserValue.exercice_id,mois).subscribe(response=>{  
          console.log(this.selected_employes[i])  
          
          this.service.Get_Boredeaux(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
            this.service.a=response
            this.tables$ = this.service.tables$;
           })    
        })
      }
  


      })

        } 
        //fake 3ala délai bech tvérifi
    this.service.Get_Boredeaux(this.auth.currentUserValue.exercice_id).subscribe(response=>{ 
    console.log(this.verif_paie)

    if(!this.verif_paie){
        Swal.fire({
          icon: 'success',
          title: 'Génération de paies effectuée avec succès',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else{
        Swal.fire({
          title: 'Erreur!',
          text: 'bulletin de paie déjà généré pour cet employé!',
          icon: 'warning',
          confirmButtonColor: '#34c38f',
        });
      }
         this.annuler();
         this.active=1;

    })

         }

       }

      })
   
      
     }
     ajouter_employe(employe,event){
    
     if(event.target.checked&&this.isChecked==false){
       this.selected_employes.push(employe)
     }else{
      this.selected_employes.forEach((element,index)=>{
        if(element==employe) this.selected_employes.splice(index,1);
     });
      }
      console.log(this.selected_employes)
    
     }

     checkuncheckall(event)
     {
       if(!event.target.checked)
     {
    this.selected_employes=[]
     this.isChecked = false;
     }
     else
     {
      this.selected_employes=this.employes
     this.isChecked = true;
     }
     
     }

     supprimer_bull_employe(id){
       Swal.fire({
        title: 'Confirmation de suppression?',
        text: 'êtes-vous sûr de vouloir supprimer ce bordereau de paie!!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#ff3d60',
        confirmButtonText: 'Oui, Supprimer!',
        cancelButtonText:'Annuler'
      }).then(result => {
        if (result.value) {
         this.service.deletebulletin(id).subscribe(response=>{  
          this.service.Get_Boredeaux(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
            this.service.a=response
            this.tables$ = this.service.tables$;
           })          
          })
          Swal.fire('La suppression est effectuée!', 'Bordereaux de paie Supprimé.', 'success');
        }
      });

     }

     annuler(){
       this.selected_employes=[]
       this.employes=[]
     }
    




}
