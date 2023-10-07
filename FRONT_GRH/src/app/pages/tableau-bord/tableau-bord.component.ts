import { Component, OnInit } from '@angular/core';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { ChartType, Stat, Chat, Transaction } from './shared/tableau.model';
import { statData, salesAnalytics, sparklineEarning, sparklineMonthly, chatData, transactions } from './shared/data';
//import { donutChart } from './shared/data';
import{tbservice} from './shared/tableau.service'
@Component({
  selector: 'app-tableau-bord',
  templateUrl: './tableau-bord.component.html',
  styleUrls: ['./tableau-bord.component.scss']
})
export class TableauBordComponent implements OnInit {
  //intiatlisation 
  departements_nombre:any= [];
  departements_lables:any= [];
  nbcollege:any=[];
  year:number=2000;
  impot_charges:any;
  moyenne_age:any=0;
  labelecollege:any=[];
  nb_j_absences:any=[];
  abseries:any= [{name: '',type: 'column',data: [0,0,0,0]}, {name: '',type: 'line',data: [0,0,0,0]}];

  //count
  effectif:number; 
  effectif_actif:number;
  coutemploye:string;
//collégé
collchart= {height: 400,type: 'donut'};
collegend= {show: true,position: 'bottom',horizontalAlign: 'center',verticalAlign: 'middle',floating: false,fontSize: '14px',offsetX: 0,offsetY: -10}
collseries= []
colllabels= []
collcolors= ['#1cbb8c', '#5664d2', '#fcb92c', '#4aa3ff', '#ff3d60'];
collresponsive: [{breakpoint: 600,options: {chart: { height: 240 },legend: { show: false},}}]
//chart departement /section/service...
deptchart= {height: 400,type: 'donut'};
deptlegend= {show: true,position: 'bottom',horizontalAlign: 'center',verticalAlign: 'middle',floating: false,fontSize: '14px',offsetX: 0,offsetY: -10}
deptseries= []
deptlabels= []
deptcolors= ['#fcb92c', '#4aa3ff', '#ff3d60','#1cbb8c', '#5664d2' ];
deptresponsive: [{breakpoint: 600,options: {chart: { height: 240 },legend: { show: false},}}]
  //tranche d'âge
chart= {height: 320,type: 'pie'}
series= [0, 0]
labels= ['Homme ', 'Femme ']
colors= ['#4aa3ff', '#ff3d60']
legend= {show: true,position: 'bottom',horizontalAlign: 'center',verticalAlign: 'middle',floating: false,fontSize: '14px',offsetX: 0, offsetY: -10
}
responsive= [{breakpoint: 800,options: {chart: {height: 400},legend: { show: false},}
}]



  term: any;
  chatData: Chat[];
  transactions: Transaction[];
  statData: Stat[];
  

  salesAnalytics: ChartType;
  sparklineEarning: ChartType;
  sparklineMonthly: ChartType;
  // Form submit
  chatSubmit: boolean;
  constructor(private service:tbservice,private auth:AuthfakeauthenticationService) { 
    // chart absences

   /* this.abseries[0].data=[23, 32, 27, 38, 27, 32, 27, 38, 22];
    this.abseries[1].data=[23, 32, 27, 38, 27, 32, 27, 38, 22];
    for(var i = 0; i <3; i++){  
      this.abseries[0].data.push(i)
      this.abseries[1].data.push(i)

    }*/
    this.service.exercice(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
      this.year=response[0].exercice;

    })
    this.service.Getnbr_absences(this.auth.currentUserValue.exercice_id).subscribe(response=>{       
     /* this.abseries[0].data.push(response[0].nbr_jours)
      this.abseries[1].data.push(response[0].nbr_jours)*/
      for(var i = 0; i <response.length; i++){  
        this.nb_j_absences.push(response[i].nbr_jours)
      }
      this.abseries[0].data=this.nb_j_absences
      this.abseries[1].data=this.nb_j_absences
      this.abseries[0].name=response[0].annee
      this.abseries[1].name=response[0].annee
      })
  //total effectif
    this.service.Getnbr_effectif().subscribe(response=>{      
     this.effectif=response[0].Nbeffectif
     })
    //total effectif actif
    this.service.Getnbr_effectifete_actif(this.auth.currentUserValue.societe_id).subscribe(response=>{      
      this.effectif_actif=response[0].effectif_actif
 
      })
    this.service.Getnbr_cout_effectif(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
      this.coutemploye=response[0].coutemploye+" DT"
      }) 
//impot et charges sociales
      this.service.Get_cimpot_charge(this.auth.currentUserValue.exercice_id).subscribe(response=>{      
        this.impot_charges=response[0].impot_charges+" DT"
       
        }) 

      //moyenne age
      this.service.Get_moyenne_age(this.auth.currentUserValue.societe_id).subscribe(response=>{      
        this.moyenne_age=response[0].moyenne_age+" ANS"
        }) 
        
    this.service.Getnbr_effectif_sexe().subscribe(response=>{      
        this.series= [response[1].nombre,response[0].nombre]
        }) 
    //collége
    this.service.Getnbr_effectif_college().subscribe(response=>{      
      for(var i = 0; i <response.length; i++){  
        this.nbcollege.push(response[i].nombre)
        this.labelecollege.push(response[i].college) 
      } 
     this.collseries= this.nbcollege
     this.colllabels= this.labelecollege
    }) 
    this.service.Getnbr_effectif_departements().subscribe(response=>{      
      for(var i = 0; i <response.length; i++){  
        this.departements_nombre.push(response[i].nombre)
        this.departements_lables.push(response[i].departement) 
      }
      this.deptseries= this.departements_nombre
      this.deptlabels= this.departements_lables
    }) 
    
  }



//

 //chart absence

 revenueChart: ChartType = {
  chart: {
      height: 280,
      type: 'line',
      toolbar: {
          show: false,
      }
  },
  stroke: {
      width: [0, 3],
      curve: 'smooth'
  },
  plotOptions: {
      bar: {
          horizontal: false,
          columnWidth: '20%',
      },
  },
  dataLabels: {
      enabled: false,
  },
  legend: {
      show: false,
  },
  colors: ['#5664d2', '#1cbb8c'],
  labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', ' Juillet', 'Août', 'Septembre', ' Octobre', 'Novembre', 'December'],
};

   



  ngOnInit(): void {
    this._fetchData();
   
     
    

}
private _fetchData() {
  //this.revenueChart = revenueChart;
  this.salesAnalytics = salesAnalytics;
  this.sparklineEarning = sparklineEarning;
  this.sparklineMonthly = sparklineMonthly;
  this.chatData = chatData;
  this.transactions = transactions;
  this.statData = statData;
}

}
