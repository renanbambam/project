import { Component, OnInit } from '@angular/core';
import { EventBusService } from '../shared/event-bus.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  content?: string;

  constructor(private eventBusService: EventBusService) {}

  ngOnInit(): void {
    // .subscribe(
    //   data => { ... },
    //   err => {
    //     this.content = err.error.message || err.error || err.message;
    //     if (err.status === 403)
    //       this.eventBusService.emit(new EventData('logout', null));
    //   }
    // );
  }
}
