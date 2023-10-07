import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ShiftService } from './shift.service';
import { RegimeService } from '../regimes/regime.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})

export class ShiftsComponent implements OnInit {
  Ajouterform: any;
  submitted: boolean;
  Modifierform: any;
  submit: boolean;
  breadCrumbItems: ({ label: string; active?: undefined; } | { label: string; active: boolean; })[];
  tabledata: any;
  editId: any;
  Id: any;
  regimes:any[];
  horaire:string[];
  constructor(private formBuilder:FormBuilder,private modalService: NgbModal,private service:ShiftService,public auth:AuthfakeauthenticationService,public regimeservice:RegimeService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Législation' }, { label: 'Shift', active: true }];
    this.horaire = ['Séance Double','Séance Ramadan','Séance Unique']

  this.getRegime();
    this.Ajouterform = this.formBuilder.group({
      code:  ['',[Validators.required, Validators.pattern('[0-9A-Za-z ]+')]],
      shift:  ['',[Validators.required, Validators.pattern('[0-9A-Za-z ]+')]],
      regime:  ['Sélectionner un régime',[Validators.required]],
      nbrjm:  ['',[Validators.required, Validators.pattern('[0-9.,]+')]],
      nbrhm:  ['',[Validators.required, Validators.pattern('[0-9.,]+')]],
      horaire:  ['',Validators.required],
      nbrpm:  ['',[Validators.required, Validators.pattern('[0-9.,]+')]],
      defaut:[false]
    });
    this.Modifierform = this.formBuilder.group({
      code:  [''],
      shift:  ['',[Validators.required, Validators.pattern('[0-9A-Za-z ]+')]],
      regime:  ['Sélectionner un régime',[Validators.required]],
      nbrjm:  ['',[Validators.required, Validators.pattern('[0-9.,]+')]],
      nbrhm:  ['',[Validators.required, Validators.pattern('[0-9.,]+')]],
      horaire:  ['',Validators.required],
      nbrpm:  ['',[Validators.required, Validators.pattern('[0-9.,]+')]],
      defaut:[false]
    });
    this.getShift();
    this.getregimesids();
  }
  get form() {
    return this.Ajouterform.controls;
  }
  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
  getRegime() {
    this.regimeservice.Getregime(this.auth.currentUserValue.societe_id).subscribe((data:any) => {
    console.log(data);
    this.regimes = data;
  
  });
  } 
  Ajouter(){
    this.Id=this.Ajouterform.get('code').value;
    console.log(this.Id)
    this.submitted=true;
    console.log(this.Ajouterform.valid);
    if(this.Ajouterform.valid){
      this.service.Getshiftbyid(this.Id).subscribe(response=>{ 
        console.log(response);
    if(response.length!=0){
      Swal.fire({
        icon: 'error',
        title: 'Shift déja existe !',
        showConfirmButton: false,
        timer: 1500
      });}
    else{
        this.service.addshift(this.Ajouterform.value).subscribe(response=>{   
          Swal.fire({
            icon: 'success',
            title: 'Ajouté avec succès',
            showConfirmButton: false,
            timer: 1500
          });
          this.Ajouterform.reset();
          this.submitted=false;
          this.getShift();
          this.modalService.dismissAll();
          this.submitted=false;
          });}
        });
   }
  }
get f() {
  return this.Modifierform.controls;
}
getregimesids(){
  this.service.Getregimeids().subscribe(response=>{ 
  this.regimes=response; 
   console.log(response);
    })
}
deleteshift(id:any){
  Swal.fire({
    title: 'Confirmation de suppression?',
    text: 'êtes-vous sûr de vouloir supprimer cette shift!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34c38f',
    cancelButtonColor: '#ff3d60',
    confirmButtonText: 'Oui, Supprimer!',
    cancelButtonText:'Annuler'
  }).then(result => {
    if (result.value) {
      this.service.deletshift(id).subscribe(response=>{  
        this.getShift();    
        })
      Swal.fire('la suppression a été effectuée!');
    }
  });

}
getShift() {
  this.service
.Getshift(this.auth.currentUserValue.societe_id)
.subscribe((data:any) => {
  console.log(data);
  this.tabledata = data;

});
} 
Modifier(){
  this.submit=true;
   if(this.Modifierform.valid){

    this.service.updateshift(this.Modifierform.value).subscribe(response=>{ 
      Swal.fire({
        icon: 'success',
        title: 'Modification avec succés',
        showConfirmButton: false,
        timer: 1500
      });
     this.getShift();
     this.submit=false;
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
this.Modifierform.get('shift').setValue(table.designation)
this.Modifierform.get('regime').setValue(table.regime)
this.Modifierform.get('nbrjm').setValue(table.nbr_jours_mois)
this.Modifierform.get('nbrhm').setValue(table.nbr_heures_mois)
this.Modifierform.get('horaire').setValue(table.horaire)
this.Modifierform.get('nbrpm').setValue(table.nbr_pointage_jours)
this.Modifierform.get('defaut').setValue(table.defaut)
}
}






















