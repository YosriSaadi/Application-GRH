import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Table } from './shared/hs.model';
import { tableData } from './shared/data';
import { FormBuilder,FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { hsSortableDirective, SortEvent } from './shared/hs-sortable.directive';
import { HsService } from './shared/hs.service';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr'
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
@Component({
  selector: 'app-heuressupp',
  templateUrl: './heuressupp.component.html',
  styleUrls: ['./heuressupp.component.scss'],
  providers: [HsService, DecimalPipe]
})
export class HeuressuppComponent implements OnInit {
  @ViewChildren(hsSortableDirective) headers: QueryList<hsSortableDirective>;
  // breadcrumb items
  breadCrumbItems: Array<{}>;
  hideme: boolean[] = [];
  submitted: boolean;
  submittededit: boolean;
  editid:number;
    // Table data
  ordersData: Table[];
  validationform: FormGroup;
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  validationeditform: FormGroup;
  active:number=2;
  liste_employes:any;
  constructor(public service: HsService,public formBuilder: FormBuilder,private modalService: NgbModal,public toast: ToastrService,private auth:AuthfakeauthenticationService) {
    
    //employés
    this.service.employes(this.auth.currentUserValue.societe_id).subscribe(response=>{  
      this.liste_employes=response;
     })
    
    this.service.Geths(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
      this.service.a=response
     })  
    
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Les élements de paie' }, { label: 'Heures supplementaires', active: true }];

    this.validationform = this.formBuilder.group({
      matricule: [''],
      nom: ['',Validators.required],
      date: ['',Validators.required],
      tauxhs: ['',[Validators.required, Validators.pattern('[0-9.]+')]],
      hs1_25: ['',Validators.pattern('[0-9.]+')],
      hs1_5: ['', Validators.pattern('[0-9.]+')],
      hs1_75: ['', Validators.pattern('[0-9.]+')],
      hs2: ['', Validators.pattern('[0-9.]+')],
      hs1_4: ['', Validators.pattern('[0-9.]+')],
      hs_nuit: ['', Validators.pattern('[0-9.]+')],
     
    });

    this.validationeditform = this.formBuilder.group({
      matricule: [''],
      nom: [''],
      date: [''],
      tauxhs: ['',[Validators.required, Validators.pattern('[0-9.]+')]],
      hs1_25: ['',Validators.pattern('[0-9.]+')],
      hs1_5: ['', Validators.pattern('[0-9.]+')],
      hs1_75: ['', Validators.pattern('[0-9.]+')],
      hs2: ['', Validators.pattern('[0-9.]+')],
      hs1_4: ['', Validators.pattern('[0-9.]+')],
      hs_nuit: ['', Validators.pattern('[0-9.]+')],

     
    });

    /**
     * fetch data
     */
   this._fetchData();
  }
  get form() {
    return this.validationform.controls;
  }
  get editform() {
    return this.validationeditform.controls;
  }
  /**
 * Modal Open
 * @param content modal content
 */
openModal(content: any) {
  this.modalService.open(content, { centered: true });
}
   /**
   * fetches the table value
   */
    _fetchData() {
      this.ordersData = tableData;
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

    addform(table){
      this.active=1
      this.validationform.get('matricule').setValue(table.matricule_employe)
      this.validationform.get('matricule').disable()
      this.validationform.get('nom').setValue(table.nom)
      this.validationform.get('nom').disable()

    
    }
    openedit(content:any,table:any){
      this.modalService.open(content, { centered: true });
      this.editid=table.id   
      this.validationeditform.get('matricule').setValue(table.matricule_employe)
      this.validationeditform.get('nom').setValue(table.nom)
      this.validationeditform.get('date').setValue(table.date)
      this.validationeditform.get('tauxhs').setValue(table.taux_horaire)
      this.validationeditform.get('hs1_25').setValue(table.hs1_25)
      this.validationeditform.get('hs1_5').setValue(table.hs1_5)
      this.validationeditform.get('hs1_75').setValue(table.hs1_75)
      this.validationeditform.get('hs2').setValue(table.hs2)
      this.validationeditform.get('hs1_4').setValue(table.hs1_4)
      this.validationeditform.get('hs_nuit').setValue(table.hs_nuit)

        
    }
    saveData(){
      if(this.validationform.valid){

        this.service.addhs(this.validationform.value,this.auth.currentUserValue.exercice_id).subscribe(response=>{   
          Swal.fire({
            icon: 'success',
            title: 'Ajouté avec succès ',
            showConfirmButton: false,
            timer: 1500
          });
          this.service.Geths(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
            this.service.a=response;
            this.tables$ = this.service.tables$;
           })  
        })  
      }
      this.active=2;
      this.resetformadd();
      this.submitted = true;
    }
    resetformadd(){

      this.submitted=false;
      this.validationform.get('matricule').setValue('')
      this.validationform.get('matricule').enable()
      this.validationform.get('nom').setValue('')
      this.validationform.get('nom').enable()
      this.validationform.get('date').setValue('')
      this.validationform.get('tauxhs').setValue('')
      this.validationform.get('hs1_25').setValue('')
      this.validationform.get('hs1_5').setValue('')
      this.validationform.get('hs1_75').setValue('')
      this.validationform.get('hs2').setValue('')
      this.validationform.get('hs1_4').setValue('')
      this.validationform.get('hs_nuit').setValue('')
     

    }
    ediths(){
      if(this.validationeditform.valid){
        
        this.service.updatehs(this.validationeditform.value,this.editid).subscribe(response=>{ 
          Swal.fire({
            icon: 'success',
            title: 'Modification Réussite',
            showConfirmButton: false,
            timer: 1500
          });
          this.service.Geths(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
            this.service.a=response;
            this.tables$ = this.service.tables$;
            this.submitted = false;
           }) 
          })
        this.modalService.dismissAll();
      }
      this.submittededit=true;
    }

    deletehs(id:any){
      Swal.fire({
        title: 'Confirmation de suppression?',
        text: 'êtes-vous sûr de vouloir supprimer cette heure supplémentaire!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#ff3d60',
        confirmButtonText: 'Oui, Supprimer!',
        cancelButtonText:'Annuler'
      }).then(result => {
        if (result.value) {
         this.service.deletehs(id).subscribe(response=>{  
          this.service.Geths(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
            this.service.a=response;
            this.tables$ = this.service.tables$;
           })    
          })
          Swal.fire('la suppression est effectuée!', 'Hs pour cet employé Supprimée.', 'success');
        }
      });

    }

    
    search_employe(){
      this.service.Get_employe_matricule(this.validationform.get('nom').value).subscribe(response=>{   
        if(response.length!=0){
          console.log(response)
          this.validationform.get('matricule').setValue(this.validationform.get('nom').value)
         // this.validationform.get('salaire_base').setValue(response[0].salaire_base)
          this.validationform.get('tauxhs').setValue(response[0].thorairehs)
          this.toast.success('Employé existe');
       
        }
        else{
          this.toast.error('Les informations de cette employe ne sont pas complet ou modifiées!');
          this.validationform.get('nom').setValue('')
          this.validationform.get('matricule').setValue('')
          this.validationform.get('tauxhs').setValue('')
        }
       })
     }

}
