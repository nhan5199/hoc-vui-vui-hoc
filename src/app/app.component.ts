import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  allQuestionAnswer: any[] = [];

  ngOnInit(): void {
    fetch(
      'https://hoc-vui-vui-hoc-343f8-default-rtdb.asia-southeast1.firebasedatabase.app/question-answer.json'
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (const element in data) {
          let temp = {
            id: element,
            ...data[element],
          };
          this.allQuestionAnswer.push(temp);
        }
      });
  }
}
