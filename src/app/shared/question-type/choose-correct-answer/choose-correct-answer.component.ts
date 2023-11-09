import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-choose-correct-answer',
  templateUrl: './choose-correct-answer.component.html',
  styleUrls: ['./choose-correct-answer.component.css'],
})
export class ChooseCorrectAnswerComponent implements OnInit {
  @Input('question') question: any;
  @Output() result: EventEmitter<boolean> = new EventEmitter();
  isClick: boolean = false;
  isAnswerWithImage: boolean = false;
  isMediumAnswer: boolean = false;
  isLongAnswer: boolean = false;
  isMultipleChoice: boolean = false;

  multipleAnswer: any[] = [];
  ngOnInit(): void {
    if (this.question.choices[0].name.includes('/assets')) {
      this.isAnswerWithImage = true;
    }

    if (this.question.answer?.length > 1) {
      this.isMultipleChoice = true;
    }
    this.checkLength();
    console.log(this.question);
  }

  checkLength() {
    let maxLength = 0;
    this.question.choices.forEach((choice: any) => {
      if (choice.name.length > maxLength) {
        maxLength = choice.name.length;
      }
    });
    if (maxLength > 20 && maxLength <= 30) {
      this.isMediumAnswer = true;
    } else if (maxLength > 30) {
      this.isLongAnswer = true;
    }
  }

  checkAnswer(chosenAnswer: number, event: any) {
    let parentElement = event.target.parentNode;
    let childElements = [].slice.call(parentElement.children);
    childElements.forEach((element: any) => {
      element.classList.remove('active');
      element.disabled = true;
    });

    event.target.classList.add('active');

    if (this.question.answer == chosenAnswer) {
      event.target.classList.remove('active');
      event.target.classList.add('correct');

      this.result.emit(true);
    } else {
      event.target.classList.remove('active');
      event.target.classList.add('false');
      this.result.emit(false);
    }
  }

  checkMultipleAnswers() {
    let listAnswerDiv = document.querySelector('.list-answers');
    if (listAnswerDiv == null) {
      listAnswerDiv = document.querySelector('.list-long-answers');
    }
    const buttons = listAnswerDiv?.querySelectorAll('button.active');
    if (buttons) {
      buttons.forEach((button: any) => {
        button.classList.remove('active');
      });
    }
    if (
      this.multipleAnswer.every(
        (value, index) => value === this.question.answer[index]
      )
    ) {
      if (buttons) {
        buttons.forEach((button: any) => {
          button.classList.add('correct');
        });
      }
      this.result.emit(true);
    } else {
      this.result.emit(false);

      if (buttons) {
        buttons.forEach((button: any) => {
          button.classList.add('false');
        });
      }
    }
  }

  chooseAnswer(chosenAnswer: number, event: any) {
    if (event.target.classList.contains('active')) {
      event.target.classList.remove('active');
      this.multipleAnswer.splice(this.multipleAnswer.indexOf(chosenAnswer), 1);
    } else {
      event.target.classList.add('active');
      this.multipleAnswer.push(chosenAnswer);
    }
  }
}
