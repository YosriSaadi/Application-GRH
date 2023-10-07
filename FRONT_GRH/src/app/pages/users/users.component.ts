import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Utilisateur} from './utilisateur.model';
import {utilisateurssData} from './utilisateurdata';
import{utilisateursservice} from './shared/utilisateur.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
// breadcrumb items
breadCrumbItems: Array<{}>;
editId:number=null;
societesnames:string[];
submitted: boolean;
utilisateurssData: Utilisateur[];
u:Utilisateur;
validationform: FormGroup;
validationformedit: FormGroup;
  constructor(private modalService: NgbModal, public formBuilder: FormBuilder,public  utilisservicee: utilisateursservice) { }

  ngOnInit(): void {

    this.breadCrumbItems = [{ label: 'Agents' }, { label: 'Liste', active: true }];

    this.validationform = this.formBuilder.group({
      nom: ['', [Validators.pattern('[a-zA-Z ]+')]],
      prenom: ['', [Validators.pattern('[a-zA-Z ]+')]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role:['', [Validators.required]],
      nomsociete:['',[Validators.required]]
    });
    this.validationformedit = this.formBuilder.group({
      nom: ['', [Validators.pattern('[a-zA-Z ]+')]],
      prenom: ['', [Validators.pattern('[a-zA-Z ]+')]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role:['', [Validators.required]],
      nomsociete:['',[Validators.required]]
    });
   this._fetchData();
   this.utilisservicee.GetsocieteNames().subscribe(data=>{
    this.societesnames=data;
    }) 


  }
  
  private _fetchData() {
  this.utilisservicee.Getusers().subscribe(data=>{
      this.utilisateurssData = data;    
      }) 
      this.submitted = false;
  }

  /**
   * Returns form
   */
  get form() {
    return this.validationform.controls;
  }

  get formedit() {
    return this.validationformedit.controls;
  }
  /**
   * Modal Open
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  /**
   * save the contacts data
   */
 saveData() {
  
  
    const nom = this.validationform.get('nom').value;
    const prenom = this.validationform.get('prenom').value;
    const username = this.validationform.get('username').value;
    const password= this.validationform.get('password').value;
    const role = this.validationform.get('role').value;
    const nomsociete = this.validationform.get('nomsociete').value;
    console.log(this.validationform.valid)
   
      this.utilisservicee.Getuser(this.validationform.get('username').value,this.validationform.get('password').value).subscribe(response=>{ 
    if(response.username==this.validationform.get('username').value&&response.password==this.validationform.get('password').value){

      Swal.fire({
        icon: 'error',
        title: 'Utulisateur existe déja!',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{

     this.utilisservicee.adduser(this.validationform.value).subscribe(response=>{      
      this._fetchData();
      })
      Swal.fire({
        icon: 'success',
        title: 'Utilisateur ajouté',
        showConfirmButton: false,
        timer: 1500
      });
      this.utilisateurssData.push({
        nom,
        prenom,
        username,
        password,
        role,
        nomsociete,
      });
      this.validationform.get('nom').setValue('')
      this.validationform.get('prenom').setValue('')
      this.validationform.get('username').setValue('')
      this.validationform.get('password').setValue('')
      /*this.validationform = this.formBuilder.group({
        nom: '',
        prenom: '',
        username: '',
        password: '',
        role: '',
        nomsociete: '',

      });*/
      this.modalService.dismissAll();
    }
      });
      

    
    this.submitted = true;
  }


 deleteuser(id:any)
 {
 
    Swal.fire({
      title: 'Confirmation de suppression?',
      text: 'êtes-vous sûr de vouloir supprimer cet utilisateur!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Oui, Supprimer!',
      cancelButtonText:'Annuler'
    }).then(result => {
      if (result.value) {
        this.utilisservicee.deleteuser(id).subscribe(response=>{ 
        this._fetchData();
        })
        Swal.fire('la suppression est effectuée!', 'Utilisateur Supprimé.', 'success');
      }
    });  
 }
 openedit(content:any,utilisateur:any){
  this.modalService.open(content, { centered: true });
  this.editId=utilisateur.id;
  this.validationformedit.get('nom').setValue(utilisateur.nom)
  this.validationformedit.get('prenom').setValue(utilisateur.prenom)
  this.validationformedit.get('username').setValue(utilisateur.username)
  this.validationformedit.get('password').setValue(utilisateur.password)
  this.validationformedit.get('role').setValue(utilisateur.role)
  this.validationformedit.get('nomsociete').setValue(utilisateur.nomsociete)


 }
//validation tecmhi ki thot champ vide
 edituser(){
  if (this.validationformedit.valid) {
    this.utilisservicee.edituser(this.validationformedit.value,this.editId).subscribe(response=>{      
      this._fetchData();
     
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



}
