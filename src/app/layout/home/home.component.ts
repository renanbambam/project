import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const labels = moment.monthsShort().filter((m) => m);

    this.canvas1 = document.getElementById('myChart1');
    this.ctx1 = this.canvas1.getContext('2d');

    let myChart1 = new Chart(this.ctx1, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Users',
            data: [
              '66',
              '37',
              '52',
              '79',
              '29',
              '57',
              '13',
              '57',
              '79',
              '29',
              '57',
              '40',
            ],
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

    this.canvas2 = document.getElementById('myChart2');
    this.ctx2 = this.canvas2.getContext('2d');

    let myChart2 = new Chart(this.ctx2, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Companies',
            data: [
              '22',
              '54',
              '56',
              '37',
              '17',
              '30',
              '53',
              '54',
              '65',
              '80',
              '20',
              '30',
            ],
            backgroundColor: 'rgb(98, 147, 255)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 5,
            barThickness: 20,
            maxBarThickness: 20,
          },
          {
            label: 'branchs',
            data: [
              '42',
              '54',
              '16',
              '47',
              '27',
              '80',
              '73',
              '74',
              '85',
              '40',
              '40',
              '70',
            ],
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
}
