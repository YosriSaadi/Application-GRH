import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Societe } from './shared/societe.model';
import { SocieteService } from './shared/societe.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  formsociete: FormGroup;
  
private Societes =new Societe;
  constructor(public societeService: SocieteService) { }


  
  ngOnInit(): void {
   
    this.societeService.GettSociete().subscribe(data=>{
      //this.Societes=data;
      console.log(data);
      })

     this.formsociete=new FormGroup({
        adresse:new FormControl(this.Societes.adresse),
        nom:new FormControl(this.Societes.nom),
   
  
    })


  

    
   this.resetform();
    /*this.validationform = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      state: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      zip: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    });*/
  }
  /*get form() {
    return this.validationform.controls;
  }*/
      onSubmit(){
     
        console.log(this.Societes);
        this.formsociete=new FormGroup({
          adresse:new FormControl(this.Societes.adresse),
          nom:new FormControl(this.Societes.nom),
      
        })
    
    }
  

 
  
  resetform(form?: NgForm){
    if(form!=null)
    form.resetForm();
    this.societeService.formData={
      id:null,
      nom :'',
    adresse:'',
    ville:'',
    rue:'',
    code_postal:null,
    tel:null,
    email :'',
    fax:null,
    matricule_cnss:null,
    date_ouverture :null,
    Activite:'',

    }
  }

    /*onSubmit(form:NgForm){
    this.insertRecord(form);
    this.resetform();
    }*/

    insertRecord(form :NgForm){
    this.societeService.postsociete(form.value);
    }

}
