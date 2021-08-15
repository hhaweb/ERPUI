import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { ToastComponent } from './toast/toast.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MessagesModule} from 'primeng/messages';
import {MultiSelectModule} from 'primeng/multiselect';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PanelModule} from 'primeng/panel';
import {ProgressBarModule} from 'primeng/progressbar';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';


@NgModule({
  declarations: [
    ToastComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ButtonModule,
    FontAwesomeModule,
    FormsModule,
    MessagesModule,
    TooltipModule,
    DropdownModule,
    RouterModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
    TableModule,
    ScrollPanelModule,
    CalendarModule,
    PanelModule,
    MultiSelectModule,
    SplitButtonModule,
    CardModule,
    InputTextareaModule,
    ProgressBarModule,
    SelectButtonModule,
    CheckboxModule,
    OverlayPanelModule,
    TabViewModule,
  ],
  exports: [
    ToastComponent,
    LoadingComponent
  ]
})
export class ShareModule { }
