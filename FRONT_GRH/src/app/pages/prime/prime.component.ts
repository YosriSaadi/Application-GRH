import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';
import {ToastrService} from 'ngx-toastr'
import { Table,mois_prime } from './shared/prime.model';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { tableData,moisprimers} from './shared/data';
import { FormBuilder,FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PrimeService } from './shared/prime.service';
import { PrimeSortableDirective, SortEvent } from './shared/prime-sortable.directive';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'app-prime',
  templateUrl: './prime.component.html',
  styleUrls: ['./prime.component.scss'],
  providers: [PrimeService, DecimalPipe]
})
export class PrimeComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  // Table data
  mois_primes:Array<mois_prime> =moisprimers;
  employes:Array<any>;
  tableData: Table[];
  submitted:boolean;
  liste_employes:[];
  hide_inputs:boolean=false;
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  validationform: FormGroup;
  Type_primes:[];
  validationeditform: FormGroup;
  active:number=1;
  modifhide:boolean=true;
  editID:boolean
  mois:[]
  @ViewChildren(PrimeSortableDirective) headers: QueryList<PrimeSortableDirective>;

  constructor(public service: PrimeService,public formBuilder: FormBuilder,public toast: ToastrService,private auth:AuthfakeauthenticationService) {
    //liste primes
    this.service.Getprimes(this.auth.currentUserValue.exercice_id).subscribe(response=>{  
      this.service.p=response;
     })
     //Liste employes
    
     this.service.Getmois().subscribe(response=>{  
      this.mois=response;
     })
    this.tables$ = service.tables$;
    this.total$ = service.total$;
   
  }

  ngOnInit(): void {
  
     this.service.Gettypesprimes().subscribe(response=>{  
      this.Type_primes=response;
     
     })
     this.service.employes(this.auth.currentUserValue.societe_id).subscribe(response=>{  
      this.liste_employes=response;
      })
 

     
    this.breadCrumbItems = [{ label: 'Les élements de paie' }, { label: 'Prime', active: true }];
    this.validationform = this.formBuilder.group({
      matricule: [''],
      nom: ['',Validators.required],
      salaire_base: [''],
      mois: ['',Validators.required],
      rubrique: ['',Validators.required],
      cotisable:new FormControl('true'),
      imposable:new FormControl('true'),
      tfp:new FormControl('true'),
      foprolos:new FormControl('true'),
      assurance_groupe:new FormControl('true'),
      medecine_travail:new FormControl('true'),
      type: new FormControl('fixe'),
      montant_min: ['',Validators.pattern('[0-9.]+')],
      montant_calcule: ['',Validators.required],
      montant_fixe: ['',Validators.pattern('[0-9.]+')],
      montant_max: ['',Validators.pattern('[0-9.]+')],
      plafond: ['',Validators.pattern('[0-9.]+')],
      taux: ['',Validators.pattern('[0-9.]+')],
    });

    this.validationeditform = this.formBuilder.group({
      matricule: [''],
      nom: [''],
      salaire_base: [''],
      mois: ['',Validators.required],
      rubrique: ['',Validators.required],
      cotisable:new FormControl('true'),
      imposable:new FormControl('true'),
      tfp:new FormControl('true'),
      foprolos:new FormControl('true'),
      assurance_groupe:new FormControl('true'),
      medecine_travail:new FormControl('true'),
      type: new FormControl('fixe'),
      montant_min: ['',Validators.pattern('[0-9.]+')],
      montant_calcule: ['',Validators.required],
      montant_fixe: ['',Validators.pattern('[0-9.]+')],
      montant_max: ['',Validators.pattern('[0-9.]+')],
      plafond: ['',Validators.pattern('[0-9.]+')],
      taux: ['',Validators.pattern('[0-9.]+')],
    });

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
    get form() {
      return this.validationform.controls;
    }
    get editform() {
      return this.validationeditform.controls;
    }
    saveData(){
      this.submitted=true;
      if(this.validationform.valid){
      this.service.addprime(this.validationform.value,this.auth.currentUserValue.exercice_id).subscribe(response=>{   
        Swal.fire({
          icon: 'success',
          title: 'Ajouté avec succès ',
          showConfirmButton: false,
          timer: 1500
        });
        this.service.Getprimes(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
          this.service.p=response;
          this.tables$ = this.service.tables$;
         }) 
      }) 
      this.annuler();
      this.submitted=false;
      this.active=1
    }
       
    }
    openedit(prime){
      this.modifhide=false
      this.active=4
      this.editID=prime.id
      if(prime.type=="fixe")
        this.hide_inputs=false
        else
        this.hide_inputs=true
      
      this.validationeditform.get('matricule').setValue(prime.matricule_employe)
      this.validationeditform.get('nom').setValue(prime.nom)
      this.validationeditform.get('salaire_base').setValue(prime.salaire_base)
      this.validationeditform.get('mois').setValue(prime.mois)
      this.validationeditform.get('rubrique').setValue(prime.rubrique)
      this.validationeditform.get('cotisable').setValue(prime.cotisable)
      this.validationeditform.get('imposable').setValue(prime.imposable)
      this.validationeditform.get('tfp').setValue(prime.tfp)
      this.validationeditform.get('foprolos').setValue(prime.foprolos)
      this.validationeditform.get('assurance_groupe').setValue(prime.assurance_groupe)
      this.validationeditform.get('medecine_travail').setValue(prime.medecine_travail)
      this.validationeditform.get('type').setValue(prime.type)
      this.validationeditform.get('montant_fixe').setValue(prime.montant_fixe)
      this.validationeditform.get('plafond').setValue(prime.plafond)
      this.validationeditform.get('taux').setValue(prime.taux)
      this.validationeditform.get('montant_min').setValue(prime.montant_min)
      this.validationeditform.get('montant_max').setValue(prime.montant_max)
      this.validationeditform.get('montant_calcule').setValue(prime.montant)

    }
    editData(){
     
      this.submitted=true;
      if(this.validationeditform.valid){
      this.service.updateprime(this.validationeditform.value,this.editID).subscribe(response=>{ 
        Swal.fire({
          icon: 'success',
          title: 'Modification Réussite',
          showConfirmButton: false,
          timer: 1500
        });
        this.service.Getprimes(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
          this.service.p=response;
          this.tables$ = this.service.tables$;
          this.modifhide=true
          this.submitted=false
          this.active=1
         }) 
        })
      }
       
      
    }

    
    eventtype(event){
      if(event.target.value=="fixe")
      {
      this.hide_inputs=false
      this.validationform.get('montant_fixe').setValue('')
      this.validationform.get('montant_calcule').setValue('')
      this.validationform.get('plafond').setValue('')
      this.validationeditform.get('montant_fixe').setValue('')
      this.validationeditform.get('plafond').setValue('')
      this.validationeditform.get('montant_calcule').setValue('')
      
      }
      else
      {
      this.hide_inputs=true
      this.validationform.get('taux').setValue('')
      this.validationform.get('montant_calcule').setValue('')
      this.validationform.get('montant_min').setValue('')
      this.validationform.get('montant_max').setValue('')
      this.validationeditform.get('taux').setValue('')
      this.validationeditform.get('montant_min').setValue('')
      this.validationeditform.get('montant_max').setValue('')
      this.validationeditform.get('montant_calcule').setValue('')
      }
    }
    canceledit()
    {
      this.modifhide=true
      this.active=1

    }
    
    deleteprime(id,mois){
     // let k=moment(tab.date).format("MM")
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
        text: 'êtes-vous sûr de vouloir supprimer Cette prime!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#ff3d60',
        confirmButtonText: 'Oui, Supprimer!',
        cancelButtonText:'Annuler'
      }).then(result => {
        if (result.value) {
         this.service.deleteprime(id).subscribe(response=>{  
          this.service.Getprimes(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
            this.service.p=response;
            this.tables$ = this.service.tables$;
           })    
          })
          Swal.fire('la suppression est effectuée!', 'Prime Supprimée.', 'success');
        }
      });
    }
  });
    
    }

    search_employe(){
    console.log(this.validationform.get('nom').value)
      this.service.Get_employe_matricule(this.validationform.get('nom').value).subscribe(response=>{   
        if(response.length!=0){
        this.validationform.get('matricule').setValue(this.validationform.get('nom').value)
        this.validationform.get('salaire_base').setValue(response[0].salaire_base)
        //this.toast.success('Employeé existe');
       
        }
        else{
          this.toast.error('Les informations de cette employe ne sont pas complet ou modifiées!');
          this.validationform.get('nom').setValue('')
          this.validationform.get('matricule').setValue('')
          this.validationform.get('salaire_base').setValue('')
        }
       })
     }
     calcule_montant()
     {
       if(this.validationform.get('type').value=="fixe"){
       this.validationform.get('montant_calcule').setValue(this.validationform.get('montant_fixe').value)
       }
       else{
        this.validationform.get('montant_calcule').setValue((this.validationform.get('taux').value* this.validationform.get('salaire_base').value)/100)
       }
     }

     calcule_montant_edit()
     {
       if(this.validationeditform.get('type').value=="fixe"){
       this.validationeditform.get('montant_calcule').setValue(this.validationeditform.get('montant_fixe').value)
       }
       else{
        this.validationeditform.get('montant_calcule').setValue((this.validationeditform.get('taux').value*this.validationeditform.get('salaire_base').value)/100)
       }
     }
     annuler(){
      this.validationform.get('nom').setValue('')
      this.validationform.get('matricule').setValue('')
      this.validationform.get('salaire_base').setValue('')
      this.validationform.get('mois').setValue('')
      this.validationform.get('rubrique').setValue('')
      this.validationform.get('montant_fixe').setValue('')
      this.validationform.get('plafond').setValue('')
      this.validationform.get('taux').setValue('')
      this.validationform.get('montant_min').setValue('')
      this.validationform.get('montant_max').setValue('')
      this.validationform.get('montant_calcule').setValue('')



     }
}
