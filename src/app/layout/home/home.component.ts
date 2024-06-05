import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  canvas1: any;
  ctx1: any;

  canvas2: any;
  ctx2: any;

  canvas3: any;
  ctx3: any;

  private apiUrlIncomes = 'http://localhost:8080/incomes';
  private apiUrlExpenses = 'http://localhost:8080/expenses';
  private apiUrlPayments = 'http://localhost:8080/payments';
  private apiUrlInvoices = 'http://localhost:8080/invoices';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.setupCharts();
  }

  setupCharts() {
    this.http.get<any[]>(this.apiUrlIncomes).subscribe(incomesData => {
      this.http.get<any[]>(this.apiUrlExpenses).subscribe(expensesData => {
        const incomeLabels = incomesData.map(item => item.dayDate);
        const expenseLabels = expensesData.map(item => item.date);

        const combinedLabels = [...new Set([...incomeLabels, ...expenseLabels])].sort();

        const incomeMap = new Map(incomesData.map(item => [item.dayDate, item.amount]));
        const expenseMap = new Map(expensesData.map(item => [item.date, item.amount]));

        const incomeDataset = combinedLabels.map(label => incomeMap.get(label) || 0);
        const expenseDataset = combinedLabels.map(label => expenseMap.get(label) || 0);
        const differenceDataset = combinedLabels.map(label => (incomeMap.get(label) || 0) - (expenseMap.get(label) || 0));

        this.createChart1(combinedLabels, differenceDataset);
        this.createChart2(combinedLabels, incomeDataset, expenseDataset);
      });
    });

    this.setupChart3();
  }

  setupChart3() {
    this.http.get<any[]>(this.apiUrlPayments).subscribe(paymentsData => {
      this.http.get<any[]>(this.apiUrlInvoices).subscribe(invoicesData => {
        const paymentMap = new Map(paymentsData.map(item => [item.invoiceId, item.amount]));
  
        const invoiceLabels = invoicesData.map(item => item.status === 'realizado' ? item.dueDate : item.issueDate);
  
        const barDataset = invoicesData.map(item => {
          console.log(item)
          const payment = paymentMap.get(item.paymentId);
          return item.status === 'realizado' ? payment || 0 : 0;
        });
        console.log(barDataset)
  
        const lineDataset = invoicesData.map(item => item.amount);
        this.createChart3(invoiceLabels, barDataset, lineDataset);
      });
    });
  }
  
  
  
  

  createChart1(labels: string[], data: number[]) {
    this.canvas1 = document.getElementById('myChart1');
    this.ctx1 = this.canvas1.getContext('2d');

    new Chart(this.ctx1, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Diferença (Incomes - Expenses)',
            data: data,
            tension: 0.3,
            pointHitRadius: 100,
            backgroundColor: 'rgba(85, 166, 255, 1)',
            borderColor: 'rgba(85, 166, 255, 1)',
            pointStyle: false,
            pointBackgroundColor: 'rgba(85, 166, 255, 0)',
            borderJoinStyle: 'round',
            borderWidth: 1,
            fill: {
              target: 'origin',
              above: 'rgba(85, 166, 255, .1)',
              below: 'rgba(85, 166, 255, .1)',
            },
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  createChart2(labels: string[], incomeData: number[], expenseData: number[]) {
    this.canvas2 = document.getElementById('myChart2');
    this.ctx2 = this.canvas2.getContext('2d');

    new Chart(this.ctx2, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Entrada',
            data: incomeData,
            backgroundColor: 'rgb(98, 147, 255)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 5,
            barThickness: 20,
            maxBarThickness: 20,
          },
          {
            label: 'Despesas',
            data: expenseData,
            backgroundColor: 'rgb(62, 95, 167)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 5,
            barThickness: 20,
            maxBarThickness: 20,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  createChart3(labels: string[], barData: number[], lineData: number[]) {
    this.canvas3 = document.getElementById('myChart3');
    this.ctx3 = this.canvas3.getContext('2d');

    new Chart(this.ctx3, {
      type: 'scatter',
      data: {
        labels: labels,
        datasets: [
          {
            type: 'bar',
            label: 'Valor da fatura',
            data: lineData,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(85, 166, 255, .1)',
          },
          {
            type: 'line',
            label: 'Valor pago',
            data: barData,
            fill: false,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgb(54, 162, 235)'
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
