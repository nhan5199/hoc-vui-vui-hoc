import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-yes-no-question-manage',
  templateUrl: './yes-no-question-manage.component.html',
  styleUrls: ['./yes-no-question-manage.component.css'],
})
export class YesNoQuestionManageComponent implements OnInit, OnChanges {
  @Input('question') question: any;
  @Input('onSave') onSave: boolean = false;
  @Output('result') result: EventEmitter<any> = new EventEmitter<any>();
  questionName: string = '';
  constructor() {}

  ngOnInit(): void {
    this.questionName = this.question.questionName;
  }

  changeAnswer(index: number, event: any, value: number) {
    let divValue = event.target.parentNode;
    Array.from(divValue.children).forEach((button: any) => {
      if (button.classList.contains('correct')) {
        button.classList.remove('correct');
      }
      if (button.classList.contains('false')) {
        button.classList.remove('false');
      }
    });

    this.question.choices[index].answer = value;
  }

  onChangeQuestionName(event: string) {
    this.questionName = event;
    this.question.questionName = this.questionName;
  }

  onChangeAnswerName(index: number, event: string) {
    this.question.choices[index].name = event;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['onSave']) {
      this.result.emit(this.question);
    }
  }
}
