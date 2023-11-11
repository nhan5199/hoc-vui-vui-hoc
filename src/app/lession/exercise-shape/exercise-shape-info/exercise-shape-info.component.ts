import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-exercise-shape-info',
  templateUrl: './exercise-shape-info.component.html',
  styleUrls: ['./exercise-shape-info.component.css'],
})
export class ExerciseShapeInfoComponent {
  @Input('isDispayInfo') isDisplayInfo: boolean = false;
  @Output('closeInfoPopup') closeInfoPopup: EventEmitter<boolean> =
    new EventEmitter();

  onClosePopup() {
    this.closeInfoPopup.emit(true);
  }
}
