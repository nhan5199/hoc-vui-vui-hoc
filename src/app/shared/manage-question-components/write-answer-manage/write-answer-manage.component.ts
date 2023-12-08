import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-write-answer-manage',
  templateUrl: './write-answer-manage.component.html',
  styleUrls: ['./write-answer-manage.component.css'],
})
export class WriteAnswerManageComponent implements OnInit, OnChanges {
  @Input('question') question: any;
  @Input('onSave') onSave: boolean = false;
  @Output('result') result: EventEmitter<any> = new EventEmitter<any>();
  answer: number = 0;
  questionName: string = '';
  unit: string = '';
  constructor() {}

  ngOnInit(): void {
    this.questionName = this.question.questionName;
    this.answer = this.question.answer;
    this.unit = this.question.unit;
  }

  onChangeAnswer(event: string) {
    this.answer = +event;
    this.question.answer = this.answer;
  }

  onChangeQuestionName(event: string) {
    this.questionName = event;
    this.question.questionName = this.questionName;
  }

  onChangeUnit(event: string) {
    this.unit = event;
    this.question.unit = this.unit;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['onSave']) {
      this.result.emit(this.question);
    }
  }
}
