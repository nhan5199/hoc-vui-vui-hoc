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
  selector: 'app-write-text-answer-manage',
  templateUrl: './write-text-answer-manage.component.html',
  styleUrls: ['./write-text-answer-manage.component.css'],
})
export class WriteTextAnswerManageComponent implements OnInit, OnChanges {
  @Input('question') question: any;
  @Input('onSave') onSave: boolean = false;
  @Output('result') result: EventEmitter<any> = new EventEmitter<any>();
  questionName: string = '';
  answer: string = '';
  unit: string = '';
  constructor() {}

  ngOnInit(): void {
    this.questionName = this.question.questionName;
    this.answer = this.question.answer;
    this.unit = this.question.unit;
  }

  onChangeQuestionName(event: string) {
    this.questionName = event;
    this.question.questionName = this.questionName;
  }

  onChangeAnswer(event: string) {
    this.answer = event;
    this.question.answer = this.answer;
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
