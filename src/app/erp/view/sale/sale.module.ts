import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ShareModule } from './../../share/share.module';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleListComponent } from './sale-list/sale-list.component';
import { AddSaleDialogComponent } from './add-sale-dialog/add-sale-dialog.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { SaleRoutingModule } from './sale-routing.module';
import {InputNumberModule} from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { AddPaymentDialogComponent } from './add-payment-dialog/add-payment-dialog.component';



@NgModule({
  declarations: [SaleListComponent, AddSaleDialogComponent, PaymentListComponent, AddPaymentDialogComponent],
  imports: [
    FormsModule,
    CommonModule,
    SaleRoutingModule,
    CardModule,
    TableModule,
    ShareModule,
    DialogModule,
    CalendarModule,
    PanelModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TooltipModule,
    AutoCompleteModule,
    DropdownModule,
    InputNumberModule,
    CheckboxModule,
    CalendarModule,
    MultiSelectModule
    
  ]
})
export class SaleModule { }
