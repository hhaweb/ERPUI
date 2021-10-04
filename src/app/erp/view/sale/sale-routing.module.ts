import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleListComponent } from './sale-list/sale-list.component';
import { PaymentListComponent } from './payment-list/payment-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sale-list',
    pathMatch: 'full',
  },
  {
    path: 'sale-list',
    component: SaleListComponent
  },
  {
    path: 'payment-list',
    component: PaymentListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleRoutingModule { }
