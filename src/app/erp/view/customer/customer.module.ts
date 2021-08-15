import { ShareModule } from './../../share/share.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerEntryComponent } from './customer-entry/customer-entry.component';
import { CustomerListComponent } from './customer-list/customer-list.component';



@NgModule({
  declarations: [CustomerEntryComponent,CustomerListComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ShareModule
  ]
})
export class CustomerModule { }
