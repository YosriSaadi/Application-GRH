import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/auth.models';
import { Admin } from '../models/admin.model';
import { database } from 'firebase';

@Injectable({ providedIn: 'root' })

export class AuthfakeauthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    private currentAdminSubject: BehaviorSubject<Admin>;
    public currentUser: Observable<User>;
    public  currentAdmin: Observable<Admin>;
    public id_Exerice:number;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentAdminSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('currentAdmin')));
        this.currentAdmin = this.currentAdminSubject.asObservable();
      
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    public get currentadminValue(): Admin {
        return this.currentAdminSubject.value;
    }
  
   

   /* login(email: string, password: string) {
        
        return this.http.post<any>(`/users/authenticate`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }*/

   /*login(username: string, password: string):Observable <User>{
        
        return this.http.get<User>("http://localhost:49366/api/admin/"+username+"/"+password);
           
    }*/

    login(username: string, password: string) {
        
        return this.http.get<any>("http://localhost:49366/user/"+username+"/"+password)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user.username==username&&user.password==password) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    user.exercice_id=this.id_Exerice
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
                }
                else{
                  
                    error: { message: 'L identifiant ou le mot de passe est incorrect' } 
                  //  console.log("d5al error auth fake")
                }        
            }));
    }

   /* loginadmin(username: string, password: string) {
        
        this.http.get<any>("http://localhost:49366/api/admin/"+username+"/"+password) .subscribe(
            admin => {
                localStorage.setItem('currentAdmin', JSON.stringify(admin));
                this.currentAdminSubject.next(admin);
                return admin;
            },);
            
           
        
    }*/

    loginadmin(username: string, password: string) {
        
        return this.http.get<any>("http://localhost:49366/api/admin/"+username+"/"+password)
            .pipe(map(admin => {
                // login successful if there's a jwt token in the response
                if (admin.username==username && admin.password==password) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentAdmin', JSON.stringify(admin));
                    this.currentAdminSubject.next(admin);
                    return admin;
                }
                else{
                    error: { message: 'Username or password is incorrect' } 
                }
               
            }));
    }
    
     




    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
       
    }
    logoutadmin() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentAdmin');
        this.currentAdminSubject.next(null);
    }

   

}
