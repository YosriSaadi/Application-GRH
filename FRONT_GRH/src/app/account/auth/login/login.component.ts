import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import { loginservice } from './shared/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  exercice_hide:boolean=true
  loginForm: FormGroup;
  submitted = false;
  error = '';
  test_login:boolean=false;
  returnUrl: string;
  exercices:[];


  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, public authenticationService: AuthenticationService, public authFackservice: AuthfakeauthenticationService,public service:loginservice) { }

  ngOnInit() {
    document.body.removeAttribute('data-layout');
    document.body.classList.add('auth-body-bg');

    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
   
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
        this.authFackservice.login(this.f.user.value, this.f.password.value)
          .pipe(first())
          .subscribe(
            data => {
             
              this.router.navigate(['/']);
            },                
            error => {                    
            });
            this.authFackservice.login(this.f.user.value, this.f.password.value).subscribe(response=>{    
     
              if(this.authFackservice.currentUserValue==null){
                this.test_login=true;
               this.error='Identifiant ou mot de passe est incorrect';
              }
              else{
                this.test_login=false;
              }
         
           
             })  
            
          
        
    }

  
    
  }

 /* onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      if (environment.defaultauth === 'firebase') {
        this.authenticationService.login(this.f.email.value, this.f.password.value).then((res: any) => {
          this.router.navigate(['/']);
        })
          
      } else {
        this.authFackservice.login(this.f.email.value, this.f.password.value)
          .subscribe(
            data => {
              console.log(data.username)
              
              if(data.username===this.f.email.value && this.f.password.value==data.password){
              this.router.navigate(['/']);
              }
              else{
                error => {
                  this.error = error ? error : '';
                }
              }
            },           
           );
      }
    }
  }*/
  select_exercices(event){
  
    this.service.Getexercices(event.target.value).subscribe(response=>{  
      if(response.length!=0){
      this.exercices=response
      this.authFackservice.id_Exerice=response[0].id
      console.log(this.authFackservice.id_Exerice)
      this.exercice_hide=false
    }
    else{
      this.exercices=null
      this.exercice_hide=true
    }
       }) 
  }
  save_exercice(item){
    this.authFackservice.id_Exerice=item.target.value;
    console.log(this.authFackservice.id_Exerice)
  }

  

}
