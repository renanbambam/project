import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicePaymentComponent } from './invoice-payment.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InvoicePaymentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    InvoicePaymentComponent
  ]
})
export class InvoicePaymentModule { }
