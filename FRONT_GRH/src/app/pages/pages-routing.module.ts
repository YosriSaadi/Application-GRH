import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardadmin} from '../core/guards/admin.guard';
import { AuthGuard} from '../core/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { KanbanComponent } from './kanban/kanban.component';
import { ConfigComponent } from './config/config.component';
import{UsersComponent} from './users/users.component'
import { FicheComponent } from './fiche/fiche.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { HeuressuppComponent } from './heuressupp/heuressupp.component';
import { AvanceComponent } from './avance/avance.component';
import { PretsComponent } from './prets/prets.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { PrimeComponent } from './prime/prime.component';
import { RetenueComponent } from './retenue/retenue.component';
import { AbsenceComponent } from './absence/absence.component';
import { ParametrageComponent } from './Parametrage/parametrage.component';
import { OrdresComponent } from './ordres/ordres.component';
import { CongesComponent } from './conges/conges.component';
import { EmployeeComponent } from './employee/employee.component';
import { PaieComponent } from './paie/paie.component';
import { TableauBordComponent } from './tableau-bord/tableau-bord.component';
const routes: Routes = [
    
    { path: 'dash', component: DashboardComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'kanban-board', component: KanbanComponent },
    { path: 'config', component: ConfigComponent },
    { path: 'Personnel', component: PersonnelComponent },
    { path: 'Fiche', component: FicheComponent },
    { path: 'hs', component:HeuressuppComponent },
    { path: 'avance', component:AvanceComponent },
    { path: 'prets', component:PretsComponent },
    { path: 'calendrier', component:CalendrierComponent },
    { path: 'prime', component:PrimeComponent },
    { path: 'retenue', component:RetenueComponent },
    { path: 'parametrage', component:ParametrageComponent },
    { path: 'absence', component:AbsenceComponent },
    { path: 'ordres', component:OrdresComponent },
    { path: 'conges', component:CongesComponent },
    { path: 'dossier_employes', component:EmployeeComponent },
    { path: 'paie', component:PaieComponent },
    { path: '', component:TableauBordComponent },
    { path: 'users', component: UsersComponent ,canActivate: [AuthGuardadmin]},
    { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
    { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
    { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
    { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UIModule) },
    { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
    { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
    { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
    { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
    { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
    { path: 'societe', loadChildren: () => import('./societe/societe.module').then(m => m.SocieteeModule),canActivate: [AuthGuardadmin]},
    { path: 'configuration', loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule) },
    { path: 'legislation', loadChildren: () => import('./législation/legislation.module').then(m => m.LegislationModule) },
    

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
