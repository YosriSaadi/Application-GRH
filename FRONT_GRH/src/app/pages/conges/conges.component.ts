import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CongesService } from './conges.service';
import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.scss']
})
export class CongesComponent implements OnInit {
  Ajouterform: any;
  submitted: boolean;
  Modifierform: any;
  submit: boolean;
  liste_employes:[];
  breadCrumbItems: ({ label: string; active?: undefined; } | { label: string; active: boolean; })[];
  tabledata: any;
  editId: any;
  fictif_hide:boolean=false;
  ajouterform: any;
  Id: any;
  jour_ferier:boolean;
  nbr_j:any;
  typec:[];
  mois: { id: number; value: string; }[];
  constructor(private formBuilder:FormBuilder,private modalService: NgbModal,private service:CongesService,public toast: ToastrService,private auth:AuthfakeauthenticationService) { }

  ngOnInit(): void {
    //type congés
    this.service.Get_typeconge(this.auth.currentUserValue.societe_id).subscribe(response=>{   
      this.typec=response
     })
     // employes
     this.service.employes(this.auth.currentUserValue.societe_id).subscribe(response=>{   
      this.liste_employes=response
     })

     this.mois = [
      { id: 1, value: "Janvier" },
      { id: 2, value: "Février" },
      { id: 3, value: "Mars" },
      { id: 4, value: "Avril" }, 
      { id: 5, value: "Mai" },
      { id: 6, value: "Juin" } ,
      { id: 7, value: "Juillet" },
      { id: 8, value: "Août" } ,
      { id: 9, value: "Septembre" },
      { id: 10, value: "Octobre" },
      { id: 11, value: "Novembrre" },
      { id: 12, value: "Décembre" }
  ];
 
    this.breadCrumbItems = [{ label: 'Les élement de paie' }, { label: 'Congé', active: true }];
    this.ajouterform = this.formBuilder.group({
      nom: ['',Validators.required],
      matricule: [],
      nbr_jrs:['',[Validators.required]],
      mois: ['',Validators.required],
      paye: [false],
      typec: ['',Validators.required],
      dated: [''],
      datef: [''],

    });
    this.Modifierform = this.formBuilder.group({
      matricule: ['',Validators.required],
      nom: [],
      mois: ['',Validators.required],
      paye: [],
      nbr_jrs:['',[Validators.required]],
      typec: ['',Validators.required],
      dated: ['',Validators.required],
      datef: ['',Validators.required],
    });
    this.getConges();
  }
  get form() {
    return this.ajouterform.controls;
  }
  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
Ajouter(){
  this.submit=true;
  this.jour_ferier=false;
  console.log(this.ajouterform.value)
  if(this.ajouterform.valid){
  this.service.verification_planning(moment(this.ajouterform.get('dated').value).format('DD-MM-YYYY'),this.ajouterform.get('matricule').value).subscribe(response=>{ 
  console.log(moment(this.ajouterform.get('dated').value).format('DD-MM-YYYY'))
    console.log(response)
    if(response.length!=0){
  this.jour_ferier=true;

  }
  })
  let start=moment(this.ajouterform.get('dated').value)
   let end=moment(this.ajouterform.get('datef').value)
  var duration = moment.duration(end.diff(start));
   var days = duration.asDays()+1;



    let mois=moment(this.ajouterform.get('dated').value).format('MM')
    console.log(mois)
    this.service.mois_cloture(mois,this.auth.currentUserValue.societe_id).subscribe(response=>{ 
     if(response[0].cloture){
    
      Swal.fire({
        icon: 'error',
        title: 'Ajout annulé',
        text: 'Ce mois est déjà clôturé!',
      })
     }else if(!this.jour_ferier){
    this.service.Get_droit_conge(this.ajouterform.get('matricule').value,this.auth.currentUserValue.exercice_id).subscribe(response=>{   
      //vérification droit congé
      
      if((response[0].soldeinitial-response[0].congepris)>days){
      if(days>0){
      this.service.addconges(this.ajouterform.value,this.auth.currentUserValue.exercice_id).subscribe(response=>{   
        Swal.fire({
          icon: 'success',
          title: 'Ajouté avec succès',
          showConfirmButton: false,
          timer: 1500
        });
        this.ajouterform.reset();
        this.submit=false;
        this.getConges();
        this.modalService.dismissAll();
        });
      }
      else{
        this.toast.error('Date inavlide ou droit congé !');

      }
    }else{
      Swal.fire({
        title: 'Erreur!',
        text: 'Employé a dépassé le droit de congé par an !',
        icon: 'warning',
        confirmButtonColor: '#34c38f',
      });
      //this.toast.error('Employé a dépassé le droit de congé par an !!!');
    }

      })

    }
    else{

      Swal.fire({
        icon: 'error',
        title: 'Ajout annulé',
        text: 'Cette date correspond à une jour férié!',
      })
    }
  })
}
}
get formm() {
  return this.Modifierform.controls;
}

deleteconges(id:any,data){

  let k=moment(data.dated).format("MM")
     

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
    text: 'êtes-vous sûr de vouloir supprimer cette Congé!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34c38f',
    cancelButtonColor: '#ff3d60',
    confirmButtonText: 'Oui, Supprimer!',
    cancelButtonText:'Annuler'
  }).then(result => {
    if (result.value) {
      this.service.deleteconges(id).subscribe(response=>{  
        this.getConges();    
        })
      Swal.fire('la suppression a été effectuée!');
    }
  });
}
});

}
getConges() {
  this.service.Getconges(this.auth.currentUserValue.exercice_id).subscribe((data:any) => {
  this.tabledata = data;

});
} 
modifier(){
  this.submit=true;
 
  if(this.Modifierform.valid){
    console.log(this.Modifierform.value)
    this.service.updateconges(this.Modifierform.value,this.Id,this.nbr_j).subscribe(response=>{ 
      Swal.fire({
        icon: 'success',
        title: 'Modification avec succés',
        showConfirmButton: false,
        timer: 1500
      });
     this.getConges();
     this.submit=false;
      })
    this.modalService.dismissAll();
  }
  this.submit=false;

}
  
  openAjout(content:any){
    this.modalService.open(content, { centered: true });
}
openModif(content:any,table:any){
 this.Id=table.id
 this.nbr_j=table.nbr_jours
 console.log( this.nbr_j)
this.modalService.open(content, { centered: true });
this.Modifierform.get('nom').setValue(table.nom)
this.Modifierform.get('mois').setValue(table.mois)
this.Modifierform.get('matricule').setValue(table.matricule)
this.Modifierform.get('paye').setValue(table.fictif)
this.Modifierform.get('typec').setValue(table.code_conge)
this.Modifierform.get('dated').setValue(table.dated)
this.Modifierform.get('datef').setValue(table.datef)
this.Modifierform.get('nbr_jrs').setValue(table.nbr_jours)
}
search_employe(){
    this.service.Get_employe_matricule(this.ajouterform.get('nom').value).subscribe(response=>{   
      if(response.length!=0){
      this.ajouterform.get('matricule').setValue(this.ajouterform.get('nom').value)
      //this.toast.success('Employeé existe');
     
      }
      else{
        this.toast.error('Les informations de cette employe ne sont pas complet ou modifiées!');
        this.ajouterform.get('nom').setValue('')
        this.ajouterform.get('matricule').setValue('')
      }
     })
   }
 calcule_date_fin(){
  this.ajouterform.get('datef').setValue(this.ajouterform.get('dated').value)
  console.log(moment(this.ajouterform.get('dated').value).format('M'))
  this.ajouterform.get('mois').setValue(+moment(this.ajouterform.get('dated').value).format('M'))

 }

 calcule_nombre_jours(){
  let start=moment(this.ajouterform.get('dated').value)
  let end=moment(this.ajouterform.get('datef').value)
  var duration = moment.duration(end.diff(start));
  var days = duration.asDays();
  if(days<0){
    this.ajouterform.get('nbr_jrs').setValue('')
    this.toast.error('Date inavlide!!!');
  
  }
  else{
    this.ajouterform.get('nbr_jrs').setValue(days+1)
    
  }
  //modification
  }
  edit_calcule_nombre_jours(){
    let start=moment(this.Modifierform.get('dated').value)
    let end=moment(this.Modifierform.get('datef').value)
    var duration = moment.duration(end.diff(start));
    var days = duration.asDays();
    if(days<0){
      this.Modifierform.get('nbr_jrs').setValue('')
      this.toast.error('Date inavlide!!!');
    
    }
    else{
      this.Modifierform.get('nbr_jrs').setValue(days+1)
      
    }
  }
  edit_calcule_date_fin(){
    this.Modifierform.get('datef').setValue(this.Modifierform.get('dated').value)
    this.Modifierform.get('mois').setValue(+moment(this.Modifierform.get('dated').value).format('M'))
  
   }


   fictif(event){
     if(event.target.checked){
     this.fictif_hide=true
     this.service.Get_droit_conge(this.ajouterform.get('matricule').value,this.auth.currentUserValue.exercice_id).subscribe(response=>{ 
     this.ajouterform.get('nbr_jrs').setValue(response[0].soldeinitial-response[0].congepris)
    
    })
     }else{
      this.fictif_hide=false
      this.ajouterform.get('nbr_jrs').setValue('')

     }

   }
  annuler(){
    this.submitted=false;
    this.modalService.dismissAll();
    this.ajouterform.get('nom').setValue('')
    this.ajouterform.get('matricule').setValue('')
    this.ajouterform.get('mois').setValue('')
    this.ajouterform.get('nbr_jrs').setValue('')
    this.ajouterform.get('dated').setValue('')
    this.ajouterform.get('datef').setValue('')
    this.ajouterform.get('type').setValue('')
   
  
  }
  
}
