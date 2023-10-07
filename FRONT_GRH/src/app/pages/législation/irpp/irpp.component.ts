import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Irppservice } from './irpp.service';
import{NgbNav} from '@ng-bootstrap/ng-bootstrap'
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

@Component({
  selector: 'app-irpp',
  templateUrl: './irpp.component.html',
  styleUrls: ['irpp.component.scss']
})
export class IrppComponent implements OnInit {
  Ajouterform: any;
  submitted: boolean;
  Modifierform: any;
  submit: boolean;
  breadCrumbItems: ({ label: string; active?: undefined; } | { label: string; active: boolean; })[];
  tabledata: any;
  editId: any;
  ajouterform: any;
  Id: any;

  constructor(private formBuilder:FormBuilder,private modalService: NgbModal,private service:Irppservice,private auth:AuthfakeauthenticationService) { }

  ngOnInit(): void {

    this.breadCrumbItems = [{ label: 'Législation' }, { label: 'IRPP', active: true }];
    this.ajouterform = this.formBuilder.group({
      id: ['',[Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
      designation: ['' ,[Validators.required]],
      defaut:[false],
      frais_prof:  ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      cheffam:  ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      enfant1: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      enfant2: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      enfant3:['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      enfant4: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      enfant_infirme: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      enfant_etu: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      parent:  ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      t1: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      t2: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      t3:  ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      t4:  ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      t5:  ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      t6:  [''],
      t1_2:  [''],
      t2_3:  [''],
      t3_4:  [''],
      t4_5:  [''],
      ta1: [''],
      ta2: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      ta3:['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      ta4: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      ta5: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      ta6: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
    })
      this.Modifierform = this.formBuilder.group({
      id: ['',[Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
      designation: ['' ,[Validators.required]],
      defaut:[false],
      frais_prof:  ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      cheffam:  ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      enfant1: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      enfant2: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      enfant3:['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      enfant4: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      enfant_infirme: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      enfant_etu: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      parent:  ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      t1: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      t2: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      t3:  ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      t4:  ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      t5:  ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      t6:  [''],
      t1_2:  [''],
      t2_3:  [''],
      t3_4:  [''],
      t4_5:  [''],
      ta1: [''],
      ta2: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      ta3:['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      ta4: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      ta5: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      ta6: ['',[Validators.required, Validators.pattern('[0-9,.]+')]],
      })
    this.getirpp();
  }
  get form() {
    return this.ajouterform.controls;
  }
  openModal(content: any) {
    this.modalService.open(content,{ size: 'lg' });
  }
Ajouter(){
 

  this.Id=this.ajouterform.get('id').value;
  this.submitted=true;
  if(this.ajouterform.valid){
 this.service.GetIrppbyid(this.Id).subscribe(response=>{ 
      console.log(response);
  if(response.length!=0){
    Swal.fire({
      icon: 'error',
      title: 'IRPP déja existe !',
      showConfirmButton: false,
      timer: 1500
    });
  }
  else{
      this.service.AddIrpp(this.ajouterform.value,this.auth.currentUserValue.societe_id).subscribe(response=>{   
        Swal.fire({
          icon: 'success',
          title: 'Ajouté avec succès',
          showConfirmButton: false,
          timer: 1500
        });
        this.ajouterform.reset();
        this.submitted=false;
        this.getirpp();
        this.modalService.dismissAll();
        });}
      });
   }
  
}
get f() {
  return this.Modifierform.controls;
}

deleteirpp(id:any){
  Swal.fire({
    title: 'Confirmation de suppression?',
    text: 'êtes-vous sûr de vouloir supprimer cette régime!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34c38f',
    cancelButtonColor: '#ff3d60',
    confirmButtonText: 'Oui, Supprimer!'
  }).then(result => {
    if (result.value) {
      this.service.deleteirpp(id).subscribe(response=>{  
        this.getirpp();    
        })
      Swal.fire('La suppression a été effectuée!');
    }
  });


}
getirpp() {
  this.service
.GetIrpp(this.auth.currentUserValue.societe_id)
.subscribe((data:any) => {
  console.log(data);
  this.tabledata = data;

});
} 
modifier(){
  this.submitted=true;
   if(this.Modifierform.valid){

    this.service.updateirpp(this.Modifierform.value).subscribe(response=>{ 
      Swal.fire({
        icon: 'success',
        title: 'Modifié avec succés',
        showConfirmButton: false,
        timer: 1500
      });
      this.submitted=false;
     this.getirpp();
      })
    this.modalService.dismissAll();
  }

}
  
  openAjout(content:any){
    this.modalService.open(content, { centered: true });
}
openModif(content:any,table:any){
  this.modalService.open(content,{ size: 'lg' });

this.Modifierform.get('id').setValue(table.id)
this.Modifierform.get('designation').setValue(table.designation)
this.Modifierform.get('defaut').setValue(table.defaut)
this.Modifierform.get('cheffam').setValue(table.chef_famille)
this.Modifierform.get('frais_prof').setValue(table.taux_frais_prof)
this.Modifierform.get('enfant1').setValue(table.enfant1)
this.Modifierform.get('enfant2').setValue(table.enfant2)
this.Modifierform.get('enfant3').setValue(table.enfant3)
this.Modifierform.get('enfant4').setValue(table.enfant4)
this.Modifierform.get('enfant_infirme').setValue(table.enfant_infirme)
this.Modifierform.get('enfant_etu').setValue(table.enfant_sans_bourse)
this.Modifierform.get('parent').setValue(table.parent)
this.Modifierform.get('t1').setValue(table.tranche1)
this.Modifierform.get('t2').setValue(table.tranche2)
this.Modifierform.get('t3').setValue(table.tranche3)
this.Modifierform.get('t4').setValue(table.tranche4)
this.Modifierform.get('t5').setValue(table.tranche5)
this.Modifierform.get('ta1').setValue(table.taux_tranche1)
this.Modifierform.get('ta2').setValue(table.taux_tranche2)
this.Modifierform.get('ta3').setValue(table.taux_tranche3)
this.Modifierform.get('ta4').setValue(table.taux_tranche4)
this.Modifierform.get('ta5').setValue(table.taux_tranche5)
this.Modifierform.get('ta6').setValue(table.taux_tranche6)
this.Modifierform.get('t1_2').setValue(table.tranche1)
this.Modifierform.get('t2_3').setValue(table.tranche2)
this.Modifierform.get('t3_4').setValue(table.tranche3)
this.Modifierform.get('t4_5').setValue(table.tranche4)
this.Modifierform.get('t6').setValue(table.tranche5)

}
chargement(){
  this.ajouterform.get('t1_2').setValue(this.ajouterform.get('t1').value)
  this.ajouterform.get('t2_3').setValue(this.ajouterform.get('t2').value)
  this.ajouterform.get('t3_4').setValue(this.ajouterform.get('t3').value)
  this.ajouterform.get('t4_5').setValue(this.ajouterform.get('t4').value)
  this.ajouterform.get('t6').setValue(this.ajouterform.get('t5').value)
}
}