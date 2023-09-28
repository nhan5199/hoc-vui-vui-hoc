import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-choose-correct-answer',
  templateUrl: './choose-correct-answer.component.html',
  styleUrls: ['./choose-correct-answer.component.css']
})
export class ChooseCorrectAnswerComponent implements OnInit{

  @Input('question') question : any;
  @Output() result : EventEmitter<boolean> = new EventEmitter();
  isClick : boolean = false;

  ngOnInit(): void {
  }

  checkAnswer(chosenAnswer : number, event : any){
    let parentElement = event.target.parentNode;
    let childElements = [].slice.call(parentElement.children);
    childElements.forEach((element : any) => {
      element.classList.remove("active");
      element.disabled = true;
    });

    event.target.classList.add("active");

    if (this.question.answer == chosenAnswer){
      event.target.classList.remove("active");
      event.target.classList.add("correct");

      this.result.emit(true);
    }
    else{
      event.target.classList.remove("active");
      event.target.classList.add("false");
      this.result.emit(false);
    }


  }
}
