import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ItemRoutingModule } from './../item/item-routing.module';
import { FormsModule } from '@angular/forms';
import { ShareModule } from './../../share/share.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddCustomerDialogComponent } from './add-customer-dialog/add-customer-dialog.component';;



@NgModule({
  declarations: [CustomerListComponent, AddCustomerDialogComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ShareModule,
    FormsModule,
    ItemRoutingModule,
    CardModule,
    TableModule,
    ShareModule,
    DialogModule,
    CalendarModule,
    PanelModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TooltipModule

  ]
})
export class CustomerModule { }
