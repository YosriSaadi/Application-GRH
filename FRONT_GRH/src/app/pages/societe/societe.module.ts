import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { societeRoutingModule } from './societe-routing.module';
import { ListSocieteComponent } from './list-societe/list-societe.component';
import { UiModule } from '../../shared/ui/ui.module';
// tslint:disable-next-line: max-line-length
import { NgbAccordionModule, NgbNavModule, NgbTypeaheadModule, NgbPaginationModule, NgbCollapseModule, NgbTooltipModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { Ng5SliderModule } from 'ng5-slider';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SocieteSortableDirective } from './list-societe/societe-soratble.directive';
import { EditSocieteComponent } from './edit-societe/edit-societe.component';

@NgModule({
    // tslint:disable-next-line: max-line-length
    declarations: [ListSocieteComponent,SocieteSortableDirective, EditSocieteComponent],
    imports: [
      CommonModule,
      FormsModule,
      societeRoutingModule ,
      ReactiveFormsModule,
      UiModule,
      NgbAccordionModule, 
      NgbNavModule, 
      NgbTypeaheadModule, 
      NgbPaginationModule,
      NgbCollapseModule,
      NgbTooltipModule, 
      NgbModalModule,
      ArchwizardModule,
      Ng5SliderModule,
      NgSelectModule,
      DropzoneModule 
      
      
    ]
  })
  export class SocieteeModule { }
  