import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSocieteComponent } from './list-societe/list-societe.component';
const routes: Routes = [
    {
        path: 'list',
        component: ListSocieteComponent
    },
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class societeRoutingModule { }