import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CongesComponent } from './conges/conges.component';

import { DepartementComponent } from './departement/departement.component';
import { PretsComponent } from './prets/prets.component';
import { PrimesComponent } from './primes/primes.component';
import { StatuesComponent } from './statues/statues.component';
const routes: Routes = [
    {
        path: 'départements',
        component: DepartementComponent
    },
    {
        path: 'prêts',
        component: PretsComponent
    },
    {
        path: 'primes',
        component: PrimesComponent
    },
    {
        path: 'statues',
        component: StatuesComponent
    },
    {
        path: 'congés',
        component: CongesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
