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


import { ConfigurationRoutingModule } from './configuration-routing.module';
import { DepartementComponent } from './departement/departement.component';
import { PretsComponent } from './prets/prets.component';
import { PrimesComponent } from './primes/primes.component';
import { StatuesComponent } from './statues/statues.component';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [DepartementComponent, PretsComponent, PrimesComponent, StatuesComponent],
  imports: [
    CommonModule,
    FormsModule,
    DropzoneModule,
    ReactiveFormsModule,
    ConfigurationRoutingModule,
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
export class ConfigurationModule { }
