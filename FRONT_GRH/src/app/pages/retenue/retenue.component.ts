import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import {ToastrService} from 'ngx-toastr'
import { Table } from './shared/retenue.model';
import Swal from 'sweetalert2';
import { tableData } from './shared/data';
import { FormBuilder,FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RetenueService } from './shared/retenue.service';
import { RetenueSortableDirective, SortEvent } from './shared/retenue-sortable.directive';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { ParametrageService } from '../Parametrage/parametrage.service';
@Component({
  selector: 'app-retenue',
  templateUrl: './retenue.component.html',
  styleUrls: ['./retenue.component.scss'],
  providers: [RetenueService, DecimalPipe]
})
export class RetenueComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  tables$: Observable<Table[]>;
  submitted:boolean;
  type_retenue:any=[];
  submittededit:boolean;
  active:number=1;
  total$: Observable<number>;
  editid:number;
  liste_employes:[];
  type_rentues:[];
  validationform: FormGroup;
  validationeditform: FormGroup;
  @ViewChildren(RetenueSortableDirective) headers: QueryList<RetenueSortableDirective>;
  constructor(public service: RetenueService,public formBuilder: FormBuilder,private modalService: NgbModal,public toast: ToastrService,private auth:AuthfakeauthenticationService,private paramservice:ParametrageService) { 
    this.service.Getretenues(this.auth.currentUserValue.exercice_id).subscribe(response=>{  
      this.service.r=response;
     })
     this.service.Gettyperetenues().subscribe(response=>{  
      this.type_rentues=response;
     })
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
      //Liste employes
      this.service.employes(this.auth.currentUserValue.societe_id).subscribe(response=>{  
        this.liste_employes=response;
      })
   
    this.breadCrumbItems = [{ label: 'Les élements de paie' }, { label: 'Retenues', active: true }];
    this.validationform = this.formBuilder.group({
      matricule_employe:[''],
      nom: ['',Validators.required],
      designation: ['',Validators.required],
      mois: ['',Validators.required],
      montant: ['',[Validators.required,Validators.pattern('[0-9.]+')]], 
    });

    this.validationeditform = this.formBuilder.group({
      matricule_employe:['',Validators.required],
      nom: [''],
      designation: ['',Validators.required],
      mois: ['',Validators.required],
      montant: ['',[Validators.required, Validators.pattern('[0-9.]+')]], 
    });
    this.get_type_retnue();
  }
 

  get form() {
    return this.validationform.controls;
  }
  get editform() {
    return this.validationeditform.controls;
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
       /**
 * Modal Open
 * @param content modal content
 */
openModal(content: any) {
  this.modalService.open(content, { centered: true });
}

saveData(){
  this.submitted=true
  if (this.validationform.valid){
    
    this.service.mois_cloture(this.validationform.get('mois').value,this.auth.currentUserValue.societe_id).subscribe(response=>{ 
      if(response[0].cloture){
     
       Swal.fire({
         icon: 'error',
         title: 'Ajout annulé',
         text: 'Ce mois est déjà clôturé!',
       })
      }
    //
    else{

    this.service.addretenue(this.auth.currentUserValue.exercice_id,this.validationform.value).subscribe(response=>{   
      Swal.fire({
        icon: 'success',
        title: 'Ajouté avec succès ',
        showConfirmButton: false,
        timer: 1500
      });
      this.active=1;
      this.service.Getretenues(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
        this.service.r=response;
        this.tables$ = this.service.tables$;
       })
      
      })
      //
    }
  })
      
      
      
      //end
  }
}
openedit(content:any,table:any){
  this.modalService.open(content, { centered: true });
  this.editid=table.id   
  this.validationeditform.get('matricule_employe').setValue(table.matricule_employe)
  this.validationeditform.get('nom').setValue(table.nom)
  this.validationeditform.get('montant').setValue(table.montant)
  this.validationeditform.get('mois').setValue(table.mois)
  this.validationeditform.get('designation').setValue(table.designation)


    
}

deleteretenue(id){
  Swal.fire({
    title: 'Confirmation de suppression?',
    text: 'êtes-vous sûr de vouloir supprimer Cette retenue!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34c38f',
    cancelButtonColor: '#ff3d60',
    confirmButtonText: 'Oui, Supprimer!',
    cancelButtonText:'Annuler'
  }).then(result => {
    if (result.value) {
     this.service.deleteretenue(id).subscribe(response=>{  
      this.service.Getretenues(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
        this.service.r=response;
        this.tables$ = this.service.tables$;
       })    
      })
      Swal.fire('la suppression est effectuée!', 'Retenue Supprimée.', 'success');
    }
  });

}
editretenue(){
  if(this.validationeditform.valid){
        
    this.service.Updateretenue(this.validationeditform.value,this.editid).subscribe(response=>{ 
      Swal.fire({
        icon: 'success',
        title: 'Modification Réussite',
        showConfirmButton: false,
        timer: 1500
      });
      this.service.Getretenues(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
        this.service.r=response;
        this.tables$ = this.service.tables$;
        this.submitted = false;
       }) 
      })
    this.modalService.dismissAll();
  }
  this.submittededit=true;

}


 get_type_retnue(){

  this.paramservice.Get_type_retenue(this.auth.currentUserValue.societe_id).subscribe((data:any) => {

  this.type_rentues=data;
  console.log(this.type_rentues)

  });
}

 
   search_employe(){
    this.service.Get_employe_matricule(this.validationform.get('nom').value).subscribe(response=>{   
      if(response.length!=0){
      this.validationform.get('matricule_employe').setValue(this.validationform.get('nom').value);
      //this.toast.success('Employeé existe');
      }
      else{
        this.toast.error('Les informations de cette employe ne sont pas complet ou modifiées!');
        this.validationform.get('matricule_employe').setValue('');
        this.validationform.get('nom').setValue('');
      }
     })
   }
   annuler(){
    this.validationform.get('nom').setValue('');
    this.validationform.get('matricule_employe').setValue('');
    this.validationform.get('montant').setValue('');
    this.validationform.get('designation').setValue('');
    this.validationform.get('mois').setValue('');

   }
    

}
