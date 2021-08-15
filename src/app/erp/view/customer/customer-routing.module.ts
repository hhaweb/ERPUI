import { CustomerListComponent } from './customer-list/customer-list.component';
import { ERPRoutes } from './../../models/routes/erp-routes';
import { CustomerEntryComponent } from './customer-entry/customer-entry.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'customer-list',
    pathMatch: 'full',
  },
  {
    path: 'customer-entry',
    component: CustomerEntryComponent,
  },
  {
    path: 'customer-list',
    component: CustomerListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
