import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;
  test_login:boolean=false;




  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, public authenticationService: AuthenticationService, public authFackservice: AuthfakeauthenticationService) { }

  ngOnInit() {
    document.body.removeAttribute('data-layout');
    document.body.classList.add('auth-body-bg');

    this.loginForm = this.formBuilder.group({
      user: ['bilel@gmail.com', [Validators.required]],
      password: ['55021700', [Validators.required]],
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
 /* onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
        this.authFackservice.loginadmin(this.f.user.value, this.f.password.value);
        console.log(this.authFackservice.currentAdmin);
        if(this.authFackservice.currentadminValue.username==this.f.user.value){
          console.log(this.authFackservice.currentadminValue.username);
          this.router.navigate(['administrateur']);
        }
        else{
        error => {
          this.error = error ? error : '';
        }
          
      }
           
    }
  }*/




  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }  else {
      this.authFackservice.loginadmin(this.f.user.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['administrateur/users']);
          },          
          error => {
            alert("erreur");
            this.error = error ? error : '';
          });
          this.authFackservice.loginadmin(this.f.user.value, this.f.password.value).subscribe(response=>{  
          if(this.authFackservice.currentadminValue==null){
            this.test_login=true;
           this.error='Identifiant ou mot de passe incorrect';
          }else{
            this.test_login=false;

          }

        })  
  }
  }







}
