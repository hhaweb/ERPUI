import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list/item-list.component';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { ItemRoutingModule } from './item-routing.module';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import { ShareModule } from '../../share/share.module';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ItemListComponent, AddItemDialogComponent],
  imports: [
    FormsModule,
    CommonModule,
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
export class ItemModule { }
