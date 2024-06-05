import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderModule } from './header/header.module';
import { OffcanvasModule } from './offcanvas/offcanvas.module';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncomeExpenseModule } from './income-expense/income-expense.module';
import { InvoicePaymentModule } from './invoice-payment/invoice-payment.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    HeaderModule,
    OffcanvasModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    IncomeExpenseModule,
    InvoicePaymentModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class LayoutModule {}
