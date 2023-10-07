import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { RegimeService } from './regime.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

@Component({
  selector: 'app-regimes',
  templateUrl: './regimes.component.html',
  styleUrls: ['./regimes.component.scss']
})
export class RegimesComponent implements OnInit {
  Ajouterform: any;
  submitted: boolean;
  Modifierform: any;
  submit: boolean;
  breadCrumbItems: ({ label: string; active?: undefined; } | { label: string; active: boolean; })[];
  tabledata: any;
  editId: any;
  ajouterform: any;
  Id: any;

  constructor(private formBuilder:FormBuilder,private modalService: NgbModal,private service:RegimeService,public auth:AuthfakeauthenticationService) { }

  ngOnInit(): void {

    this.breadCrumbItems = [{ label: 'Législation' }, { label: 'Régimes', active: true }];
    this.ajouterform = this.formBuilder.group({
      code: ['',[Validators.required, Validators.pattern('[0-9a-zA-Z ]+')]],
      designation: ['' ,[Validators.required, Validators.pattern('[0-9a-zA-Z ]+')]],
      nbrhm: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      nbrhmm: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
    });
    this.Modifierform = this.formBuilder.group({
      code: [''],
      designation: ['' ,[Validators.required, Validators.pattern('[0-9a-zA-Z ]+')]],
      nbrhm: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      nbrhmm: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
    });
    this.getRegime();
  }
  get form() {
    return this.ajouterform.controls;
  }
  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
Ajouter(){
  this.Id=this.ajouterform.get('code').value;
  console.log(this.Id)
  this.submitted=true;
  if(this.ajouterform.valid){
    this.service.Getregimebyid(this.Id).subscribe(response=>{ 
      console.log(response);
  if(response.length!=0){
    Swal.fire({
      icon: 'error',
      title: 'Régime déja existe !',
      showConfirmButton: false,
      timer: 1500
    });}
  else{
      this.service.addregime(this.ajouterform.value,this.auth.currentUserValue.societe_id).subscribe(response=>{   
        Swal.fire({
          icon: 'success',
          title: 'Ajouté avec succès',
          showConfirmButton: false,
          timer: 1500
        });
       
        this.ajouterform.reset();
        this.modalService.dismissAll();
        this.getRegime();
        this.submitted=false;
        });}
      });
  
    }
  
}
get f() {
  return this.Modifierform.controls;
}

deleteregime(id:any){
  Swal.fire({
    title: 'Confirmation de suppression?',
    text: 'êtes-vous sûr de vouloir supprimer cette régime!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34c38f',
    cancelButtonColor: '#ff3d60',
    confirmButtonText: 'Oui, Supprimer!',
    cancelButtonText:'Annuler'
  }).then(result => {
    if (result.value) {
      this.service.deletregime(id).subscribe(response=>{  
        this.getRegime();    
        })
      Swal.fire('la suppression a été effectuée!');
    }
  });

}
getRegime() {
  console.log(this.auth.currentUserValue.societe_id);
  this.service.Getregime(this.auth.currentUserValue.societe_id).subscribe((data:any) => {
  console.log(data);
  this.tabledata = data;

});
} 
modifier(){
  this.submit=true;

  if(this.Modifierform.valid){

    this.service.updateregime(this.Modifierform.value).subscribe(response=>{ 
      Swal.fire({
        icon: 'success',
        title: 'Modification avec succés',
        showConfirmButton: false,
        timer: 1500
      });
      this.submit=false;
     this.getRegime();
      })
    this.modalService.dismissAll();
  }

}
  
  openAjout(content:any){
    this.modalService.open(content, { centered: true });
}
openModif(content:any,table:any){

this.modalService.open(content, { centered: true });
this.Modifierform.get('code').setValue(table.code)
this.Modifierform.get('designation').setValue(table.designation)
this.Modifierform.get('nbrhm').setValue(table.nbr_heure_mois)
this.Modifierform.get('nbrhmm').setValue(table.nbr_heure_mois_max)
}
}
