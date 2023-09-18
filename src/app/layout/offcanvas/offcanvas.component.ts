import { Component, HostListener, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';

import { EventBusService } from 'src/app/shared/event-bus.service';

@Component({
  selector: 'app-offcanvas',
  animations: [
    trigger('animationShowMenu', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('.5s', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('.5s', style({ transform: 'translateX(100%)', opacity: 0 })),
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

  eventBusSub?: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.onResize();

    var myOffcanvas = document.getElementById('offcanvasScrolling');

    if (myOffcanvas !== null) {
      myOffcanvas.addEventListener('show.bs.offcanvas', () => {
        this.showClose = true;
        if (this.width >= 768) {
          this.show = true;
          this.alone = false;
        }
      });

      myOffcanvas.addEventListener('hidden.bs.offcanvas', () => {
        this.showClose = false;
        if (this.width >= 768) {
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
