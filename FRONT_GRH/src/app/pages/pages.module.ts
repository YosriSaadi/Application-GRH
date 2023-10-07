import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiModule } from '../shared/ui/ui.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { ParametrageComponent } from './Parametrage/parametrage.component';
import { PagesRoutingModule } from './pages-routing.module';

//import { NgbNavModule, NgbDropdownModule, NgbTooltipModule, NgbAlertModule, NgbAccordionModule, NgbButtonsModule, NgbCarouselModule, NgbCollapseModule, NgbModalModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule, NgbNavModule, NgbTypeaheadModule, NgbPaginationModule, NgbCollapseModule, NgbTooltipModule, NgbModalModule, NgbDropdownModule, NgbAlertModule, NgbButtonsModule, NgbCarouselModule, NgbPopoverModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DndModule } from 'ngx-drag-drop';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { KanbanComponent } from './kanban/kanban.component';
import { EmailModule } from './email/email.module';
import { UIModule } from './ui/ui.module';
import { IconsModule } from './icons/icons.module';
import { ChartModule } from './chart/chart.module';
import { FormModule } from './form/form.module';
import { TablesModule } from './tables/tables.module';
import { MapsModule } from './maps/maps.module';
import { ConfigComponent } from './config/config.component';
import { UsersComponent } from './users/users.component';
import { LegislationModule } from './législation/legislation.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { PersonnelComponent } from './personnel/personnel.component';
import { FicheComponent } from './fiche/fiche.component';
import { Ng5SliderModule } from 'ng5-slider';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { HeuressuppComponent } from './heuressupp/heuressupp.component';
import { hsSortableDirective } from './heuressupp/shared/hs-sortable.directive';
import { AvanceComponent } from './avance/avance.component';
import { avanceSortableDirective } from './avance/shared/avance-sortable.directive';
import { PretsComponent } from './prets/prets.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { PrimeComponent } from './prime/prime.component';
import { RetenueComponent } from './retenue/retenue.component';
import { AbsenceComponent } from './absence/absence.component';
import { OrdresComponent } from './ordres/ordres.component';
import { CongesComponent } from './conges/conges.component';
import { EmployeeComponent } from './employee/employee.component';
import { PaieComponent } from './paie/paie.component';
import { TableauBordComponent } from './tableau-bord/tableau-bord.component';
import * as echarts from 'echarts';


import { ChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 0.3
};

@NgModule({
  declarations: [DashboardComponent, CalendarComponent, ChatComponent, KanbanComponent, ConfigComponent, UsersComponent, PersonnelComponent, FicheComponent, HeuressuppComponent,hsSortableDirective,AvanceComponent,avanceSortableDirective, PretsComponent, CalendrierComponent, PrimeComponent, RetenueComponent, AbsenceComponent,ParametrageComponent, OrdresComponent,CongesComponent,EmployeeComponent, PaieComponent, TableauBordComponent],
  imports: [
    CommonModule,
    NgxEchartsModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    UiModule,
    UIModule,
    NgbTypeaheadModule, 
    Ng2SearchPipeModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    DndModule,
    FullCalendarModule,
    EcommerceModule, EmailModule,
    IconsModule,
    ChartModule,
    FormModule,
    TablesModule,
    MapsModule,
    LeafletModule,
    WidgetModule,
    LegislationModule,
    ConfigurationModule

,


    Ng5SliderModule,
    NgbAlertModule,
    NgbCarouselModule,
    
    NgbModalModule,
    NgbProgressbarModule,
    
    NgbButtonsModule,
    
    NgbPopoverModule,
    NgbPaginationModule,
   
    NgbAccordionModule,
    NgbCollapseModule,
    NgbPaginationModule,
    NgxMaskModule,
    NgSelectModule,
    
   

  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class PagesModule { }
