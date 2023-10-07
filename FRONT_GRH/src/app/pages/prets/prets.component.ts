import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder,FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import * as moment from 'moment';
import{pret} from './shared/pret.model';
import {pretservice} from'./shared/pret.service';
import { Order } from './shared/pret.model';
import { NumberToLetter } from 'convertir-nombre-lettre';
import {ToastrService} from 'ngx-toastr'
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { pretSortableDirective, SortEvent } from './shared/pret-sortable.directive';
import{societe} from '../societe/list-societe/societe.model';

@Component({
  selector: 'app-prets',
  templateUrl: './prets.component.html',
  styleUrls: ['./prets.component.scss'],
  providers: [pretservice, DecimalPipe]
})
export class PretsComponent implements OnInit {
  @ViewChildren(pretSortableDirective) headers: QueryList<pretSortableDirective>;
  breadCrumbItems: Array<{}>;
  submitted: boolean;
  impression_date:string=null;
  impression_lettre_montant:string;
  etat_pret:string='Tous'
  type_pret:string='Tous'
  libelles:[];
  info_societe:societe=null;
  date:any;
  liste_employes:[];
  nombre_pret:number=0;
  constructor(public service: pretservice,public formBuilder: FormBuilder,public toast: ToastrService,private auth:AuthfakeauthenticationService) { 
    this.service.Getprets(this.etat_pret,this.type_pret,this.auth.currentUserValue.exercice_id).subscribe(response=>{      
      this.service.p=response
      this.nombre_pret=response.length
     })
     this.date=moment().format("DD/MM/YYYY");
     this.service.Get_societe(this.auth.currentUserValue.societe_id).subscribe(response=>{      
      this.info_societe=response

     })
     this.service.Get_libelle_pret(this.auth.currentUserValue.societe_id).subscribe(response=>{      
      this.libelles=response
     })

    this.tables$ = service.tables$;
    this.total$ = service.total$;
    
    
  }
  validationform: FormGroup;
  validationeditform: FormGroup;
  active:number=2;
  test:number=3;
  typepret:boolean=true;
  tableecheance:boolean=true;
  pret:Array<pret> = [];
  tables$: Observable<Order[]>;
  total$: Observable<number>;
  modifhide:boolean=true
  typepret_modif:boolean;
  
  ngOnInit(): void {
      //Liste employes
      this.service.employes(this.auth.currentUserValue.societe_id).subscribe(response=>{  
        this.liste_employes=response;
      })
   
   

    this.breadCrumbItems = [{ label: 'Les élements de paie' }, { label: 'prêt', active: true }];
    this.validationform = this.formBuilder.group({
      matricule_employe: [''],
      nom: ['',Validators.required],
      date: ['',Validators.required],
      montant_pret: ['',[Validators.required,Validators.pattern('[0-9.]+')]],
      montant_echeance: ['',Validators.pattern('[0-9.]+')],
      date_1echeance: [''],
      libelle:['',Validators.required],
      type: new FormControl('pretste'),
    });

    this.validationeditform = this.formBuilder.group({
      matricule_employe: [],
      nom: [],
      date: ['',Validators.required],
      montant_pret: ['',[Validators.required,Validators.pattern('[0-9.]+')]],
      montant_echeance: [''],
      libelle:[''],
      num_pret:[''],
      type: new FormControl('pretste'),
    });


  }

  get form() {
    return this.validationform.controls;
  }
  get formm() {
    return this.validationeditform.controls;
  }

  genererpret(){
    if(this.validationform.valid){
    this.pret=[];
    if((this.validationform.get('type').value)==="pretste")

    this.tableecheance=false
    let m=moment(this.validationform.get('date_1echeance').value).endOf('month')
    var numbers=this.validationform.get('montant_pret').value/this.validationform.get('montant_echeance').value
    var reste=this.validationform.get('montant_echeance').value
    var diff:number=0
    for(var i = 0; i <Math.ceil(numbers); i++){   
    if((+diff+ +reste)>(+this.validationform.get('montant_pret').value)){
      reste= +this.validationform.get('montant_pret').value- +diff
    }
    
    else{
      diff=+diff+ +reste

    }
   
    this.pret.push({observation:'',pret_id:0,id:0,date:this.validationform.get('date').value,matricule_employe:this.validationform.get('matricule_employe').value,montant_pret:this.validationform.get('montant_pret').value,montant_echeance:reste,date_echeance:m.format('YYYY-MM-DD'),mois:m.lang("fr").format('MMMM'),anne:m.format('yyyy'),solde:'Non soldé'});
    m.add(1, 'M')
    this.impression_date=m.format('DD/MM/YYYY')
  }
   }
   this.submitted=true;
  }

  resetgenration(){
  this.tableecheance=true
  this.pret=[];
  this.validationform.get('nom').setValue('')
  this.validationform.get('matricule_employe').setValue('')
  this.validationform.get('montant_pret').setValue('')
  this.validationform.get('montant_echeance').setValue('')
  this.validationform.get('date_1echeance').setValue('')
  this.validationform.get('libelle').setValue('')
  this.validationform.get('date').setValue('')
  this.submitted=false;
  
  }
  modifier_pret(){






    this.active=2;
  }
 

  chnageprettrue(){
  this.typepret=true
  this.validationform.get('montant_echeance').enable()
  this.validationform.get('date_1echeance').enable()
  }
  changepretfalse(){
  this.typepret=false
  this.validationform.get('montant_echeance').disable()
  this.validationform.get('date_1echeance').disable()
  this.validationform.get('date_1echeance').setValue('')
  this.validationform.get('montant_echeance').setValue('')
  }


  confirmerpret(){
    this.submitted=true;
    if(this.validationform.valid){
  this.service.addpret(this.validationform.value,this.auth.currentUserValue.exercice_id).subscribe(response=>{   
    this.service.Getprets(this.etat_pret,this.type_pret,this.auth.currentUserValue.exercice_id).subscribe(response=>{      
      this.service.p=response
      this.tables$ = this.service.tables$;
     })     
   })
   if((this.validationform.get('type').value)==="pretste"){
    for( let i=0; i<this.pret.length; i++){
      this.service.addecheance(this.pret[i]).subscribe(response=>{    
      })
    }
  }
 
  Swal.fire({
    icon: 'success',
    title: 'Opération terminé avec succés',
    showConfirmButton: false,
    timer: 1500
  })
  this.tableecheance=true
  this.pret=[];
  this.active=2;
  this.submitted=false;
  this.resetgenration();
    }
 
  }
   /**
   * Sort table data
   * @param param0 sort the column
   *
   */
    onSort({ column, direction }: SortEvent) {
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
      this.service.sortColumn = column;
      this.service.sortDirection = direction;
    }
    
   

    decalage(i,event){
      //let b=moment(event.target.value).isAfter(this.pret[i].date)
      //if(b){
      let k=moment(event.target.value).lang("fr").endOf('month')
      this.pret[i].date_echeance=k.format('YYYY-MM-DD')
      this.pret[i].anne=k.format('YYYY')
      this.pret[i].mois=k.format('MMMM')

      for(var j=i+1;j<this.pret.length;j++){
        this.pret[j].date_echeance=k.add(1,'M').format('YYYY-MM-DD')
        this.pret[j].mois=k.format('MMMM')
        this.pret[j].anne=k.format('yyyy')     
      }
      
    }
      
    //}


    deletepret(id,tab){
      
      let k=moment(tab.date).format("MM")
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
        text: 'êtes-vous sûr de vouloir supprimer prêt!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#ff3d60',
        confirmButtonText: 'Oui, Supprimer!',
        cancelButtonText:'Annuler'
      }).then(result => {
        if (result.value) {
         this.service.deletepret(id).subscribe(response=>{  
          this.service.Getprets(this.etat_pret,this.type_pret,this.auth.currentUserValue.exercice_id).subscribe(response=>{      
            this.service.p=response;
            this.tables$ = this.service.tables$;
           })    
          })
          Swal.fire('la suppression est effectuée!', 'Prêt Supprimé.', 'success');
        }
      });
    }
      });

    }

    print(component2){
      //this.impression_lettre_montant=NumberToLetter(this.validationform.get('montant_pret').value)
      /*let printContents = document.getElementById(component2).innerHTML;
      let originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
 */
      var divToPrint = document.getElementById(component2);
      var newWin = window.open('', component2);
      newWin.document.open();
      newWin.document.write('<html><link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" media="print"/><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
      newWin.document.close();
      setTimeout(function() {
        newWin.close();
      }, 10);

     
     
      
    }
    Etatpret(event){
      this.etat_pret=event.target.value
      this.service.Getprets(this.etat_pret,this.type_pret,this.auth.currentUserValue.exercice_id).subscribe(response=>{      
        this.service.p=response;
        this.tables$ = this.service.tables$;
       }) 
    }
    Typepret(event){
      this.type_pret=event.target.value
      this.service.Getprets(this.etat_pret,this.type_pret,this.auth.currentUserValue.exercice_id).subscribe(response=>{      
        this.service.p=response;
        this.tables$ = this.service.tables$;
       }) 
    }
    Observation(num,event){
      this.pret[num].observation=event.target.value
    }

    //Modification
    resetmodification(){
      this.modifhide=true
      this.active=2
      this.pret=[];
    }
  
    Changeretatsolde(number:any){
  
      if(number.solde=="Soldé")
      number.solde="Non soldé"
      else{
        number.solde="Soldé"
      }
      this.service.update_pret_echeance_etatsolde(number).subscribe(response=>{      
          this.service.Getprets(this.etat_pret,this.type_pret,this.auth.currentUserValue.exercice_id).subscribe(response=>{      
            this.service.p=response;
            this.tables$ = this.service.tables$;
           })    
       })
  
    }

    editpret(pret)
    {
    if(pret.type=='pretste'){
      this.typepret_modif=false
    }
    else{
      this.typepret_modif=true
    }
     this.modifhide=false
      this.active=3
      this.service.Get_echeance_id(pret.id).subscribe(response=>{   
        this.pret=[]   
        this.pret=response
       })
      this.validationeditform.get('matricule_employe').setValue(pret.matricule_employe)
      this.validationeditform.get('matricule_employe').disable()
      this.validationeditform.get('nom').setValue(pret.nom)
      this.validationeditform.get('nom').disable()
      this.validationeditform.get('num_pret').setValue(pret.id)
      this.validationeditform.get('num_pret').disable()
      this.validationeditform.get('montant_pret').setValue(pret.montant_pret)
      this.validationeditform.get('libelle').setValue(pret.libelle)
      this.validationeditform.get('type').setValue(pret.type)
      this.validationeditform.get('date').setValue(pret.date)
    }
    Modifier_pret(){
      console.log(this.validationeditform.value)

    }

    Modifier_echeance(){
      for( let i=0; i<this.pret.length; i++){
        this.service.update_echeance(this.pret[i]).subscribe(response=>{    
        })
      }    
      Swal.fire({
        icon: 'success',
        title: 'Modification réussite',
        showConfirmButton: false,
        timer: 1500
      })
      this.active=2;

    }
  changer_pret_type_modif_true(){
      this.typepret_modif=true
  }
  changer_pret_type_modif_false(){
    this.typepret_modif=false
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
      }
     })
   }

}
