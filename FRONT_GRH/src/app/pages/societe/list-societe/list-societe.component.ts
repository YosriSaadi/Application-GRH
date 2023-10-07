import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import {SocieteService} from'./societe.service';
import{societe} from './societe.model';
import {societesData} from './data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocieteSortableDirective, SortEvent } from './societe-soratble.directive';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-societe',
  templateUrl: './list-societe.component.html',
  styleUrls: ['./list-societe.component.scss'],
  providers: [SocieteService, DecimalPipe]
})
export class ListSocieteComponent implements OnInit {
  @ViewChildren( SocieteSortableDirective) headers: QueryList<SocieteSortableDirective>;
  submitted: boolean;
  // breadcrumb items
  breadCrumbItems:Array<{}>;
  hideme: boolean[] = [];
  editId:number=null;
 societevalidationform: FormGroup;
 editsocietevalidationform: FormGroup;
  // Table data
  societesData:societe[];
 
  tables$:Observable<societe[]>;
  total$:Observable<number>;



  constructor(public service: SocieteService,private modalService: NgbModal,public formBuilder: FormBuilder) {
    this.service.Getsocites().subscribe(response=>{      
      service.sc=response;
     })
    
    this.tables$ = service.tables$;
    this.total$ = service.total$;

   }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Sociétés' }, { label: 'Liste', active: true }];
    this._fetchData()
    /**
     * fetch data
     */
     this._fetchData();
     this.societevalidationform = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.pattern('[a-zA-Z ]+')]],
      email: ['', [Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9]+.[a-z]{2,3}$')]],
      tel: ['', [Validators.pattern('[0-9]+')]],
      activite: ['', [Validators.required,Validators.pattern('[a-zA-Z ]+')]],
      adresse: [''],
      rue: ['', [ Validators.pattern('[a-zA-Z0-9 ]+')]],
      ville: ['', [Validators.pattern('[a-zA-Z0-9 ]+')]],
      code_postal: ['', [Validators.pattern('[a-zA-Z0-9]+')]],
      matricule_cnss: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9-]+')]],
      fax: ['', [Validators.pattern('[0-9]+')]],
      matricule_fiscal:['', [Validators.required, Validators.pattern('[a-zA-Z0-9-]+')]],
      date_ouverture: [],
    });
    this.editsocietevalidationform = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.pattern('[a-zA-Z ]+')]],
      email: ['', [Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9]+.[a-z]{2,3}$')]],
      tel: ['', [Validators.pattern('[0-9]+')]],
      activite: ['', [Validators.required,Validators.pattern('[a-zA-Z ]+')]],
      adresse: [''],
      rue: ['', [ Validators.pattern('[a-zA-Z0-9 ]+')]],
      ville: ['', [Validators.pattern('[a-zA-Z0-9 ]+')]],
      code_postal: ['', [Validators.pattern('[a-zA-Z0-9]+')]],
      matricule_cnss: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9-]+')]],
      fax: ['', [Validators.pattern('[0-9]+')]],
      matricule_fiscal:['', [Validators.required, Validators.pattern('[a-zA-Z0-9-]+')]],
      date_ouverture: [],
    });
     
  }

  /**
   * fetches the table value
   */
   _fetchData() {
    this.service.Getsocites().subscribe(response=>{      
      this.societesData = response;
      //this.submitted = false;
    
     })
  }
  changeValue(i) {
    this.hideme[i] = !this.hideme[i];
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


  deletesociete(id:any){

    Swal.fire({
      title: 'Confirmation de suppression?',
      text: 'êtes-vous sûr de vouloir supprimer cette société!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Oui, Supprimer!',
      cancelButtonText:'Annuler'
    }).then(result => {
      if (result.value) {
        this.service.deletesociete(id).subscribe(response=>{  
          this.service.Getsocites().subscribe(response=>{      
            this.service.sc=response;
            this.tables$ = this.service.tables$;
           })    
          })
        Swal.fire('la suppression est effectuée!', 'Société Supprimée.', 'success');
      }
    });


    
  }

/**
   * Returns form
   */
 get form() {
  return this.societevalidationform.controls;
}
get editform() {
  return this.editsocietevalidationform.controls;
}
/**
 * Modal Open
 * @param content modal content
 */
openModal(content: any) {
  this.modalService.open(content, { centered: true });
}

saveData() {
  if (this.societevalidationform.valid) {
    
    /*this.tables$.subscribe(response=>{      
      console.log(response)
     
     })  */ 
    this.service.addsociete(this.societevalidationform.value).subscribe(response=>{   
      this.service.Getsocites().subscribe(response=>{      
        this.service.sc=response;
        this.tables$ = this.service.tables$;
       })     
      })
      Swal.fire({
        icon: 'success',
        title: 'Société ajoutée',
        showConfirmButton: false,
        timer: 1500
      });
      this.service.Getsocites().subscribe(response=>{      
        this.service.sc=response;
        this.tables$ = this.service.tables$;
       }) 
      this.resetformadd();
      this.service.Getsocites().subscribe(response=>{      
        this.service.sc=response;
        this.tables$ = this.service.tables$;
       }) 
  
    this.modalService.dismissAll();
    
  }
  this.submitted = true;
  
}


openedit(content:any,societe:any){
  this.modalService.open(content, { centered: true });
  this.editId=societe.id;
  this.editsocietevalidationform.get('nom').setValue(societe.nom)
  this.editsocietevalidationform.get('email').setValue(societe.email)
  this.editsocietevalidationform.get('tel').setValue(societe.tel)
  this.editsocietevalidationform.get('activite').setValue(societe.Activite)
  this.editsocietevalidationform.get('adresse').setValue(societe.adresse)
  this.editsocietevalidationform.get('rue').setValue(societe.rue)
  this.editsocietevalidationform.get('ville').setValue(societe.ville)
  this.editsocietevalidationform.get('code_postal').setValue(societe.code_postal)
  this.editsocietevalidationform.get('matricule_cnss').setValue(societe.matricule_cnss)
  this.editsocietevalidationform.get('fax').setValue(societe.fax)
  this.editsocietevalidationform.get('matricule_fiscal').setValue(societe.matricule_fiscal)
  this.editsocietevalidationform.get('date_ouverture').setValue(societe.date_ouverture)

 

}
editData(){
  
  if (this.editsocietevalidationform.valid) {
    this.service.editsociete(this.editsocietevalidationform.value,this.editId).subscribe(response=>{      
      this.service.Getsocites().subscribe(response=>{      
        this.service.sc=response;
        this.tables$ = this.service.tables$;
        this.submitted = false;
       }) 
      })
      this.modalService.dismissAll();
      Swal.fire({
        icon: 'success',
        title: 'Utilisateur modifié',
        showConfirmButton: false,
        timer: 1500
      });
  }
  this.submitted = true;
 }
resetformadd(){
  this.societevalidationform.get('nom').setValue('')
      this.societevalidationform.get('email').setValue('')
      this.societevalidationform.get('tel').setValue('')
      this.societevalidationform.get('activite').setValue('')
      this.societevalidationform.get('adresse').setValue('')
      this.societevalidationform.get('rue').setValue('')
      this.societevalidationform.get('ville').setValue('')
      this.societevalidationform.get('code_postal').setValue('')
      this.societevalidationform.get('matricule_cnss').setValue('')
      this.societevalidationform.get('fax').setValue('')
      this.societevalidationform.get('matricule_fiscal').setValue('')
      this.societevalidationform.get('date_ouverture').setValue('')
}

}



  


