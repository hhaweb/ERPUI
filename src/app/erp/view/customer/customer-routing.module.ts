import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'customer-list',
    pathMatch: 'full',
  },
  {
    path: 'customer-list',
    component: CustomerListComponent,
  },
  {
    path: 'supplier-list',
    component: SupplierListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
