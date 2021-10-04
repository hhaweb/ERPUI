import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TestComponent } from './test.component';
import { TableModule } from 'primeng/table';
import { ShareModule } from '../../share/share.module';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [HomeComponent, TestComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    CardModule,
    ShareModule,
    DialogModule,
    PanelModule,
    ButtonModule,
    TooltipModule,
    DropdownModule,
    CheckboxModule,
  ]
})
export class HomeModule { }
