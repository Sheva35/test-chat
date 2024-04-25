import { Component, Input } from '@angular/core';

export type TMessage = {
  author: string,
  message: string,
}

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() message!: TMessage;
}
