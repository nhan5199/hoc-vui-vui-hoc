import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-exchange-unit',
  templateUrl: './exchange-unit.component.html',
  styleUrls: ['./exchange-unit.component.css'],
})
export class ExchangeUnitComponent implements OnInit, OnChanges {
  @Input('question') question: any;
  @Output('result') result: EventEmitter<any> = new EventEmitter();
  form: any[] = [];
  input: number[] = [];
  numberCount: number = 0;
  constructor(private readonly _fb: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      this.question.questions.forEach((question: any) => {
        let temp = this._fb.group({
          input: [''],
          answer: [question.answer],
          checkAnswer: [false],
        });

        this.form.push(temp);
      });

      this.input = new Array<number>(this.form.length).fill(0);
    }
  }
  ngOnInit() {}

  onCheckAnswer() {
    console.log('data: ', this.input);
    // this.form.forEach((form: any) => {
    //   console.log('data: ', form.get('input').value);
    // });
  }

  getNumber() {
    console.log(1);
    this.numberCount += 1;
    return this.numberCount;
  }
}
