import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-imessage',
  templateUrl: './imessage.component.html',
  styleUrls: ['./imessage.component.scss'],
})
export class ImessageComponent {
  @Input() text = '';
}
