import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css'],
})
export class ConfirmPopupComponent implements OnInit {
  @Input('isDisplay') isDisplay: boolean = false;
  @Output('result')
  result: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onConfirm(result: boolean) {
    this.result.emit(result);
  }
}
