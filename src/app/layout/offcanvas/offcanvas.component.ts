import { Component, HostListener, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';

import { EventBusService } from 'src/app/shared/event-bus.service';

@Component({
  selector: 'app-offcanvas',
  animations: [
    trigger('animationShowMenu', [
      transition(':enter', [
        style({ left: '-50px', opacity: 0 }),
        animate('.5s', style({ left: '-50px', opacity: 0 })),
        animate('.5s', style({ left: '190px', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('.5s', style({ opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss'],
})
export class OffcanvasComponent implements OnInit {
  width: any;
  show = false;
  alone = true;
  showClose = false;
  showLogoMob = false;

  eventBusSub?: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.onResize();

    var myOffcanvas = document.getElementById('offcanvasScrolling');

    if (myOffcanvas !== null) {
      myOffcanvas.addEventListener('show.bs.offcanvas', () => {
        this.showClose = true;
        this.showLogoMob = true;
        if (this.width >= 768) {
          this.showLogoMob = true;
          this.show = true;
          this.alone = false;
        }
      });

      myOffcanvas.addEventListener('hidden.bs.offcanvas', () => {
        this.showClose = false;
        this.showLogoMob = false;
        if (this.width >= 768) {
          this.showLogoMob = true;
          this.show = false;
          this.alone = true;
        }
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.width = window.innerWidth;
    if (this.width >= 768) {
      this.show = false;
      this.alone = true;
    }
  }
}
