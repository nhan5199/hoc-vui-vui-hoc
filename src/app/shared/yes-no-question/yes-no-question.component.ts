import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-yes-no-question',
  templateUrl: './yes-no-question.component.html',
  styleUrls: ['./yes-no-question.component.css']
})
export class YesNoQuestionComponent implements OnInit, OnChanges{
  @Input('question') question : any;
  @Output() result : EventEmitter<any> = new EventEmitter();
  listAnswer : any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']){
      this.question.choices.forEach((choice : any) => {
        this.listAnswer.push({
          choice: -1,
          answer: choice.answer
        })
      });
    }
  }

  ngOnInit(): void {

  }

  saveAnswer(i : number, event : any){
    let parentElement = event.target.parentNode;
    let childElements = [].slice.call(parentElement.children);
    childElements.forEach((element : any) => {
      element.classList.remove("active");
    });
    event.target.classList.add("active");

    this.listAnswer[i].choice = event.target.innerHTML == "Đ" ? 1 : 0;
  }

  onCheckAnswer(){
    let choseAnswers = this.listAnswer.filter(x => x.choice != -1);
    if (choseAnswers?.length < this.question?.choices.length){
      this.result.emit({
        result: false,
        message: "Có đáp án chưa được chọn!"
      });
      return;
    }

    let result : boolean[] = [];
    let childrenNodes = [].slice.call(document.getElementsByClassName("list-answers")[0].children);
    childrenNodes .forEach((answers : any, i) => {
      [].slice.call(answers.children[1].children).forEach((button : any) => {
        if (button.classList.contains("active")){
          button.classList.remove("active");
          button.disabled = true;
          if (this.listAnswer[i].choice == this.listAnswer[i].answer){
            button.classList.add("correct");
            result.push(true);
          }
          else {
            button.classList.add("false");
            result.push(false);
          }
        }
      })
    });

    if (result.filter(x => x == true)?.length == this.listAnswer?.length){
      this.result.emit({
        result: true,
        message: ""
      })
    }
    else{
      this.result.emit({
        result: false,
        message: ""
      })
    }
  }
}
