import { ClosingListComponent } from './closing-list/closing-list.component';
import { PurchasePaymentList } from './../../models/purchase/purchase';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasePaymentListComponent } from './purchase-payment-list/purchase-payment-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'purchase-list',
    pathMatch: 'full',
  },
  {
    path: 'purchase-list',
    component: PurchaseListComponent
  },
  {
    path: 'purchase-payment-list',
    component: PurchasePaymentListComponent
  },
  {
    path: 'closing-list',
    component: ClosingListComponent
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseRoutingModule { }
