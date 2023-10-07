import { Component, OnInit } from '@angular/core';
import{ordresservice} from './shared/ordres.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {mois} from './shared/order.model'
import Swal from 'sweetalert2';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
@Component({
  selector: 'app-ordres',
  templateUrl: './ordres.component.html',
  styleUrls: ['./ordres.component.scss']
})
export class OrdresComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  mois_primes:Array<mois> = [];
  validationform: FormGroup;
  hide:boolean=false;
  submitted:boolean=false;
  constructor(private modalService: NgbModal,  public formBuilder: FormBuilder,private service:ordresservice,private auth:AuthfakeauthenticationService) { }
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Configuration' }, { label: 'Mois', active: true }];
    this.service.Getmois().subscribe(response=>{  
     this.mois_primes=response
    })

    this.validationform = this.formBuilder.group({
      ordre: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      designation: ['', [Validators.required, Validators.pattern('[a-zA-Z1-9,é ]+')]],
      cloture: [''],
      base_calcul: [''],
      taux_assiduite:[''],
      assurance_groupe:[''],
      liq_impot:[''],
    });
  }
  get form() {
    return this.validationform.controls;
  }
   /**
   * Modal Open
   * @param content modal content
   */
    openModal(content: any) {
      this.modalService.open(content, { centered: true });
    }
  changer_cloture(item,event){
    this.mois_primes[item.ordre-1].cloture=event.target.checked
    

  }
  changer_basecalcule(item,event){
    this.mois_primes[item.ordre-1].base_calcul=event.target.value

  }
  changer_taux_assiduite(item,event){
    this.mois_primes[item.ordre-1].taux_assiduite=event.target.checked
  }
  changer_assurance_groupe(item,event){
    this.mois_primes[item.ordre-1].assurance_groupe=event.target.checked
  }
  changer_liq_impot(item,event){
    this.mois_primes[item.ordre-1].liq_impot=event.target.checked
  }
  edit_moit(ordre){

    this.service.updatemois(this.mois_primes[ordre-1],ordre).subscribe(response=>{ 
      Swal.fire({
        icon: 'success',
        title: 'Modification Réussite',
        showConfirmButton: false,
        timer: 1500
      });
      this.service.Getmois().subscribe(response=>{  
        this.mois_primes=response
       })  
      })

  }
  delete_mois(ordre){
    Swal.fire({
      title: 'Confirmation de suppression?',
      text: 'êtes-vous sûr de vouloir supprimer cet mois!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Oui, Supprimer!',
      cancelButtonText:'Annuler'
    }).then(result => {
      if (result.value) {
       this.service.deletemois(ordre).subscribe(response=>{  
        this.service.Getmois().subscribe(response=>{  
          this.mois_primes=response
         })   
        })
        Swal.fire('la suppression est effectuée!', 'Mois Supprimé.', 'success');
      }
    });
  }
  hide_mois_prime(event)
  {
    if(event.target.checked)
    this.hide=true
    else
    this.hide=false

  }
  saveData(){
    this.submitted=true
    if(this.validationform.valid){
    this.service.addmois(this.auth.currentUserValue.societe_id,this.validationform.value).subscribe(response=>{   
      Swal.fire({
        icon: 'success',
        title: 'Ajouté avec succès ',
        showConfirmButton: false,
        timer: 1500
      });
      this.service.Getmois().subscribe(response=>{  
        this.mois_primes=response
       })
       this.modalService.dismissAll();
    }) 
  }

  }

}
