import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
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
import { PurchaseRoutingModule } from './purchase-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { AddPurchaseDialogComponent } from './add-purchase-dialog/add-purchase-dialog.component';
import { PurchasePaymentListComponent } from './purchase-payment-list/purchase-payment-list.component';
import { AddPurchasePaymentDialogComponent } from './add-purchase-payment-dialog/add-purchase-payment-dialog.component';
import { ClosingListComponent } from './closing-list/closing-list.component';



@NgModule({
  declarations: [PurchaseListComponent, AddPurchaseDialogComponent, PurchasePaymentListComponent, AddPurchasePaymentDialogComponent, ClosingListComponent],
  imports: [
    FormsModule,
    CommonModule,
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
    MultiSelectModule,
    PurchaseRoutingModule,
  ]
})
export class PurchaseModule { }
