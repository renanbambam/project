import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeExpenseComponent } from './income-expense.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    IncomeExpenseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    IncomeExpenseComponent
  ]
})
export class IncomeExpenseModule { }
