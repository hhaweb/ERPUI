import { AppMainComponent } from './../../../app.main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { LoginRoutingModule } from './login-routing.module';
import { ForgetPasswordComponent } from './forget-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgetPasswordComponent
  ],
  imports: [
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule,
    MessagesModule,
  ],
  providers: [
    AppMainComponent
  ]
})
export class LoginModule { }
