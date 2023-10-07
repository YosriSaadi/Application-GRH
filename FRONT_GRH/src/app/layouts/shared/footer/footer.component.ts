import { Component, OnInit } from '@angular/core';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import{footerservice} from './shared/footer.service';
import{footer} from './shared/footer.model';
import * as moment from 'moment';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
 
  exerice:footer[];
  utilisateur:string
  societe:string;
  exercice:string;
  date:any;
  constructor(public service: footerservice,private auth:AuthfakeauthenticationService) { 
    
    const currentUser = this.auth.currentUserValue;
    this.service.Getfooterinfo(currentUser.exercice_id).subscribe(response=>{ 
      this.exerice=response
      this.societe=this.exerice[0].nom
      this.utilisateur=this.exerice[0].username
      this.exercice=this.exerice[0].exercice
      this.date=moment().lang("fr").format('LLLL')
      console.log(this.date)
    
    })

  }

  ngOnInit(): void {
  
  }


}
