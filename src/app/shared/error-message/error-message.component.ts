import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
})
export class ErrorMessageComponent implements OnInit, OnChanges {
  @Input('display') display: boolean = false;
  @Input('message') message: string = '';
  @Input('code') code: number = 200;
  displayTime: number = 3;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['display']) {
      this.displayTime = 3;
      if (this.display) {
        setTimeout(() => {
          this.displayTime = 0;
        }, 3000);
      }
    }
  }
  ngOnInit(): void {}

  closeMessage() {
    this.displayTime = 0;
  }
}
