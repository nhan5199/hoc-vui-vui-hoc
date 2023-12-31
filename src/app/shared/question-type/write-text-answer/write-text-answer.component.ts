import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-write-text-answer',
  templateUrl: './write-text-answer.component.html',
  styleUrls: ['./write-text-answer.component.css'],
})
export class WriteTextAnswerComponent implements OnInit {
  @Input('question') question: any;
  @Output('result') result: EventEmitter<any> = new EventEmitter();
  answer: string[] = [];

  ngOnInit() {
    this.answer = this.createArrayWithNullElements(
      this.question.questionName.length
    );
  }

  createArrayWithNullElements(count: number) {
    return new Array(count).fill(null);
  }

  convertViToEn(str: string, toUpperCase: boolean = false) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư

    return toUpperCase ? str.toUpperCase() : str;
  }

  onCheckAnswer() {
    let button = document.getElementById('checkButton') as HTMLButtonElement;
    if (button) button.disabled = true;

    let index = 0;
    let countCorrect = 0;
    this.answer.forEach((answer: any) => {
      let id = 'answer-' + index;
      const inputElement = document.getElementById(id);
      if (inputElement) {
        if (
          answer === this.question.answer[index] ||
          answer?.toUpperCase() === this.question.answer[index]
        ) {
          inputElement.style.color = 'green';
          inputElement.style.borderColor = 'green';
          countCorrect++;
        } else {
          inputElement.style.color = 'red';
          inputElement.style.borderColor = 'red';
        }
      }
      index++;
    });

    if (countCorrect == this.question.answer.length) {
      this.result.emit({
        result: true,
        point: 100,
      });
    } else {
      this.result.emit({
        result: false,
        point: Math.round((100 / this.question.answer.length) * countCorrect),
      });
    }
  }
}
