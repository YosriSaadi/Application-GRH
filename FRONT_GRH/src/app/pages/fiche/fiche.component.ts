import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import{societeservice} from './shared/societe.service';
import Swal from 'sweetalert2';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { templateSourceUrl } from '@angular/compiler';
@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.scss']
})
export class FicheComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  validationform: FormGroup;
  validationformpaie:FormGroup;
  submit: boolean;
  public idsociete:number=null;
  public tauxpatronale:boolean=false;
  public tauxemploye:boolean=false;
  public accidenttravail:boolean=false;
  public medecintaravail:boolean=false;
  irpp:boolean=false;
  tfp:boolean=false;
  foprolos:boolean=false;
  champsprime_rend:boolean=false;
  constructor(public formBuilder: FormBuilder,private service:societeservice,private auth:AuthfakeauthenticationService ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'GRH' }, { label: 'Fiche Signalétique ', active: true }];
    
    
   
    this.validationform = this.formBuilder.group({
      nom: [[Validators.required,Validators.pattern('[a-zA-Z ]+')]],
      adresse: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      ville: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      code_postal:['',[Validators.required,Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      rue:['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      tel:['',[Validators.required,Validators.pattern('[0-9]+')]],
      fax:['',[Validators.required,Validators.pattern('[0-9]+')]],
      Activite:['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      date_ouverture: ['', [Validators.required]],
      matricule_cnss:['',[Validators.required,Validators.pattern('[0-9]+')]],
      matricule_fiscal:['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    });


    this.validationformpaie=this.formBuilder.group({
      
      checkcotpatronale: new FormControl('true'),
      cnss_cot_patronal:['',[Validators.required,Validators.pattern('[0-9]+')]],
      checkcotemploye: new FormControl('true'),
      cnss_cot_employe:[''],
      checkaccident: new FormControl('true'),
      cnss_acc_travail:[''],
      checkmedecin: new FormControl('true'),
      cnss_medecin_travail:[''],
      checkirpp: new FormControl('true'),
      irpp:[''],
      checktfp: new FormControl('true'),
      tfp:[''],
      checkfoprolos: new FormControl('true'),
      foprolos:[''],
      cnss_regimec_employe:[''],
      cnss_regimec_patron:[''],
      assurance_type:[''],
      assurance_numcontrat:[''],
      assurance_tauxemploye:[''],
      assurance_tauxemployeur:[''],
      assurance_imposition:[''],
      assurance_compagnie:[''],
      assurance_datedebut:[''],
      assurance_datefin:[''],
      gestion_presence:[''],
      paie_calendrier:[''],
      liquidation_impot:[false],
      arrond_irpp:[''],
      mois_prime_rend:[''],
      prime_rend:[''],
      periode_prime_rend:[''],
      taux_hs:[''],
      taux_hs1:[''],
      taux_hs2:[''],
      reg_commerce:[''],
      
    });

    this.service.Getsociete().subscribe(response=>{      
      this.idsociete=response.id;
      this.validationform = this.formBuilder.group({
        nom: response.nom,
        ville: response.ville,
        code_postal: response.code_postal,
        email: response.email,
        role:  response.role,
        tel:response.tel,
        fax: response.fax,
        date_ouverture:response.date_ouverture,
        rue:response.rue,
        adresse: response.adresse,
        Activite:response.Activite,
        matricule_cnss:response.matricule_cnss,
        matricule_fiscal:response.matricule_fiscal,
        
      });
      




      })

      this.service.Getleselementdepaie().subscribe(response=>{ 
        console.log(response)
        if(response.cnss_cot_patronal==0){
         this.tauxpatronale=true;
         this.validationformpaie.get('checkcotpatronale').setValue('false');
        }
        if(response.cnss_cot_employe==0){
          this.tauxemploye=true
          this.validationformpaie.get('checkcotemploye').setValue('false');
         }
         if(response.cnss_acc_travail==0){
          this.accidenttravail=true
          this.validationformpaie.get('checkaccident').setValue('false');
         }
         if(response.cnss_medecin_travail==0){
           this.medecintaravail=true
           this.validationformpaie.get('checkmedecin').setValue('false');
          }
          
          if(response.irpp==0){
            this.irpp=true
            this.validationformpaie.get('checkirpp').setValue('false');
           }
           if(response.tfp==0){
            this.tfp=true
            this.validationformpaie.get('checktfp').setValue('false');
           }
           if(response.foprolos==0){
            this.foprolos=true
            this.validationformpaie.get('checkfoprolos').setValue('false');
           }
           if(response.prime_rend=="false"){
            this.champsprime_rend=true;
            this.validationformpaie.get('prime_rend').setValue('false');
           }




          this.validationformpaie.get('cnss_cot_patronal').setValue(response.cnss_cot_patronal);
          this.validationformpaie.get('cnss_cot_employe').setValue(response.cnss_cot_employe);
          this.validationformpaie.get('cnss_acc_travail').setValue(response.cnss_acc_travail);
          this.validationformpaie.get('cnss_medecin_travail').setValue(response.cnss_medecin_travail);
          this.validationformpaie.get('cnss_regimec_employe').setValue(response.cnss_regimec_employe);
          this.validationformpaie.get('cnss_regimec_patron').setValue(response.cnss_regimec_patron);
          this.validationformpaie.get('irpp').setValue(response.irpp);
          this.validationformpaie.get('tfp').setValue(response.tfp);
          this.validationformpaie.get('foprolos').setValue(response.foprolos);
         this.validationformpaie.get('assurance_type').setValue(response.assurance_type);
          this.validationformpaie.get('assurance_numcontrat').setValue(response.assurance_numcontrat);
          this.validationformpaie.get('assurance_tauxemploye').setValue(response.assurance_tauxemploye);
          this.validationformpaie.get('assurance_tauxemployeur').setValue(response.assurance_tauxemployeur);
          this.validationformpaie.get('assurance_imposition').setValue(response.assurance_imposition);
          this.validationformpaie.get('assurance_compagnie').setValue(response.assurance_compagnie);
          this.validationformpaie.get('assurance_datedebut').setValue(response.assurance_datedebut);
          this.validationformpaie.get('assurance_datefin').setValue(response.assurance_datefin);
          this.validationformpaie.get('gestion_presence').setValue(response.gestion_presence);
          this.validationformpaie.get('paie_calendrier').setValue(response.paie_calendrier);
          this.validationformpaie.get('arrond_irpp').setValue(response.arrond_irpp);
          this.validationformpaie.get('mois_prime_rend').setValue(response.mois_prime_rend);
          this.validationformpaie.get('prime_rend').setValue(response.prime_rend);
          this.validationformpaie.get('periode_prime_rend').setValue(response.periode_prime_rend);
          this.validationformpaie.get('reg_commerce').setValue(response.reg_commerce);
          this.validationformpaie.get('taux_hs').setValue(response.taux_hs);
          this.validationformpaie.get('taux_hs1').setValue(response.taux_hs1);
          this.validationformpaie.get('taux_hs2').setValue(response.taux_hs2);

          
           if(response.liquidation_impot=="true")
           {
            this.validationformpaie.get('liquidation_impot').setValue(response.liquidation_impot);
          }
         
         

      })














  
  }
  get form() {
    return this.validationform.controls;
  }
  validSubmit(){
    this.submit=true;
    console.log(this.validationform.valid)
if (this.validationform.valid){
  this.service.updatesociete(this.validationform.value,this.idsociete).subscribe(response=>{      
    Swal.fire({
      icon: 'success',
      title: 'Modification Réussite',
      showConfirmButton: false,
      timer: 1500
    });
    this.submit=false;
   
    })
    
   
}
    this.submit=true;
  }

  eventpatronaletrue(){
    this.tauxpatronale=false;
  }
  eventpatronalefalse(){
    this.tauxpatronale=true;
    this.validationformpaie.get('cnss_cot_patronal').setValue(0);
  }


  eventemployetauxtrue(){
    this.tauxemploye=false;
  }
  eventemployetauxfalse(){
    this.tauxemploye=true;
    this.validationformpaie.get('cnss_cot_employe').setValue(0);
  }
  eventaccidenttrue(){
     this.accidenttravail=false;
  }
  eventaccidentfalse(){
    this.accidenttravail=true;
    this.validationformpaie.get('cnss_acc_travail').setValue(0);
  }

  eventmedecintrue(){
    this.medecintaravail=false;
 }
 eventmedecinfalse(){
  this.medecintaravail=true;
  this.validationformpaie.get('cnss_medecin_travail').setValue(0);
 }
 eventirpptrue(){

  this.irpp=false;
 }
 eventirppfalse(){
  this.irpp=true;
  this.validationformpaie.get('irpp').setValue(0);

 }
 eventtfptrue(){

  this.tfp=false;
  
 }
 eventtfpfalse(){
  this.tfp=true;
  this.validationformpaie.get('tfp').setValue(0);
 }
 eventfoprolostrue(){

  this.foprolos=false;
 }
 eventfoprolosfalse(){
  this.foprolos=true;
  this.validationformpaie.get('foprolos').setValue(0);

 }
 eventprimefalse(){
  this.champsprime_rend=true;
  this.validationformpaie.get('mois_prime_rend').setValue(0);
  this.validationformpaie.get('periode_prime_rend').setValue('');

 }
 eventprimetrue(){
  this.champsprime_rend=false;
  

 }
 

 
 validSubmitpaie(){
   console.log(this.validationformpaie.value)
   if(this.validationformpaie.valid){
  this.service.editelementdepaie(this.validationformpaie.value,this.idsociete).subscribe(response=>{    
  
    Swal.fire({
      icon: 'success',
      title: 'Modification Réussite',
      showConfirmButton: false,
      timer: 1500
    });
   
    })
   }
 }

}
