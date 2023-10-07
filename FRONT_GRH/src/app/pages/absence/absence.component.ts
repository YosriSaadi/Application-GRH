import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FormBuilder,FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Table } from './shared/absence.model';
import { tableData } from './shared/data';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { absenceSortableDirective, SortEvent } from './shared/absence-sortable.directive';
import { absenceService } from './shared/absence.service';
import Swal from 'sweetalert2';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss'],
  providers: [absenceService, DecimalPipe]
})
export class AbsenceComponent implements OnInit {
  @ViewChildren(absenceSortableDirective) headers: QueryList<absenceSortableDirective>;
  breadCrumbItems: Array<{}>;
  submitted:boolean=false;
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  validationform: FormGroup;
  liste_employes:[];
  Motifs:[];
  jour_ferier:boolean;
  active:number=2;
  validationeditform: FormGroup;
  modifhide:boolean=true;
  editId:number;

  constructor(public service:absenceService,public formBuilder: FormBuilder,public toast: ToastrService,public auth:AuthfakeauthenticationService) { 

    this.service.Getabsences(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
      this.service.a=response
     })
    this.service.Getmotifs(this.auth.currentUserValue.societe_id).subscribe(response=>{  
      this.Motifs=response;
     })
     //Employés
     this.service.employes(this.auth.currentUserValue.societe_id).subscribe(response=>{  
      this.liste_employes=response;
     })

  
    this.tables$ = service.tables$;
    this.total$ = service.total$;
    
  }

  ngOnInit(): void {

    this.service.employes(this.auth.currentUserValue.societe_id).subscribe(response=>{  
      this.liste_employes=response;
      })

    this.breadCrumbItems = [{ label: 'Les élements de paie' }, { label: 'Absence', active: true }];
    this.validationform = this.formBuilder.group({
      matricule_employe: [''],
      nom: ['' ,Validators.required],
      date_debut: ['',Validators.required],
      date_fin: ['',Validators.required],
      motif: ['',Validators.required],
      abattable:new FormControl('true'),
      mois:[''],
      nbr_jrs:['',Validators.required],
     

     
    });

    this.validationeditform = this.formBuilder.group({
      matricule_employe: [],
      nom: [],
      date_debut: ['',Validators.required],
      date_fin: ['',Validators.required],
      motif: ['',Validators.required],
      abattable:new FormControl('true'),
      mois:[''],
      nbr_jrs:['',Validators.required],
     

     
    });
  }

  get form() {
    return this.validationform.controls;
  }
  saveData(){
    this.jour_ferier=false;
    //console.log(this.validationform.value)
    if(this.validationform.valid){
    this.service.verification_planning(moment(this.validationform.get('date_debut').value).format('DD-MM-YYYY'),this.validationform.get('matricule_employe').value).subscribe(response=>{ 
    //console.log(moment(this.validationform.get('date_debut').value).format('DD-MM-YYYY'))
      console.log(response)
      if(response.length!=0){
    this.jour_ferier=true;

    }
    
    console.log(this.jour_ferier)
   let mois=moment(this.validationform.get('date_debut').value).format('MM')
   //console.log(mois)
   this.service.mois_cloture(mois,this.auth.currentUserValue.societe_id).subscribe(response=>{ 
    if(response[0].cloture){
   
     Swal.fire({
       icon: 'error',
       title: 'Ajout annulé',
       text: 'Ce mois est déjà clôturé!',
     })
    }else if(!this.jour_ferier){
    this.service.addabsence(this.validationform.value,this.auth.currentUserValue.exercice_id).subscribe(response=>{   
        Swal.fire({
          icon: 'success',
          title: 'Ajouté avec succès ',
          showConfirmButton: false,
          timer: 1500
        });
        this.service.Getabsences(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
          this.service.a=response;
          this.tables$ = this.service.tables$;
         })  
         this.active=2;
        })


    }else{

      Swal.fire({
        icon: 'error',
        title: 'Ajout annulé',
        text: 'Cette date correspond à un jour férié!',
      })
    }
  })





  })




  

    }
    this.submitted = true;
 
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
    deleteabsence(id:any,data){
      let k=moment(data.date_debut).format("MM")
     

      this.service.mois_cloture(k,this.auth.currentUserValue.societe_id).subscribe(response=>{ 
        if(response[0].cloture){
       
         Swal.fire({
           icon: 'error',
           title: 'Ajout annulé',
           text: 'Ce mois est déjà clôturé!',
         })
        }else{

      Swal.fire({
        title: 'Confirmation de suppression?',
        text: 'êtes-vous sûr de vouloir supprimer cette absence!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#ff3d60',
        confirmButtonText: 'Oui, Supprimer!'
      }).then(result => {
        if (result.value) {
          this.service.Deletabsence(id).subscribe(response=>{  
            this.service.Getabsences(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
              this.service.a=response;
              this.tables$ = this.service.tables$;
             })    
            })
          Swal.fire('la suppression est effectuée!', 'Absence Supprimée.', 'success');
        }
      });
    }
  });



  
    }
calcule_date_fin(){
  this.validationform.get('date_fin').setValue(this.validationform.get('date_debut').value)
  this.validationform.get('nbr_jrs').setValue(1)
  this.validationform.get('mois').setValue(moment(this.validationform.get('date_debut').value).lang("fr").format('MMMM'))

}
calcule_nombre_jours(){
let start=moment(this.validationform.get('date_debut').value)
let end=moment(this.validationform.get('date_fin').value)
var duration = moment.duration(end.diff(start));
var days = duration.asDays();
if(days<0){
  this.validationform.get('nbr_jrs').setValue('')
  this.toast.error('Date inavlide!!!');

}
else{
  this.validationform.get('nbr_jrs').setValue(days+1)
  
}

}

search_employe(){
  this.service.Get_employe_matricule(this.validationform.get('nom').value).subscribe(response=>{   
    if(response.length!=0){
    this.validationform.get('matricule_employe').setValue(this.validationform.get('nom').value);
    //this.toast.success('Employeé existe');
   
    }
    else{
      this.toast.error('Les informations de cette employe ne sont pas complet ou modifiées!');
      this.validationform.get('nom').setValue('');
      this.validationform.get('matricule_employe').setValue('');
    }
   })
 }

     openedit(absence){
    console.log(absence)
    this.editId=absence.id
     this.active=3;
     this.modifhide=false;
     this.validationeditform.get('matricule_employe').setValue(absence.matricule_employe)
     this.validationeditform.get('nom').setValue(absence.nom)
     this.validationeditform.get('motif').setValue(absence.motif)
     this.validationeditform.get('abattable').setValue(absence.abattable)
     this.validationeditform.get('date_debut').setValue(absence.date_debut)
     this.validationeditform.get('date_fin').setValue(absence.date_fin)
     this.validationeditform.get('mois').setValue(absence.mois)
     this.validationeditform.get('nbr_jrs').setValue(absence.nbr_jours)

     }

     saveupdate(){

      this.active=2;
      this.modifhide=true;
      if(this.validationeditform.valid){

        this.service.updateabsence(this.validationeditform.value,this.editId).subscribe(response=>{ 
          Swal.fire({
            icon: 'success',
            title: 'Modification Réussite',
            showConfirmButton: false,
            timer: 1500
          });
          this.service.Getabsences(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
            this.service.a=response;
            this.tables$ = this.service.tables$;
           })  
          })


      }




     }
     Annuler(){
      this.active=2;
      this.modifhide=true;

     }
    

}
