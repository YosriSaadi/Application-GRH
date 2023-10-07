import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import{NgbModal, NgbNav} from '@ng-bootstrap/ng-bootstrap'
import Swal from 'sweetalert2';
import { ParametrageService } from './parametrage.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';

@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.scss']
})
export class ParametrageComponent implements OnInit {
  deparform: any;
  submit:any;
  depdata:any;
  breadCrumbItems: ({ label: string; active?: undefined; } | { label: string; active: boolean; })[];
  dep: string[];
  qual:any[];
  ser: string[];
  sec: string[];
  sectform: any;
  servform: any;
  Id: any;
  Modifierform: any;
  deparmodform: any;
  submitt: boolean;
  servmodform: any;
  sectmodform: any;
  sectdata: any;
  serdata: any;
  secdata: any;
  primeform: any;
  primemodform: any;
  secprime: any;
  primedata: any;
  avanform: any;
  avanmodform: any;
  avandata: any;

  //retenue
  retenuform: any;
  retdata: any;
  retenumodform: any;
  //conge
  congesform: any;
  congesformm: any;
  congesdata: any;
  motifform: any;
  //motif
  motifmodform: any;
  motifdata: any;
  libelleform: any;
  libellemodform: any;
  typequalform: any;
  qualmodform: any;
  typecollform: any;
  typecollmodform: any;
  colldata: any;
  qualdata: any;
  pretdata: any;
  statutform: any;
  statutmodform: any;
  statutdata: any;
  qualform:any;
  qualformm:any;
  typecollformm:any;


  constructor(private formBuilder:FormBuilder,private modalService: NgbModal,private service:ParametrageService,private auth:AuthfakeauthenticationService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Paramétrages' }];
    this.deparform = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      designation: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]]
    }); 
     this.deparmodform = this.formBuilder.group({
      id: [''],
      designation: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]]
    });

    this.servform = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]],
      departement:['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]],
      designation:['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]],
      id_dep:['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]],

    });
    this.servmodform = this.formBuilder.group({
      id: [''],
      departement:['',Validators.required],
      designation:['', [Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]],
  

    });
    this.sectform = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      service:['', Validators.required],
      designation:['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]],

    });
    this.sectmodform = this.formBuilder.group({
      id: [''],
      service:[''],
      designation:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]],

    });
    //prime form
    this.primeform = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      designation:['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]],
      proportionnelle:[false],
      toutourien:[false],


    });
    this.primemodform = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      designation:['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]],
      proportionnelle:[false],
      toutourien:[false],


    });
    //employé form 
    this.qualform = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      designation: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]]
    }); 
    this.qualformm = this.formBuilder.group({
      code: [''],
      designation: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]]
    }); 
    this.typecollform = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      designation: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]]
    }); 
    this.typecollmodform = this.formBuilder.group({
      code: [''],
      designation: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]]
    }); 
    //type retenue
    this.retenuform = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      designation: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]]
    }); 
    this.retenumodform = this.formBuilder.group({
      code: [''],
      designation: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]]
    }); 
    //moif formmo
    this.motifform = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      designation: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]]
    }); 
    this.motifmodform = this.formBuilder.group({
      code: [''],
      designation: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]]
    });
    //type congé
    this.congesform = this.formBuilder.group({
      code: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      designation: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]],
      conge_an:[false],
      paye:[false],
    });

    this.congesformm = this.formBuilder.group({
      code: [''],
      designation: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]],
      conge_an:[false],
      paye:[false],
    });
    //libelle du pret
    this.libelleform = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      designation: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]]
    }); 
    this.libellemodform = this.formBuilder.group({
      code: [''],
      designation: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]]
    });

  
    this.getprime();
    this.getDepar();
    this.getservice();
    this.getsec();
    //employé
    this.getqualiification();
    this.getcoll();
    this.getmotifs();
     //générale
     this.getret();
     //type de congé
     this. getconges();
     //libelle prets
     this.getlibelle();
  }
  get form_qual() {
    return this.qualform.controls;
  }
  get form() {
    return this.deparform.controls;
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
Ajouter(){
  this.Id=this.deparform.get('id').value;
  console.log(this.Id)
  this.submit=true;
  if(this.deparform.valid){
    this.service.Getdbyid(this.Id).subscribe(response=>{ 
      console.log(response);
  if(response.length!=0){
    Swal.fire({
      icon: 'error',
      title: 'Département déja existe !',
      showConfirmButton: false,
      timer: 1500
    });}
  else{
      this.service.addd(this.auth.currentUserValue.societe_id,this.deparform.value).subscribe(response=>{   
        Swal.fire({
          icon: 'success',
          title: 'Ajouté avec succès',
          showConfirmButton: false,
          timer: 1500
        });
        this.deparform.reset();
        this.submit=false;
        this.getDepar();
        });}
      });
  }
}
get form_dept_modif() {
  return this.deparmodform.controls;
}

deletedepar(id:any){
  Swal.fire({
    title: 'Confirmation de suppression?',
    text: 'êtes-vous sûr de vouloir supprimer cette Département!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34c38f',
    cancelButtonColor: '#ff3d60',
    confirmButtonText: 'Oui, Supprimer!',
    cancelButtonText:'Annuler'
  }).then(result => {
    if (result.value) {
      this.service.deleted(id).subscribe(response=>{  
        this.getDepar();   
        this.getservice();
        this.getsec(); 
        })
      Swal.fire('la suppression a été effectuée!');
    }
  });

}
change_submmit(){
  this.submit=false;
  this.submitt=false;
}
getDepar() {
  this.service.Getd().subscribe((data:any) => {
  this.depdata = data;
  this.dep=data;
});
} 
modifier_dept(){
  this.submitt=true;
  if(this.deparmodform.valid){

    this.service.updated(this.deparmodform.value).subscribe(response=>{ 
      Swal.fire({
        icon: 'success',
        title: 'Modification avec succés',
        showConfirmButton: false,
        timer: 1500
      });
      this.submitt=false;
     this.getDepar();
      })
    this.modalService.dismissAll();
  }

}
  
  openAjout(content:any){
    this.modalService.open(content, { centered: true });
}

openModif(content:any,table:any){
  console.log(table)
this.modalService.open(content, { centered: true });
this.deparmodform.get('id').setValue(table.id)
this.deparmodform.get('designation').setValue(table.designation)
}
/*************************service*************************************** */
get forms() {
  return this.servform.controls;
}
get forms_moodif() {
  return this.servmodform.controls;
}

Ajouters(){
this.Id=this.servform.get('id').value;
console.log(this.Id)
this.submit=true;
// if(this.servform.valid){
  this.service.GetSebyid(this.Id).subscribe(response=>{ 
  
if(response.length!=0){
  Swal.fire({
    icon: 'error',
    title: 'Service déja existe !',
    showConfirmButton: false,
    timer: 1500
  });}
else{
    this.service.addSe(this.servform.value).subscribe(response=>{   
      Swal.fire({
        icon: 'success',
        title: 'Ajouté avec succès',
        showConfirmButton: false,
        timer: 1500
      });
      this.servform.reset();
      this.submit=false;
      this.getservice();
      });}
    });
// }
}
get formms() {
return this.servmodform.controls;
}

deleteserv(id:any){
Swal.fire({
  title: 'Confirmation de suppression?',
  text: 'êtes-vous sûr de vouloir supprimer cette Service!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#34c38f',
  cancelButtonColor: '#ff3d60',
  confirmButtonText: 'Oui, Supprimer!',
  cancelButtonText:'Annuler'
}).then(result => {
  if (result.value) {
    this.service.deleteSe(id).subscribe(response=>{  
      this.getservice();    
      })
    Swal.fire('la suppression a été effectuée!');
  }
});

}
getservice() {
this.service.GetSe().subscribe((data:any) => {
this.serdata = data;
this.ser=data;


});
} 
modifiers(){
  this.submitt=true;


   if(this.servmodform.valid){
  
    this.service.updateSe(this.servmodform.value).subscribe(response=>{ 
      Swal.fire({
        icon: 'success',
        title: 'Modification avec succés',
        showConfirmButton: false,
        timer: 1500
      });
      this.submitt=false;
     this.getservice();
    this.modalService.dismissAll();
  });
 }
}
openModifs(content:any,table:any){
this.modalService.open(content, { centered: true });
this.servmodform.get('id').setValue(table.id)
this.servmodform.get('departement').setValue(table.departement)
this.servmodform.get('designation').setValue(table.designation)
}


/*****************************section********************************** */
get formsc() {
  return this.sectform.controls;
}

Ajoutersc(){
this.Id=this.sectform.get('id').value;
console.log(this.Id)
this.submit=true;
if(this.sectform.valid){
  this.service.GetSecbyid(this.Id).subscribe(response=>{ 

if(response.length!=0){
  Swal.fire({
    icon: 'error',
    title: 'Section déja existe !',
    showConfirmButton: false,
    timer: 1500
  });}
else{
    this.service.addSec(this.sectform.value).subscribe(response=>{   
      Swal.fire({
        icon: 'success',
        title: 'Ajouté avec succès',
        showConfirmButton: false,
        timer: 1500
      });
      this.sectform.reset();
      this.submit=false;
      this.getsec();
      });}
    });
}
}
get formmsc() {
return this.sectmodform.controls;
}

deletesect(id:any){
Swal.fire({
  title: 'Confirmation de suppression?',
  text: 'êtes-vous sûr de vouloir supprimer cette Section!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#34c38f',
  cancelButtonColor: '#ff3d60',
  confirmButtonText: 'Oui, Supprimer!',
  cancelButtonText:'Annuler'
}).then(result => {
  if (result.value) {
    this.service.deleteSec(id).subscribe(response=>{  
      this.getsec();    
      })
    Swal.fire('la suppression a été effectuée!');
  }
});

}
getsec() {
this.service.GetSec().subscribe((data:any) => {
this.secdata = data;
});
} 
modifiersc(){
this.submitt=true;
if(this.sectmodform.valid){
  this.service.updateSec(this.sectmodform.value).subscribe(response=>{ 
    Swal.fire({
      icon: 'success',
      title: 'Modification avec succés',
      showConfirmButton: false,
      timer: 1500
    });
    this.submitt=false;
   this.getsec();
  this.modalService.dismissAll();
});}}



openModifsc(content:any,table:any){
this.modalService.open(content, { centered: true });
this.sectmodform.get('id').setValue(table.id)
this.sectmodform.get('service').setValue(table.service)
this.sectmodform.get('designation').setValue(table.designation)
}
/*****************************primes********************************** */
get formp() {
  return this.primeform.controls;
}

Ajouterp(){
this.Id=this.primeform.get('code').value;
console.log(this.Id)
this.submit=true;
console.log(this.primeform.value)
if(this.primeform.valid){
  this.service.getprimebyid(this.Id).subscribe(response=>{ 
 
if(response.length!=0){
  Swal.fire({
    icon: 'error',
    title: 'Prime déja existe !',
    showConfirmButton: false,
    timer: 1500
  });}
else{
    this.service.addtypeprimes(this.auth.currentUserValue.societe_id,this.primeform.value).subscribe(response=>{   
      Swal.fire({
        icon: 'success',
        title: 'Ajouté avec succès',
        showConfirmButton: false,
        timer: 1500
      });
      this.getprime(); 
      //this.primeform.reset();
      this.primeform.get('code').setVlue('');
      this.primeform.get('designation').setVlue('');
      this.submit=false;
      this.getprime();
      });}
    });
}
}
get formmp() {
return this.primemodform.controls;
}

deleteprime(id:any){
Swal.fire({
  title: 'Confirmation de suppression?',
  text: 'êtes-vous sûr de vouloir supprimer cette Prime!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#34c38f',
  cancelButtonColor: '#ff3d60',
  confirmButtonText: 'Oui, Supprimer!',
  cancelButtonText:'Annuler'
}).then(result => {
  if (result.value) {
    this.service.deleteprime(id).subscribe(response=>{  
      this.getprime();    
      })
    Swal.fire('la suppression a été effectuée!');
  }
});

}
getprime() {
this.service.Getprime().subscribe((data:any) => {
this.primedata = data;

});
} 
getqualiification() {
  this.service.Getqualification(this.auth.currentUserValue.societe_id).subscribe((data:any) => {
  this.qual = data;
  });}
  Ajouter_qual(){

  this.Id=this.qualform.get('code').value;
  this.submit=true;

  if(this.qualform.valid){
    this.service.Getd_qual_byid(this.Id).subscribe(response=>{ 
 
  if(response.length!=0){
    Swal.fire({
      icon: 'error',
      title: 'Qualification déja existe !',
      showConfirmButton: false,
      timer: 1500
    });}
  else{
      this.service.add_qual(this.auth.currentUserValue.societe_id,this.qualform.value).subscribe(response=>{   
        Swal.fire({
          icon: 'success',
          title: 'Ajouté avec succès',
          showConfirmButton: false,
          timer: 1500
        });
        this.qualform.reset();
        this.submit=false;
        this.getqualiification();
        });}
      });
  }


  } 

modifierp(){
this.submitt=true;
if(this.primemodform.valid){

  this.service.updateprime(this.primemodform.value).subscribe(response=>{ 
    Swal.fire({
      icon: 'success',
      title: 'Modification avec succés',
      showConfirmButton: false,
      timer: 1500
    });
    this.submitt=false;
   this.getprime();
  this.modalService.dismissAll();
});}}
deletequal(id:any){
  Swal.fire({
    title: 'Confirmation de suppression?',
    text: 'êtes-vous sûr de vouloir supprimer cette Qualification!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34c38f',
    cancelButtonColor: '#ff3d60',
    confirmButtonText: 'Oui, Supprimer!',
    cancelButtonText:'Annuler'
  }).then(result => {
    if (result.value) {
      this.service.deletequalification(id).subscribe(response=>{  
        this.getqualiification();    
        })
      Swal.fire('la suppression a été effectuée!');
    }
  });
  
  }



openModifp(content:any,table:any){

this.modalService.open(content, { centered: true });
this.primemodform.get('code').setValue(table.code)
this.primemodform.get('designation').setValue(table.designation)
this.primemodform.get('proportionnelle').setValue(table.proportionnelle)
this.primemodform.get('toutourien').setValue(table.toutourien)



}
/*****************************avantages********************************** */
get forma() {
  return this.avanform.controls;
}



/***********************collége **********************************/
getcoll() {
  this.service.Getcollege().subscribe((data:any) => {
  this.colldata = data;

  
  });
  }
  
  
  modifier_college(){
  this.submitt=true;
  if(this.typecollmodform.valid){
  
    this.service.updatecollege(this.typecollmodform.value).subscribe(response=>{ 
      Swal.fire({
        icon: 'success',
        title: 'Modification avec succés',
        showConfirmButton: false,
        timer: 1500
      });
      this.submitt=false;
     this.getcoll();
    this.modalService.dismissAll();
  });}}
  
  openModifcollege(content:any,table:any){
 
    this.modalService.open(content, { centered: true });
    this.typecollmodform.get('code').setValue(table.code)
    this.typecollmodform.get('designation').setValue(table.designation)
    }
  
  

  
  
  get formtc() {
    return this.typecollform.controls;
  }
  
  Ajoutertc(){
  this.Id=this.typecollform.get('code').value;

  this.submit=true;
  if(this.typecollform.valid){
    this.service.getcollegebyid(this.Id).subscribe(response=>{ 
   
  if(response.length!=0){
    Swal.fire({
      icon: 'error',
      title: 'Collége déja existe !',
      showConfirmButton: false,
      timer: 1500
    });}
  else{
      this.service.addtcollege(this.typecollform.value).subscribe(response=>{   
        Swal.fire({
          icon: 'success',
          title: 'Ajouté avec succès',
          showConfirmButton: false,
          timer: 1500
        });
        this.typecollform.reset();
        this.submit=false;
        this.getcoll();
        });}
      });
  }
  }
  get formmtc() {
    return this.typecollmodform.controls;
    }
    
    deletecoll(id:any){
    Swal.fire({
      title: 'Confirmation de suppression?',
      text: 'êtes-vous sûr de vouloir supprimer cette Collége!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Oui, Supprimer!',
      cancelButtonText:'Annuler'
    }).then(result => {
      if (result.value) {
        this.service.deletecollege(id).subscribe(response=>{  
          this.getcoll();    
          })
        Swal.fire('La suppression a été effectuée!');
      }
    });
    
    }
    /**********************************retenue****************************/
    get formr() {
      return this.retenuform.controls;
    }
    
    Ajouterr(){
     
    this.Id=this.retenuform.get('code').value;

    this.submit=true;
    if(this.retenuform.valid){
      this.service.getretbyid(this.Id).subscribe(response=>{ 
    
    if(response.length!=0){
      Swal.fire({
        icon: 'error',
        title: 'Retenue déja existe !',
        showConfirmButton: false,
        timer: 1500
      });}
    else{
        this.service.add_typeretenue(this.auth.currentUserValue.societe_id,this.retenuform.value).subscribe(response=>{   
          Swal.fire({
            icon: 'success',
            title: 'Ajouté avec succès',
            showConfirmButton: false,
            timer: 1500
          });
          this.retenuform.reset();
          this.submit=false;
          this.getret();
          });}
        });
    }
    }
    get formmr() {
    return this.retenumodform.controls;
    }
    
    deleteret(id:any){
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
        this.service. deletetype_reteneue(id).subscribe(response=>{  
          this.getret();    
          })
        Swal.fire('la suppression a été effectuée!');
      }
    });
    
    }
    getret() {
    this.service.Get_type_retenue(this.auth.currentUserValue.societe_id).subscribe((data:any) => {
 
    this.retdata = data;
    
    });
    } 
    modifierr(){
    this.submitt=true;
    if(this.retenumodform.valid){
    
      this.service.updateretenue(this.retenumodform.value).subscribe(response=>{ 
        Swal.fire({
          icon: 'success',
          title: 'Modification avec succés',
          showConfirmButton: false,
          timer: 1500
        });
        this.submitt=false;
       this.getret();
      this.modalService.dismissAll();
    });}}
    
    
    
    openModifr(content:any,table:any){
    this.modalService.open(content, { centered: true });
    this.retenumodform.get('code').setValue(table.code)
    this.retenumodform.get('designation').setValue(table.designation)
    
    }


    //qualification
    openModiftq(content:any,table:any){
      this.modalService.open(content, { centered: true });
      this.qualmodform.get('code').setValue(table.code)
      this.qualmodform.get('designation').setValue(table.designation)
      }
    get formmtq() {
      return this.qualformm.controls;
      }
      openModifq(content:any,table:any){
      this.modalService.open(content, { centered: true });
      this.qualformm.get('code').setValue(table.code)
      this.qualformm.get('designation').setValue(table.designation)
      }
      modifiertqual(){
        this.submitt=true;
        if(this.qualformm.valid){
        
          this.service.updatequalf(this.qualformm.value).subscribe(response=>{ 
            Swal.fire({
              icon: 'success',
              title: 'Modification avec succés',
              showConfirmButton: false,
              timer: 1500
            });
            this.submitt=false;
           this.getqualiification();
          this.modalService.dismissAll();
        });}}
            /*****************************motifs******************************/
            get formmo() {
              return this.motifform.controls;
            }
            
            Ajoutermo(){
            this.Id=this.motifform.get('code').value;
            console.log(this.Id)
            this.submit=true;
            if(this.motifform.valid){
              this.service.getmotifbyid(this.Id).subscribe(response=>{ 
                console.log(response);
            if(response.length!=0){
              Swal.fire({
                icon: 'error',
                title: 'Motif absence déja existe !',
                showConfirmButton: false,
                timer: 1500
              });}
            else{
                this.service.add_typemotif(this.auth.currentUserValue.societe_id,this.motifform.value).subscribe(response=>{   
                  Swal.fire({
                    icon: 'success',
                    title: 'Ajouté avec succès',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.motifform.reset();
                  this.submit=false;
                  this.getmotifs();
                  });}
                });
            }
            }
            get formmmo() {
            return this.motifmodform.controls;
            }
            
            deletemotif(id:any){
            Swal.fire({
              title: 'Confirmation de suppression?',
              text: 'êtes-vous sûr de vouloir supprimer cette Motifs!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#34c38f',
              cancelButtonColor: '#ff3d60',
              confirmButtonText: 'Oui, Supprimer!',
              cancelButtonText:'Annuler'
            }).then(result => {
              if (result.value) {
                this.service.deletemotif(id).subscribe(response=>{  
                  this.getmotifs();    
                  })
                Swal.fire('la suppression a été effectuée!');
              }
            });
            
            }
            getmotifs() {
            this.service.Get_motifs(this.auth.currentUserValue.societe_id).subscribe((data:any) => {
            this.motifdata = data;   
            console.log( this.motifdata)    
            });
            } 
            modifiermo(){
            this.submitt=true;
            if(this.motifmodform.valid){
            
              this.service.updatmotif(this.motifmodform.value).subscribe(response=>{ 
                Swal.fire({
                  icon: 'success',
                  title: 'Modification avec succés',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.submitt=false;
               this.getmotifs();
              this.modalService.dismissAll();
            });}}
            openModifmotif(content:any,table:any){
              this.modalService.open(content, { centered: true });
              this.motifmodform.get('code').setValue(table.code)
              this.motifmodform.get('designation').setValue(table.designation)
              }


        /*****************************type conges******************************/


        get formc() {
          return this.congesform.controls;
        }
        get formcmodif() {
          return this.congesformm.controls;
        }

        openModifconge(content:any,table:any){
          console.log(table)
          this.modalService.open(content, { centered: true });
          this.congesformm.get('code').setValue(table.code)
          this.congesformm.get('designation').setValue(table.designation)
          this.congesformm.get('conge_an').setValue(table.conge_an)
          this.congesformm.get('paye').setValue(table.paye)
          }

        
        
        Ajouterc(){

        this.Id=this.congesform.get('code').value;
        console.log(this.congesform.valid)
        console.log(this.congesform.value)
        this.submit=true;
        if(this.congesform.valid){
          this.service.getcongesbyid(this.Id).subscribe(response=>{ 
            console.log(response);
        if(response.length!=0){
          Swal.fire({
            icon: 'error',
            title: 'Congé existe déja!',
            showConfirmButton: false,
            timer: 1500
          });}
        else{
            this.service. add_type_conges(this.auth.currentUserValue.societe_id,this.congesform.value).subscribe(response=>{   
              Swal.fire({
                icon: 'success',
                title: 'Ajouté avec succès',
                showConfirmButton: false,
                timer: 1500
              });
              this.congesform.reset();
              this.submit=false;
              this.getconges();
              });
            }
            });
        }
        }
     
        modifier_type_conge(){
          this.submitt=true;
          if(this.congesformm.valid){
          
            this.service.update_conge(this.congesformm.value).subscribe(response=>{ 
              Swal.fire({
                icon: 'success',
                title: 'Modification avec succés',
                showConfirmButton: false,
                timer: 1500
              });
              this.submitt=false;
              this.getconges();
            this.modalService.dismissAll();
          });}
        }
        
        deletedonges(id:any){
        Swal.fire({
          title: 'Confirmation de suppression?',
          text: 'êtes-vous sûr de vouloir supprimer ce type de congés!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#34c38f',
          cancelButtonColor: '#ff3d60',
          confirmButtonText: 'Oui, Supprimer!',
          cancelButtonText:'Annuler'
        }).then(result => {
          if (result.value) {
            this.service.delete_conges(id).subscribe(response=>{  
              this.getconges();    
              })
            Swal.fire('La suppression a été effectuée!');
          }
        });
        
        }

        getconges() {
        this.service.Get_types_conges(this.auth.currentUserValue.societe_id).subscribe((data:any) => {
        console.log(data);
        this.congesdata = data;
        });
        } 
 /*****************************libelle prets******************************/

 get formlp() {
  return this.libelleform.controls;
}

Ajouterlp(){
this.Id=this.libelleform.get('code').value;
console.log(this.Id)
this.submit=true;
if(this.libelleform.valid){
  this.service.Getlibellepretbyid(this.Id).subscribe(response=>{ 
    console.log(response);
if(response.length!=0){
  Swal.fire({
    icon: 'error',
    title: 'Libellé du Prêts déja existe !',
    showConfirmButton: false,
    timer: 1500
  });}
else{
    this.service. add_libelle_prets(this.auth.currentUserValue.societe_id,this.libelleform.value).subscribe(response=>{   
      Swal.fire({
        icon: 'success',
        title: 'Ajouté avec succès',
        showConfirmButton: false,
        timer: 1500
      });
      this.libelleform.reset();
      this.submit=false;
      this.getlibelle();
      });}
    });
}
}
get formmlp() {
return this.libellemodform.controls;
}

deletelibelle(id:any){
Swal.fire({
  title: 'Confirmation de suppression?',
  text: 'êtes-vous sûr de vouloir supprimer ce prêt!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#34c38f',
  cancelButtonColor: '#ff3d60',
  confirmButtonText: 'Oui, Supprimer!',
  cancelButtonText:'Annuler'
}).then(result => {
  if (result.value) {
    this.service.delete_libelle_pret(id).subscribe(response=>{  
      this.getlibelle();    
      })
    Swal.fire('La suppression a été effectuée!');
  }
});

}

getlibelle() {
this.service.Get_libelle_prets(this.auth.currentUserValue.societe_id).subscribe((data:any) => {
this.pretdata = data;
});
} 

modifierlp(){
this.submitt=true;
if(this.libellemodform.valid){

  this.service.update_libelle_prets(this.libellemodform.value).subscribe(response=>{ 
    Swal.fire({
      icon: 'success',
      title: 'Modification avec succés',
      showConfirmButton: false,
      timer: 1500
    });
    this.submitt=false;
   this.getlibelle();
  this.modalService.dismissAll();
});}}



openModiflp(content:any,table:any){
this.modalService.open(content, { centered: true });
this.libellemodform.get('code').setValue(table.code)
this.libellemodform.get('designation').setValue(table.designation)
}


            
            


/*
Ajoutera(){
this.Id=this.avanform.get('code').value;
console.log(this.Id)
this.submit=true;
if(this.avanform.valid){
  this.service.getavanbyid(this.Id).subscribe(response=>{ 
    console.log(response);
if(response.length!=0){
  Swal.fire({
    icon: 'error',
    title: 'Avantages En Nature déja existe !',
    showConfirmButton: false,
    timer: 1500
  });}
else{
    this.service.addavan(this.avanform.value).subscribe(response=>{   
      Swal.fire({
        icon: 'success',
        title: 'Ajouté avec succès',
        showConfirmButton: false,
        timer: 1500
      });
      this.avanform.reset();
      this.submit=false;
      this.getavan();
      });}
    });
}
}
get formma() {
return this.avanmodform.controls;
}

deleteavan(id:any){
Swal.fire({
  title: 'Confirmation de suppression?',
  text: 'êtes-vous sûr de vouloir supprimer cette Avantages En Nature!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#34c38f',
  cancelButtonColor: '#ff3d60',
  confirmButtonText: 'Oui, Supprimer!'
}).then(result => {
  if (result.value) {
    this.service.deleteavan(id).subscribe(response=>{  
      this.getsec();    
      })
    Swal.fire('la suppression a été effectuée!');
  }
});

}
getavan() {
this.service
.Getavan()
.subscribe((data:any) => {
console.log(data);
this.avandata = data;

});
} 
modifiera(){
this.submitt=true;
if(this.avanmodform.valid){

  this.service.updateavan(this.avanmodform.value).subscribe(response=>{ 
    Swal.fire({
      icon: 'success',
      title: 'Modification avec succés',
      showConfirmButton: false,
      timer: 1500
    });
    this.submitt=false;
   this.getavan();
  this.modalService.dismissAll();
});}}



openModifa(content:any,table:any){
this.modalService.open(content, { centered: true });
this.avanmodform.get('code').setValue(table.id)
this.avanmodform.get('designation').setValue(table.designation)
this.avanmodform.get('proportionnelle').setValue(table.proportionnelle)

}



get formc() {
  return this.congesform.controls;
}

Ajouterc(){
this.Id=this.sectform.get('code').value;
console.log(this.Id)
this.submit=true;
if(this.congesform.valid){
  this.service.getcongesbyid(this.Id).subscribe(response=>{ 
    console.log(response);
if(response.length!=0){
  Swal.fire({
    icon: 'error',
    title: 'Service déja existe !',
    showConfirmButton: false,
    timer: 1500
  });}
else{
    this.service.addconges(this.congesform.value).subscribe(response=>{   
      Swal.fire({
        icon: 'success',
        title: 'Ajouté avec succès',
        showConfirmButton: false,
        timer: 1500
      });
      this.congesform.reset();
      this.submit=false;
      this.getconges();
      });}
    });
}
}
get formmc() {
return this.sectform.controls;
}

deletedonges(id:any){
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
    this.service.deleteconges(id).subscribe(response=>{  
      this.getconges();    
      })
    Swal.fire('la suppression a été effectuée!');
  }
});

}
getconges() {
this.service
.Getconges()
.subscribe((data:any) => {
console.log(data);
this.congesdata = data;

});
} 
modifierc(){
this.submitt=true;
if(this.sectmodform.valid){

  this.service.updateSec(this.sectmodform.value).subscribe(response=>{ 
    Swal.fire({
      icon: 'success',
      title: 'Modification avec succés',
      showConfirmButton: false,
      timer: 1500
    });
    this.submitt=false;
   this.getsec();
  this.modalService.dismissAll();
});}}




openModifc(content:any,table:any){
  this.modalService.open(content, { centered: true });
  this.sectmodform.get('code').setValue(table.code)
  this.sectmodform.get('designation').setValue(table.designation)
  this.sectmodform.get('conge_an').setValue(table.conge_an)
  this.sectmodform.get('paye').setValue(table.paye)

  
  }



openModifmo(content:any,table:any){
this.modalService.open(content, { centered: true });
this.sectmodform.get('id').setValue(table.id)
this.sectmodform.get('service').setValue(table.service)
this.sectmodform.get('designation').setValue(table.designation)
}



get formtq() {
  return this.typequalform.controls;
}

Ajoutertq(){
this.Id=this.typequalform.get('code').value;
console.log(this.Id)
this.submit=true;
if(this.typequalform.valid){
  this.service.gettqualbyid(this.Id).subscribe(response=>{ 
    console.log(response);
if(response.length!=0){
  Swal.fire({
    icon: 'error',
    title: 'Qualification déja existe !',
    showConfirmButton: false,
    timer: 1500
  });}
else{
    this.service.addtqual(this.typequalform.value).subscribe(response=>{   
      Swal.fire({
        icon: 'success',
        title: 'Ajouté avec succès',
        showConfirmButton: false,
        timer: 1500
      });
      this.typequalform.reset();
      this.submit=false;
      this.gettqual();
      });}
    });
}
}


deletequal(id:any){
Swal.fire({
  title: 'Confirmation de suppression?',
  text: 'êtes-vous sûr de vouloir supprimer cette Qualification!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#34c38f',
  cancelButtonColor: '#ff3d60',
  confirmButtonText: 'Oui, Supprimer!'
}).then(result => {
  if (result.value) {
    this.service.deletetqual(id).subscribe(response=>{  
      this.gettqual();    
      })
    Swal.fire('la suppression a été effectuée!');
  }
});

}


modifiertc(){
this.submitt=true;
if(this.typecollmodform.valid){

  this.service.updatecollege(this.typecollmodform.value).subscribe(response=>{ 
    Swal.fire({
      icon: 'success',
      title: 'Modification avec succés',
      showConfirmButton: false,
      timer: 1500
    });
    this.submitt=false;
   this.getcoll();
  this.modalService.dismissAll();
});}}



openModiftc(content:any,table:any){
this.modalService.open(content, { centered: true });
this.typecollmodform.get('code').setValue(table.code)
this.typecollmodform.get('designation').setValue(table.designation)
}

get formst() {
  return this.statutform.controls;
}

Ajouterst(){
this.Id=this.statutform.get('code').value;
console.log(this.Id)
this.submit=true;
if(this.statutform.valid){
  this.service.getstatutbyid(this.Id).subscribe(response=>{ 
    console.log(response);
if(response.length!=0){
  Swal.fire({
    icon: 'error',
    title: 'Statut déja existe !',
    showConfirmButton: false,
    timer: 1500
  });}
else{
    this.service.addstatut(this.statutform.value).subscribe(response=>{   
      Swal.fire({
        icon: 'success',
        title: 'Ajouté avec succès',
        showConfirmButton: false,
        timer: 1500
      });
      this.statutform.reset();
      this.submit=false;
      this.getcoll();
      });}
    });
}
}
get formmst() {
return this.statutmodform.controls;
}

deletestatut(id:any){
Swal.fire({
  title: 'Confirmation de suppression?',
  text: 'êtes-vous sûr de vouloir supprimer cette Staut!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#34c38f',
  cancelButtonColor: '#ff3d60',
  confirmButtonText: 'Oui, Supprimer!'
}).then(result => {
  if (result.value) {
    this.service.deletestatut(id).subscribe(response=>{  
      this.getstatut();    
      })
    Swal.fire('la suppression a été effectuée!');
  }
});

}
getstatut() {
this.service
.Getstatut()
.subscribe((data:any) => {
console.log(data);
this.statutdata = data;

});
} 
modifierst(){
this.submitt=true;
if(this.statutmodform.valid){

  this.service.updatestatut(this.statutmodform.value).subscribe(response=>{ 
    Swal.fire({
      icon: 'success',
      title: 'Modification avec succés',
      showConfirmButton: false,
      timer: 1500
    });
    this.submitt=false;
   this.getstatut();
  this.modalService.dismissAll();
});}}



openModifst(content:any,table:any){
this.modalService.open(content, { centered: true });
this.statutmodform.get('code').setValue(table.code)
this.statutmodform.get('designation').setValue(table.designation)
}
*/
}










