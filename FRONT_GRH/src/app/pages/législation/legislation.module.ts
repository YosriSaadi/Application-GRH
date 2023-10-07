import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// tslint:disable-next-line: max-line-length
import { NgbAccordionModule, NgbNavModule, NgbTypeaheadModule, NgbPaginationModule, NgbCollapseModule, NgbTooltipModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { Ng5SliderModule } from 'ng5-slider';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { UiModule } from '../../shared/ui/ui.module';


import { LegislationRoutingModule } from './legislation-routing.module';
import { GrilleComponent } from './grille/grille.component';
import { IrppComponent } from './irpp/irpp.component';
import { RegimesComponent } from './regimes/regimes.component';
import { ShiftsComponent } from './shifts/shifts.component';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [GrilleComponent,RegimesComponent,ShiftsComponent,IrppComponent],
  imports: [
    CommonModule,
    FormsModule,
    DropzoneModule,
    ReactiveFormsModule,
    LegislationRoutingModule,
    UiModule,
    ArchwizardModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbTooltipModule,
    NgbCollapseModule,
    NgSelectModule,
    Ng5SliderModule,
    NgbModalModule
  ]
})
export class LegislationModule { }
