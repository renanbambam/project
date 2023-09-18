import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from '../../layout/home/home.module';
import { ImessageModule } from '../../shared/imessage/imessage.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    ImessageModule,
  ],
  exports: [LoginComponent],
})
export class LoginModule {}
