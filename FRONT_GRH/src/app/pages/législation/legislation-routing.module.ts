import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrilleComponent } from './grille/grille.component';
import { IrppComponent } from './irpp/irpp.component';
import { RegimesComponent } from './regimes/regimes.component';
import { ShiftsComponent } from './shifts/shifts.component';

;
const routes: Routes = [
    {
        path: 'regimes',
        component: RegimesComponent
    },
    {
        path: 'irpp',
        component: IrppComponent
    },
    {
        path: 'shifts',
        component: ShiftsComponent
    },
    {
        path: 'grille',
        component: GrilleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LegislationRoutingModule { }
