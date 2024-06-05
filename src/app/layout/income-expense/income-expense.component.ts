import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment.prod';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.scss']
})
export class IncomeExpenseComponent implements OnInit {
  incomeForm!: FormGroup;
  expenseForm!: FormGroup;
  months: string[] = [
    '01-01-2024', '01-02-2024', '01-03-2024', '01-04-2024', '01-05-2024',
    '01-06-2024', '01-07-2024', '01-08-2024', '01-09-2024', '01-10-2024',
    '01-11-2024', '01-12-2024'
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      amount: [null, Validators.required],
      dayDate: [null, Validators.required],
      description: ['', Validators.required]
    });
    this.expenseForm = this.fb.group({
      amount: [null, Validators.required],
      date: [null, Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmitIncome(): void {
    if (this.incomeForm.valid) {
      const incomeDTO = this.incomeForm.value;
      const apiUrl = `${environment.ApiUrl}/incomes`;

      this.http.post(apiUrl, incomeDTO).subscribe({
        next: (response) => {
          this.incomeForm.reset();
          alert('Income added successfully');
        },
        error: (error) => {
          console.error('Error adding income', error);
          alert('Error adding income');
        }
      });
    }
  }

  onSubmitExpense() {
    if (this.expenseForm.valid) {
      const expenseDTO = this.expenseForm.value;
      const apiUrl = `${environment.ApiUrl}/expenses`;

      this.http.post(apiUrl, expenseDTO).subscribe({
        next: (response) => {
          this.expenseForm.reset();
          alert('Expense added successfully');
        },
        error: (error) => {
          console.error('Error adding expense', error);
          alert('Error adding expense');
        }
      });
    }
  }
}
