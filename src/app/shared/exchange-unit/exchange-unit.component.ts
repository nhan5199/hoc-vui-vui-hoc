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
  selector: 'app-exchange-unit',
  templateUrl: './exchange-unit.component.html',
  styleUrls: ['./exchange-unit.component.css'],
})
export class ExchangeUnitComponent implements OnInit, OnChanges {
  @Input('question') question: any;
  @Output('result') result: EventEmitter<any> = new EventEmitter();
  form: any[] = [];

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      this.question.questions.forEach((question: any) => {
        let temp = {
          input: [],
          answer: question.answer,
          checkAnswer: false,
        };

        this.form.push(temp);
      });
    }
  }
  ngOnInit() {}

  onCheckAnswer() {
    let countCorrect = 0;
    this.form.forEach((sentence: any, j: number) => {
      let correctAnswer = 0;
      sentence.input.forEach((input: any, i: number) => {
        if (input == sentence.answer[i]) {
          correctAnswer += 1;
        }
      });
      debugger;
      let element = document.getElementById(j.toString());
      let parent = element?.parentElement?.parentElement;
      if (correctAnswer == sentence.answer.length) {
        countCorrect += 1;
        if (element && parent) {
          parent.style.color = 'rgb(21, 182, 21)';
          element.style.color = 'rgb(21, 182, 21)';
          element.style.borderColor = 'rgb(21, 182, 21)';
        }
      } else {
        if (element && parent) {
          parent.style.color = 'red';
          element.style.color = 'red';
          element.style.borderColor = 'red';
        }
      }
    });

    this.result.emit(
      countCorrect > 0
        ? {
            result: true,
            point: Math.round((countCorrect * 100) / this.form.length),
          }
        : {
            result: false,
            point: 0,
          }
    );
  }
}
