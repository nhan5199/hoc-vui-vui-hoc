import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-answer-point',
  templateUrl: './answer-point.component.html',
  styleUrls: ['./answer-point.component.css']
})
export class AnswerPointComponent implements OnInit, OnChanges{

  @Input('pointPlus') pointPlus : number = 0;
  point : number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pointPlus']){
      this.pointPlus -= this.point;
      setTimeout(() => {
        this.point += this.pointPlus;
        this.pointPlus = 0;
      }, 1000);
    }
  }
  ngOnInit(): void {

  }
}
