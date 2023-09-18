import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImessageModule } from 'src/app/shared/imessage/imessage.module';
import { HomeModule } from 'src/app/layout/home/home.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    ImessageModule,
  ],
  exports: [RegisterComponent],
})
export class RegisterModule {}
