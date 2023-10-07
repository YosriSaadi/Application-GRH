import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FormBuilder,FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { avance } from './shared/avance.model';
import { avanceData } from './shared/data';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { avanceSortableDirective, SortEvent } from './shared/avance-sortable.directive';
import { avanceService } from './shared/avance.service';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr'
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
@Component({
  selector: 'app-avance',
  templateUrl: './avance.component.html',
  styleUrls: ['./avance.component.scss'],
  providers: [avanceService, DecimalPipe]
})
export class AvanceComponent implements OnInit {

  @ViewChildren(avanceSortableDirective) headers: QueryList<avanceSortableDirective>;

  // breadcrumb items
  breadCrumbItems: Array<{}>;

  // Table data
  editId:number;
  avanceData: avance[];
  liste_employes:[];
  submitted: boolean;
  tables$: Observable<avance[]>;
  total$: Observable<number>;
  validationform: FormGroup;
  validationeditform: FormGroup;
    active:number=2;
  
    mois = [
      { ordre: 1, designation: "Janvier" },
      { ordre: 2, designation: "Février" },
      { ordre: 3, designation: "Mars" },
      { ordre: 4, designation: "Avril" }, 
      { ordre: 5, designation: "Mai" },
      { ordre: 6, designation: "Juin" } ,
      { ordre: 7, designation: "Juillet" },
      { ordre: 8, designation: "Août" } ,
      { ordre: 9, designation: "Septembre" },
      { ordre: 10, designation: "Octobre" },
      { ordre: 11, designation: "Novembrre" },
      { ordre: 12, designation: "Décembre" }
  ];
  constructor(public service: avanceService,public formBuilder: FormBuilder,private modalService: NgbModal,public toast: ToastrService,private auth:AuthfakeauthenticationService) {
    this.service.Getavances(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
      this.service.a=response
     })

     /*this.service.Getmois().subscribe(response=>{  
      this.mois=response;
     })*/
    //employés
    this.service.employes(this.auth.currentUserValue.societe_id).subscribe(response=>{  
      this.liste_employes=response;
     })
    this.tables$ = service.tables$;
    this.total$ = service.total$;
   }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Les éléments de paie' }, { label: 'Avance', active: true }];
    this.validationform = this.formBuilder.group({
      matricule_employe: [''],
      nom: ['',Validators.required],
      date: ['',Validators.required],
      salaire_base: [''],
      mois_imputation: ['',Validators.required],
      montant: ['',[Validators.required, Validators.pattern('[0-9.]+')]],
      type: ['',Validators.required],
      observation: [''],

     
    });
    this.validationeditform = this.formBuilder.group({
      matricule_employe: [''],
      nom: [''],
      salaire_base: [''],
      date: ['',Validators.required],
      mois_imputation: ['',Validators.required],
      montant: ['',[Validators.required, Validators.pattern('[0-9.]+')]],
      type: ['',Validators.required],
      observation: [''],
      etat_solde: [''],

     
    });

  }
    /**
 * Modal Open
 * @param content modal content
 */
openModal(content: any) {
  this.modalService.open(content, { centered: true });
}
  get form() {
    return this.validationform.controls;
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
  saveData(){
    console.log(this.validationform.value)
    console.log(this.validationform.valid)
    let mois=moment(this.validationform.get('date').value).format('MM')
    if(this.validationform.valid){
      this.service.mois_cloture(mois,this.auth.currentUserValue.societe_id).subscribe(response=>{ 
        if(response[0].cloture){
       
         Swal.fire({
           icon: 'error',
           title: 'Ajout annulé',
           text: 'Ce mois est déjà clôturé!',
         })
        }
      //
      else{
      this.service.addavance(this.validationform.value,this.auth.currentUserValue.exercice_id).subscribe(response=>{   
        Swal.fire({
          icon: 'success',
          title: 'Ajouté avec succès ',
          showConfirmButton: false,
          timer: 1500
        });
        this.active=2;
        this.resetformadd();
        this.service.Getavances(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
          this.service.a=response;
          this.tables$ = this.service.tables$;
         })  
        
        })
      }
      })
   //end
    }
    this.submitted = true;

    
  }
  opensave(table:any){
        this.active=1
        this.validationform.get('matricule_employe').setValue(table.matricule_employe)
        this.validationform.get('matricule_employe').disable()
        this.validationform.get('nom').setValue(table.nom)
        this.validationform.get('nom').disable()
        this.validationform.get('salaire_base').setValue(table.salaire_base)

  }
  openedit(content:any,table:any){
    this.modalService.open(content, { centered: true });
    this.editId=table.id;
    this.validationeditform.get('matricule_employe').setValue(table.matricule_employe)
    this.validationeditform.get('nom').setValue(table.nom)
    this.validationeditform.get('salaire_base').setValue(table.salaire_base)
    this.validationeditform.get('date').setValue(table.date)
    this.validationeditform.get('montant').setValue(table.montant)
    this.validationeditform.get('type').setValue(table.type)
    this.validationeditform.get('mois_imputation').setValue(table.mois_imputation)
    this.validationeditform.get('etat_solde').setValue(table.etat_solde)

  }
  resetformadd(){


    this.validationform.get('matricule_employe').setValue('')
    this.validationform.get('matricule_employe').enable()
    this.validationform.get('nom').setValue('')
    this.validationform.get('nom').enable()
    this.validationform.get('salaire_base').setValue('')
    this.validationform.get('montant').setValue('')
    this.validationform.get('observation').setValue('')
    this.validationform.get('mois_imputation').setValue('')
    this.validationform.get('date').setValue('')
    
    this.submitted=false

  }
  editavance(){
    if(this.validationeditform.valid){

      this.service.updateavance(this.validationeditform.value,this.editId).subscribe(response=>{ 
        Swal.fire({
          icon: 'success',
          title: 'Modification Réussite',
          showConfirmButton: false,
          timer: 1500
        });
        this.service.Getavances(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
          this.service.a=response;
          this.tables$ = this.service.tables$;
          this.submitted = false;
         }) 
        })
      this.modalService.dismissAll();
    }

  }
  deleteavance(id:any,mois){
    console.log(mois)
    this.service.mois_cloture(mois,this.auth.currentUserValue.societe_id).subscribe(response=>{ 
      if(response[0].cloture){
     
       Swal.fire({
         icon: 'error',
         title: 'Ajout annulé',
         text: 'Ce mois est déjà clôturé!',
       })
      }else{


    Swal.fire({
      title: 'Confirmation de suppression?',
      text: 'êtes-vous sûr de vouloir supprimer cette avance!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Oui, Supprimer!',
      cancelButtonText:'Annuler'
    }).then(result => {
      if (result.value) {
        this.service.deletavance(id).subscribe(response=>{  
          this.service.Getavances(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
            this.service.a=response;
            this.tables$ = this.service.tables$;
           })    
          })
        Swal.fire('la suppression est effectuée!', 'Avance Supprimée pour cet employé .', 'success');
      }
    });
  }
});

  }

 
   search_employe(){
    this.service.Get_employe_matricule(this.validationform.get('nom').value).subscribe(response=>{   
      if(response.length!=0){
        console.log(response)
        this.validationform.get('matricule_employe').setValue(this.validationform.get('nom').value)
        this.validationform.get('salaire_base').setValue(response[0].salaire_base)
        this.toast.success('Employé existe');
     
      }
      else{
        this.toast.error('Les informations de cette employe ne sont pas complet ou modifiées!');
        this.validationform.get('nom').setValue('')
        this.validationform.get('matricule_employe').setValue('')
        this.validationform.get('salaire_base').setValue('')
      }
     })
   }
   

}
