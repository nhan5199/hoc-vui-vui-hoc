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
  selector: 'app-choose-correct-answer-manage',
  templateUrl: './choose-correct-answer-manage.component.html',
  styleUrls: ['./choose-correct-answer-manage.component.css'],
})
export class ChooseCorrectAnswerManageComponent implements OnInit, OnChanges {
  @Input('question') question: any;
  @Input('onSave') onSave: boolean = false;
  @Output('result') result: EventEmitter<any> = new EventEmitter<any>();
  isLongAnswer: boolean = false;
  isMediumAnswer: boolean = true;
  isMultipleChoice: boolean = false;
  isAnswerWithImage: boolean = false;

  answer: number = 0;
  questionName: string = '';

  constructor() {}

  ngOnInit(): void {
    this.questionName = this.question.questionName;
    this.answer = this.question.answer;

    this.question.choices.forEach((choice: any) => {
      if (choice.name.length > 30) {
        this.isMediumAnswer = false;
        this.isLongAnswer = true;
      }
    });
  }

  chooseAnswer(value: any, event: any) {}

  checkAnswer(value: any, event: any) {}

  changeAnswer(index: any) {
    this.answer = index + 1;
    this.question.answer = this.answer;
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
