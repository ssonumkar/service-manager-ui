import { Routes } from '@angular/router';
import { ServiceListComponent } from './features/service-list/service-list';
import { ServiceFormComponent } from './features/service-form/service-form';
import { ResourceFormComponent } from './features/resource-form/resource-form';
import { ResourceListComponent } from './features/resource-list/resource-list';
import { OwnerFormComponent } from './features/owner-form/owner-form';
import { OwnerListComponent } from './features/owner-list/owner-list';
export const routes: Routes = [
    {path: '', component: ServiceListComponent},
    {path: 'service/new', component: ServiceFormComponent},
    {path: 'service/:id/edit', component: ServiceFormComponent},
    {path: 'service/:id/resources', component: ResourceListComponent},
    {path: 'resource/new', component: ResourceFormComponent},
    {path: 'resource/:id/edit', component: ResourceFormComponent},
    {path: 'resource/:id/owners', component: OwnerListComponent},
    {path: 'owner/new', component: OwnerFormComponent},
    {path: 'owner/:id/edit', component: OwnerFormComponent}
];
