import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment.prod';

@Component({
  selector: 'app-invoice-payment',
  templateUrl: './invoice-payment.component.html',
  styleUrls: ['./invoice-payment.component.scss']
})
export class InvoicePaymentComponent implements OnInit {
  invoiceForm!: FormGroup;
  paymentForm!: FormGroup;
  months: string[] = [
    '01-01-2024', '01-02-2024', '01-03-2024', '01-04-2024', '01-05-2024',
    '01-06-2024', '01-07-2024', '01-08-2024', '01-09-2024', '01-10-2024',
    '01-11-2024', '01-12-2024'
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      amount: [null, Validators.required],
      issueDate: [null, Validators.required],
      dueDate: [null, Validators.required],
      description: ['', Validators.required]
    });
    this.paymentForm = this.fb.group({
      amount: [null, Validators.required],
      paymentDate: [null, Validators.required],
      paymentMethod: ['', Validators.required]
    });
  }

  onSubmitInvoice(): void {
    if (this.invoiceForm.valid) {
      const invoiceDTO = {
        ...this.invoiceForm.value,
        status: 'pendente'
      };
      const apiUrl = `${environment.ApiUrl}/invoices`;

      this.http.post(apiUrl, invoiceDTO).subscribe({
        next: (response) => {
          this.invoiceForm.reset();
          alert('Invoice added successfully');
        },
        error: (error) => {
          console.error('Error adding invoice', error);
          alert('Error adding invoice');
        }
      });
    }
  }

  onSubmitPayment(): void {
    if (this.paymentForm.valid) {
      const paymentDTO = this.paymentForm.value;
      const apiUrl = `${environment.ApiUrl}/payments`;

      this.http.post(apiUrl, paymentDTO).subscribe({
        next: (response) => {
          this.paymentForm.reset();
          alert('Payment added successfully');
        },
        error: (error) => {
          console.error('Error adding payment', error);
          alert('Error adding payment');
        }
      });
    }
  }
}
