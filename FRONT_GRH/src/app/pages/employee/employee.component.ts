import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeeData } from './data';
import { EmployeeSortableDirective, SortEvent } from './employee-sortable.directive';
import { EmployeeService } from './employee.service';
import { Employee } from './employeee.model';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import Swal from 'sweetalert2';
import { ParametrageService } from '../Parametrage/parametrage.service';
import { ShiftService } from '../législation/shifts/shift.service';
import { Irppservice } from '../législation/irpp/irpp.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee', 
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [EmployeeService, DecimalPipe]

})
export class EmployeeComponent implements OnInit {

  @ViewChildren(EmployeeSortableDirective) headers: QueryList<EmployeeSortableDirective>;

  // breadcrumb items
  breadCrumbItems: Array<{}>;

  // Table data
  employeesData: Employee[];
submit:boolean;
  tables$: Observable<Employee[]>;
  total$: Observable<number>;
  selectValue: string[];
  sexe: string[];
  etatt: string[];
  Ajoutform: FormGroup;
  dep: string[];
  ser: string[];
  sec: string[];
  college:string[];
  baremeirpp: any[];
  enfantdata: any;
  enfantform: any;
  submitt: boolean;
  Situationform: FormGroup;
  banque: string[];
  statut: string[];
  shift: any[];
  qual: any[];
  Qualform: any;
  submitted: boolean;
  qualidata: any;
  droitform: any;
  sub: boolean;
  droitdata: any;
  sitform: FormGroup;
  s: boolean;
  impoform: FormGroup;
  impo: boolean;
  diversform: FormGroup;
  divers: boolean;
  etatform: any;
  salaireform: any;
  empdata: any;
  mode: string[];
  banq: string[];
  irpp: any;
  exonere:boolean;
  matricule: any;
  Id: any;
  table: any;
  tables: any;
  tablei: any;
  tabled: any;
  tabs: any;
  tabi: any;
  tabd: any;
  constructor(private modalService: NgbModal,public service: EmployeeService,public formBuilder: FormBuilder,public services:ParametrageService,public servicess : ShiftService,public servicesss:Irppservice,private auth:AuthfakeauthenticationService) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;}
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Personnels' }, { label: 'Employees', active: true }];
    this.sexe=['Homme','Femme'];
    this.selectValue = ['','Afghan','Albanais','Algérien','Allemand','Américain','Andorran','Angolais','Antiguan','Argentin','Australien','Autrichien','Azerbaïdjanais','Bahamien','Bahreïn','Bengali','Barbadien','Biélorusse','Belge','Belize','Béninois','Bhoutanais','Bolivien','Bosnie-Herzégovine','Botswanan','Brésilien','Britannique','Bruneian','Bulgare','Burkinabé','Birman','Burundi','Cabo Verdean','Cambodgien','Camerounais','Canadienne','ChilienChinois','Colombien','Comorien','Congolais','Costaricain','Ivoirien','croate','Cubain','Chypriote','Tchèque','Danois','Djiboutien','Dominicain','Emirati','Équatorien','Espagnol','Égyptien','Salvadorien','Équato-guinéenne, équato','Érythrée','Estonien','Éthiopien','Fidjien','Finlandais','Français','gabonais','Gambien','géorgien','Ghanéen','Gibraltar','Grec', 'Grenadian','Guatémaltèque','Guinéenne','Bissau-Guinéen','guyanais','Haïtien','Honduras','Hongrois','Islandais','Indien','Indonesian','Iranien','Jrakien','irlandais','Italien','Ivoirien','Jamaïquain','Japonais','jordanien','Kazakhstani','Kényen','I-Kiribati','Nord coréen','koweïtien','Kirghizistan','laotien','Letton','libanais','Basotho','Libérienne','Libye','Liechtenstein','lituanien','luxembourgeois','Macédonien','Malgache','Malawite','Malaisie','Maldives','Malien','Maltais','Marshall','Martiniquais','Mauritanien','Mauricien','Mexicain','Micronésiens','Moldave','Monacan','Mongol','Monténégrin','Marocain','Mozambique','Namibie','nauruan','Népalais','Néerlandais','Nevisien','nicaraguayen','Nigerien','Marianan du Nord','Norvégien','Oman','Pakistanais','Palauan','Palestinien','Panaméen','Papouasie-Nouvelle-Guinée','Paraguayen','péruvien','Philippin','Polonais','Portugais','portoricain','Qatari','Roumain','Russe','Rwandais','Saint Lucian','Samoan','Saint-Marin','São Toméan','Saoudite','Sénégalais','Serbe','Seychellois','Sierra Leone','Singapourien','Slovaque','Slovène','Îles Salomon','Somali','Sud africain','Soudan du Sud','Sri lankais','Soudanais','Surinamais','Swazi','Suédois','Suisse','Syrien','Tadjikistan','Tanzanien','Tchadien','Thai','Timorais','Togolais','Tokélaouan','Tongan','Trinite-et-Tobago','Tunisien','Turc','Turkmène','Tuvaluan','Ougandais','Ukrainien','Uruguayen','Ouzbékistan','Vanuatuan','Vatican','vénézuélien','Vietnamien','Vincentien','Yéménite','Zambien','Zelanian','Zimbabwéen'];
    this.etatt=['Célibataire','Marié(e)','Separé(e)','Divorcé(e)','Veuf/Veuve'];
    this.statut=['Finance','Informatique','RH']

    this.banq=['atb','stb','bh']
    this.mode=['Espéce','Chéque','Virement','Multi-Paiement']
    this.baremeirpp=[1,2,3];
    
   this.exonere=false;
   console.log(this.exonere)
    this.enfantform = this.formBuilder.group({
      Id: ['9', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]],
      date: ['', [Validators.required]],
      encharge:[false],
      infirme:[false],
      etudiant:[false],
      bourse:[false],
      matricule: ['1', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],  
    });
    /**
     * Bootstrap validation form data
     */
    this.etatform = this.formBuilder.group({
      matricule: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      prenom: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      datenaiss: ['2000-01-27', [Validators.required]],
      lieu: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      nationnalite: ['Sélectionner', [Validators.required]],
      NCin:['',[Validators.required,Validators.pattern('[0-9]+')]],
      LieuC: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      dateC: ['2000-01-27', [Validators.required]],
      adresse: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]],
      Ntel:['',[Validators.required,Validators.pattern('[0-9]+')]],
      dateEmb: ['2000-01-27', [Validators.required]],
      sexe: ['', [Validators.required]],
      college : ['', [Validators.required]],
      dateEmbGrp : ['2000-01-27', [Validators.required]],
      creditB : [false, [Validators.required]],
      creditS : [false, [Validators.required]],
      etat: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      cheffamille: ['', [Validators.required]],
      departement: ['', [Validators.required]],
      service: ['', [Validators.required]],
      section: ['', [Validators.required]],
      dateaff: ['', [Validators.required]]
    });

   
    this.Qualform = this.formBuilder.group({
      qualification: ['', Validators.required],
      description: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      actuelle: [''],
      matricule: ['1', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]
    });

    this.droitform = this.formBuilder.group({
      conge: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      droitM: ['', [Validators.required, Validators.pattern('[0-9.,]+')]],
      droitA: ['', [Validators.required, Validators.pattern('[0-9.,]+')]],
      soldeinitial: ['', [Validators.pattern('[0-9.,]+')]],
      matricule: ['1', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]
    });   

     this.impoform = this.formBuilder.group({

    matCNSS: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    dateaff: ['',Validators.required],
    cotisationE: ['Normal'],
    cotisationP: ['Normal'],
    accidenttra: ['Oui'],
    medecinetra: ['Oui'],
    regimeIirpp: ['Normal'],
    baremeirpp: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    nbreMens: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    assurancevie: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    interetann: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    tfp: [false, Validators.required],
    foprolos: [false, Validators.required],
    matricule: ['1', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    });
   
    this.diversform = this.formBuilder.group({

      droitPR: [false, [Validators.required]],
      assurancegrp: [false, [Validators.required]],
      Nadhesion: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      autorisehs: [false, [Validators.required]],
      autoriseMjhs: [false, [Validators.required]],
      basesoldeconge: ['', [Validators.required]],
      nbrhj: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      matricule: ['1', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      });
      this.salaireform = this.formBuilder.group({

        mode: ['', Validators.required],
        compte: ['CCB'],
        Ncompte: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9-.,]+')]],
        Nrib: ['', [Validators.required, Validators.pattern('[0-9-.,]+')]],
        Banque: ['', Validators.required],
        agence:  ['', [Validators.required, Validators.pattern('[a-zA-Z0-9-.,]+')]],
        taux: ['Mensual', Validators.required],
        dureeEch: ['', [Validators.required, Validators.pattern('[0-9., ]+')]],
        anciennete_eff: ['', [Validators.required, Validators.pattern('[0-9., ]+')]],
        sal_base: ['', [Validators.required, Validators.pattern('[0-9., ]+')]],
        supp: ['', [Validators.required, Validators.pattern('[0-9., ]+')]],
        thorairehs: ['', [Validators.required, Validators.pattern('[0-9., ]+')]],
        shift: ['', Validators.required],
        matricule: ['1',Validators.required],
        });
       
    /**
     * fetch data
     */
    this.getirpp();
    this.getshift();
  this.getdepa();
    this.getserv();
    this.getsect();
    this.get_type_qulif();
    this.getcoll();
     this.getdroit();
  this.getemp();
  this.getenfant();
  this.getqual();
  //  this._fetchData();
  }
  /**
   * fetches the table value
   */
   _fetchData() {
    this.employeesData = EmployeeData;
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
    return this.etatform.controls;
  }
  getemp(){

      this.service
      .GetPersonnel(this.auth.currentUserValue.societe_id).subscribe((data:any) => {
        console.log(data);
      this.service.lol=data;
    
      });
    
  }
  getdepa(){

    this.services.Getd().subscribe((data:any) => {
    console.log(data);
    this.dep=data;
  
    });

  
} 
getcoll(){

  this.services.Getcollege().subscribe((data:any) => {
    console.log(data)
  this.college=data;

  });

}
get_type_qulif(){
  this.services.Getqualification(this.auth.currentUserValue.societe_id).subscribe((data:any) => {
  this.qual=data;
  });
}


getserv(){

  this.services
  .GetSe()
  .subscribe((data:any) => {
    console.log(data);
  this.ser=data;

  });

} getsect(){

  this.services
  .GetSec()
  .subscribe((data:any) => {
    console.log(data);
  this.sec=data;

  });

}
getshift(){

  this.servicess.Getshift(this.auth.currentUserValue.societe_id).subscribe((data:any) => {
  this.shift=data;
  console.log(data);

  });

}
getirpp(){

  this.servicesss
  .GetIrpp(this.auth.currentUserValue.societe_id)
  .subscribe((data:any) => {
    console.log(data);
  this.irpp=data;

  });

}
getempbyid(id:any){

  this.service
  .Getetatbyid(id)
  .subscribe((data:any) => {
    console.log(data);

  });

}

  openModifEmpo(table:any,tabs:any,tabi:any,tabd:any){
   
  // this.service
  // .Getetatbyid(id)
  // .subscribe((data:any) => {
  //   console.log(data);
  //   this.table=data;
    this.etatform.get('matricule').setValue(table.matricule)
    this.matricule=this.etatform.get('matricule').value;
    console.log(this.matricule)
    this.etatform.get('nom').setValue(table.nom)
    this.etatform.get('prenom').setValue(table.prenom)
    this.etatform.get('datenaiss').setValue(table.datenaiss)
    this.etatform.get('lieu').setValue(table.lieu)
    this.etatform.get('nationnalite').setValue(table.nationnalite)
    this.etatform.get('NCin').setValue(table.NCin)
    this.etatform.get('LieuC').setValue(table.LieuC)
    this.etatform.get('dateC').setValue(table.DateC)
    this.etatform.get('adresse').setValue(table.adresse)
    this.etatform.get('Ntel').setValue(table.Ntel)
    this.etatform.get('dateEmb').setValue(table.dateEmb)
    this.etatform.get('sexe').setValue(table.sexe)
    this.etatform.get('college').setValue(table.college)
    this.etatform.get('dateEmbGrp').setValue(table.dateEmbGrp)
    this.etatform.get('creditB').setValue(table.CreditB)
    this.etatform.get('creditS').setValue(table.CreditS)
    this.etatform.get('etat').setValue(table.etat)
    this.etatform.get('cheffamille').setValue(table.cheffamille)
    this.etatform.get('departement').setValue(table.departement)  
    this.etatform.get('service').setValue(table.service) 
     this.etatform.get('section').setValue(table.section) 
     this.etatform.get('dateaff').setValue(table.dateaff)  
    // });
    this.service
    .Getsalairebyid('0001')
    .subscribe((data:any) => {
      console.log(data);
      this.tables=data;
    this.salaireform.get('mode').setValue(tabs.mode)
    this.salaireform.get('compte').setValue(tabs.compte)
    this.salaireform.get('Ncompte').setValue(tabs.Ncompte)
    this.salaireform.get('Nrib').setValue(tabs.Nrib)
    this.salaireform.get('Banque').setValue(tabs.Banque)
    this.salaireform.get('agence').setValue(tabs.agence)
    this.salaireform.get('taux').setValue(tabs.taux)
    this.salaireform.get('agence').setValue(tabs.agence)
    this.salaireform.get('dureeEch').setValue(tabs.dureeEch)
    this.salaireform.get('anciennete_eff').setValue(tabs.anciennete_eff)
    this.salaireform.get('sal_base').setValue(tabs.sal_base)
    this.salaireform.get('supp').setValue(tabs.supp)
    this.salaireform.get('thorairehs').setValue(tabs.thorairehs)
    this.salaireform.get('shift').setValue(tabs.shift)
    });
    this.service
    .Getimpositionnyid('0001')
    .subscribe((data:any) => {
      console.log(data);
      this.tablei=data;
    this.impoform.get('matCNSS').setValue(tabi.matCNSS)
    this.impoform.get('dateaff').setValue(tabi.dateaff)
    this.impoform.get('cotisationE').setValue(tabi.cotisationE)
    this.impoform.get('cotisationP').setValue(tabi.cotisationP)
    this.impoform.get('accidenttra').setValue(tabi.accidenttra)
    this.impoform.get('medecinetra').setValue(tabi.medecinetra)
    this.impoform.get('regimeIirpp').setValue(tabi.regimeIirpp)
    this.impoform.get('baremeirpp').setValue(tabi.baremeirpp)
    this.impoform.get('nbreMens').setValue(tabi.nbreMens)
    this.impoform.get('assurancevie').setValue(tabi.assurancevie)
    this.impoform.get('interetann').setValue(tabi.interetann)
    this.impoform.get('tfp').setValue(tabi.tfp)
    this.impoform.get('foprolos').setValue(tabi.foprolos)

    });
    this.service
    .Getdiversbyid('0001')
    .subscribe((data:any) => {
      console.log(data);
      this.tabled=data;
    this.diversform.get('droitPR').setValue(tabd.droitPR)
    this.diversform.get('assurancegrp').setValue(tabd.assurancegrp)
    this.diversform.get('Nadhesion').setValue(tabd.Nadhesion)
    this.diversform.get('autorisehs').setValue(tabd.autorisehs)
    this.diversform.get('autoriseMjhs').setValue(tabd.autoriseMjhs)
    this.diversform.get('basesoldeconge').setValue(tabd.basesoldeconge)
    this.diversform.get('nbrhj').setValue(tabd.nbrhj)});
  }
  deleteEmp(id:any){
    Swal.fire({
      title: 'Confirmation de suppression?',
      text: 'êtes-vous sûr de vouloir supprimer cette Employé!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Oui, Supprimer!',
      cancelButtonText:'Annuler'
    }).then(result => {
      if (result.value) {
        this.service.deletePersonnel(id).subscribe(response=>{  
          this.getqual();    
          })
        Swal.fire('la suppression a été effectuée!');
      }
    });
    }
  
/************************************etat**************************************** */
addetat(){  

  this.matricule=this.etatform.get('matricule').value;
  console.log(this.matricule)
  this.submit = true;
  console.log(this.etatform.valid)
  // if(this.etatform.valid){
    this.service.Getetatbyid(this.matricule).subscribe(response=>{ 
      console.log(response);
  if(response.length!=0){
    Swal.fire({
      icon: 'error',
      title: 'Matricule déja existe !',
      showConfirmButton: false,
      timer: 1500
    });}
  else{
  console.log(this.etatform.value);
  this.service.addetat(this.etatform.value,this.auth.currentUserValue.societe_id).subscribe(response=>{   
  Swal.fire({
    icon: 'success',
    title: 'Enregistrer avec succès',
    showConfirmButton: false,
    timer: 1500
  });
  console.log(this.etatform.value);
  this.submit=false;
  this.getemp();
  });

}      });

 //}
}



updateetat(){  
  this.submit = true;

  // if (this.Ajoutform.valid) {
    this.service.updateetat(this.etatform.value)
    .subscribe(data => console.log(data), error => console.log(error));
    this.getemp();
  // }
}

/************************************enfant**************************************** */
addenfant()
{
 // this.matricule=3
  if (this.matricule==null){
    Swal.fire({
    title: 'Erreur!',
    text: 'vous devez dabord fournir les informations général du employé',
    icon: 'warning',
    confirmButtonColor: '#34c38f',
  });
}
  else
 { 

   this.submitt = true;
  this.enfantform.get('matricule').setValue(this.matricule)

   if (this.enfantform.valid) {
    this.service.addEnfant(this.enfantform.value)
    .subscribe(data => console.log(data), error => console.log(error));
    Swal.fire({
      icon: 'success',
      title: 'Enregistrer avec succès',
      showConfirmButton: false,
      timer: 1500
    });
    this.getenfant();
  }
}
}

getenfant(){
  //this.matricule=3;
  this.service
  .GetEnfant(this.matricule)
  .subscribe((data:any) => {
    console.log(data);
    this.enfantdata = data;

  });

}
supprimer_qualf(id){
  Swal.fire({
    title: 'Confirmation de suppression?',
    text: 'êtes-vous sûr de vouloir supprimer cette qualification!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34c38f',
    cancelButtonColor: '#ff3d60',
    confirmButtonText: 'Oui, Supprimer!',
    cancelButtonText:'Annuler'
  }).then(result => {
    if (result.value) {
      this.service.deletequal(id).subscribe(response=>{  
        this.getqual(); 
        })
      Swal.fire('la suppression a été effectuée!');
    }
  });
}
deleteenfant(id:any){
Swal.fire({
  title: 'Confirmation de suppression?',
  text: 'êtes-vous sûr de vouloir supprimer cette Enfant!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#34c38f',
  cancelButtonColor: '#ff3d60',
  confirmButtonText: 'Oui, Supprimer!',
  cancelButtonText:'Annuler'
}).then(result => {
  if (result.value) {
    this.service.deleteenfant(id).subscribe(response=>{  
      this.getenfant();    
      })
    Swal.fire('la suppression a été effectuée!');
  }
});
}
updateenf(){
this.submitt=true;
if(this.enfantform.valid){

  this.service.updateenfant(this.enfantform.value).subscribe(response=>{ 
    Swal.fire({
      icon: 'success',
      title: 'Modification avec succés',
      showConfirmButton: false,
      timer: 1500
    });
   this.getenfant();
    })
}

}
openModifEnf(table:any){
  this.enfantform.get('nom').setValue(table.nom)
  this.enfantform.get('date').setValue(table.date)
} 
get f(){ return this.enfantform.controls;}

/************************************qualification**************************************** */
addQual()
{
  //this.matricule=3
  if (this.matricule==null){
    Swal.fire({
    title: 'Erreur!',
    text: 'vous devez dabord fournir les informations général du employé',
    icon: 'warning',
    confirmButtonColor: '#34c38f',
  });
}
  else{ 
    this.submitted = true;
    this.Qualform.get('matricule').setValue(this.matricule)
  if (this.Qualform.valid) {
    console.log(this.Qualform.value)
    this.service.addQualification(this.Qualform.value)
    .subscribe(data => console.log(data), error => console.log(error));
    this.getqual(); 
    Swal.fire({
      icon: 'success',
      title: 'Enregistrer avec succès',
      showConfirmButton: false,
      timer: 1500
    });
  }}
  this.getqual(); 
}
getqual() {
  this.service.GetQualification(this.matricule).subscribe((data:any) => {
  console.log(data);
  this.qualidata = data;

});
}
deleteQual(id:any){
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
      this.service.deletequal(id).subscribe(response=>{  
        this.getqual();    
        })
      Swal.fire('la suppression a été effectuée!');
    }
  });
  }
  updateQual(){
  this.submit=true;
  if(this.Qualform.valid){
  
    this.service.updatequali(this.Qualform.value).subscribe(response=>{ 
      Swal.fire({
        icon: 'success',
        title: 'Modification avec succés',
        showConfirmButton: false,
        timer: 1500
      });
     this.getqual();
      })
  }
  
  }
  openModifQual(table:any){
    this.enfantform.get('qualification').setValue(table.nom)
    this.enfantform.get('description').setValue(table.date)
    this.enfantform.get('actuelle').setValue(table.date)
  } 
  get fq(){ return this.Qualform.controls;}

/************************************droit**************************************** */

addDroit(){
  if (this.matricule==null){
    Swal.fire({
    title: 'Erreur!',
    text: 'vous devez dabord fournir les informations général du employé',
    icon: 'warning',
    confirmButtonColor: '#34c38f',
  });
}
  else{
  this.sub=true;
  // if(this.salaireform.valid){
    this.droitform.get('matricule').setValue(this.matricule)

      this.service.addDroitConge(this.droitform.value,this.auth.currentUserValue.exercice_id).subscribe(response=>{   
        Swal.fire({
          icon: 'success',
          title: 'Enregistrer avec succès',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(response);
        this.sub=false;
        this.getdroit();
        });
      // }
  }
}
getdroit() {
  this.service.GetDroitConge().subscribe((data:any) => {
  console.log(data);
  this.droitdata = data;

});}

deletedroit(id:any){
Swal.fire({
  title: 'Confirmation de suppression?',
  text: 'êtes-vous sûr de vouloir supprimer cette Droit!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#34c38f',
  cancelButtonColor: '#ff3d60',
  confirmButtonText: 'Oui, Supprimer!',
  cancelButtonText:'Annuler'
}).then(result => {
  if (result.value) {
    this.service.deletedroit(id).subscribe(response=>{  
      this.getdroit();    
      })
    Swal.fire('la suppression a été effectuée!');
  }
});

}

  updatedroit(){
  this.submit=true;
  if(this.droitform.valid){
  
    this.service.updatedroit(this.droitform.value).subscribe(response=>{ 
      Swal.fire({
        icon: 'success',
        title: 'Modification avec succés',
        showConfirmButton: false,
        timer: 1500
      });
     this.getdroit();
      })
  }
  
  }
 openModifd(content:any,table:any){
  this.modalService.open(content, { centered: true });
  this.droitform.get('conge').setValue(table.conge)
  this.droitform.get('droitM').setValue(table.droitM)
  this.droitform.get('droitA').setValue(table.droitA)
  this.droitform.get('soldeinitial').setValue(table.soldeinitial)
  this.droitform.get('soldeinitial').setValue('1')

} 
get fr(){ return this.droitform.controls;}

/******************************************salaire********************************************* */

  addsalaire(){

    //this.matricule=3;


    if (this.matricule==null){
      Swal.fire({
      title: 'Erreur!',
      text: 'vous devez dabord fournir les informations général du employé',
      icon: 'warning',
      confirmButtonColor: '#34c38f',
    });
  }
    else{

    this.service.Getsalairebyid(this.matricule).subscribe(response=>{
      console.log(response);
   if(response.length!=0){
    Swal.fire({
      icon: 'error',
      title: 'Les informations de salaire déja existe pour cette employé!',
      showConfirmButton: false,
      timer: 1500
    });}
  
  else{

    this.salaireform.get('matricule').setValue(this.matricule)
    this.submit=true;
     if(this.salaireform.valid){

        this.service.addsalaire(this.salaireform.value).subscribe(response=>{   
          Swal.fire({
            icon: 'success',
            title: 'Enregistrer avec succès',
            showConfirmButton: false,
            timer: 1500
          });
          console.log(response);
          this.submit=false;
          this.getemp();
          
          });
        }
    }
  });
  }
}
  

updatesalaire(){
  this.submit=true;
  // if(this.salaireform.valid){
  
    this.service.updatesalaire(this.salaireform.value).subscribe(response=>{ 
      Swal.fire({
        icon: 'success',
        title: 'Modification avec succés',
        showConfirmButton: false,
        timer: 1500
      });
     this.getemp();
      })
  // }
}
get forms() {
  return this.salaireform.controls;
}
/**********************************imposition************************************** */

addimposition(){

  if (this.matricule==null){
    Swal.fire({
    title: 'Erreur!',
    text: 'vous devez dabord fournir les informations général du employé',
    icon: 'warning',
    confirmButtonColor: '#34c38f',
  });
}
  else{
    this.service.Getimpositionmatricule(this.matricule).subscribe(response=>{
      console.log(response);
  if(response.length!=0){
    Swal.fire({
      icon: 'error',
      title: 'Les informations de imposition déja existe pour cette employé!',
      showConfirmButton: false,
      timer: 1500
    });
  }
  
  else{
  this.submit=true;
  // if(this.salaireform.valid){
    this.impoform.get('matricule').setValue(this.matricule)
if(this.impoform.valid){
      this.service.addimposition(this.impoform.value).subscribe(response=>{   
        Swal.fire({
          icon: 'success',
          title: 'Enregistrer avec succès',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(response);
        this.submit=false;
        this.getemp();
        });
      }
      // }
  }
});
}
}
updateimposition(){  
  this.submit = true;

  // if (this.Ajoutform.valid) {
    this.service.updateimposition(this.impoform.value)
    .subscribe(data => console.log(data), error => console.log(error));
    this.getemp();
  // }
}
get formi() {
  return this.impoform.controls;
}

/***************************divers*********** */


adddivers(){
  if (this.matricule==null){
    Swal.fire({
    title: 'Erreur!',
    text: 'vous devez dabord fournir les informations général du employé',
    icon: 'warning',
    confirmButtonColor: '#34c38f',
  });
}
  else{
    this.service.Getdivers_matricule(this.matricule).subscribe(response=>{
      console.log(response);
  if(response.length!=0){
    Swal.fire({
      icon: 'error',
      title: 'Les informations de salaire déja existe pour cette employé!',
      showConfirmButton: false,
      timer: 1500
    });}
  
  else{
  this.submit=true;
  // if(this.salaireform.valid){
    this.diversform.get('matricule').setValue(this.matricule)

      this.service.adddivers(this.diversform.value).subscribe(response=>{   
        Swal.fire({
          icon: 'success',
          title: 'Enregistrer avec succès',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(response);
        this.submit=false;
        this.getemp();
        });
      }
      // }
    });
    }
}
updatedivers(){  
  this.submit = true;

  // if (this.Ajoutform.valid) {
    this.service.updatedivers(this.diversform.value)
    .subscribe(data => console.log(data), error => console.log(error));
    this.getemp();
  // }
}
get formd() {
  return this.diversform.controls;
}
supprimer_enfant(id){
  Swal.fire({
    title: 'Confirmation de suppression?',
    text: 'êtes-vous sûr de vouloir supprimer cette enfant!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34c38f',
    cancelButtonColor: '#ff3d60',
    confirmButtonText: 'Oui, Supprimer!',
    cancelButtonText:'Annuler'
  }).then(result => {
    if (result.value) {
      this.service.deleteenfant(id).subscribe(response=>{  
        this.getenfant();    
        })
      Swal.fire('la suppression est effectuée!', 'Enfant supprimé.', 'success');
    }
  });

}
}