import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { DataService } from 'src/app/shared/data';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  exerciseName: string | null = '';
  topicName: string | null = '';
  listQuestions: any;
  topic: any;
  activeQuest: number = 0;
  point: number = 0;

  errorMessage: string = '';
  isDisplayErrorMessage: boolean = false;
  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _dataService: DataService,
    private readonly _appService: AppComponent
  ) {}

  ngOnInit() {
    this.exerciseName = this._route.snapshot.paramMap.get('exerciseName');
    this.topicName = this._route.snapshot.paramMap.get('topicName');
    // this.exerciseName = 'exercise-1';
    this.getQuestionAnswer();
  }

  getQuestionAnswer() {
    if (this._appService.allQuestionAnswer?.length > 0) {
      this.topic = this._appService.allQuestionAnswer.find(
        (x) => x.topicName === this.topicName
      );

      this.listQuestions = this.topic?.content?.listExercises[0]?.quests;
    } else {
      fetch(
        `https://hoc-vui-vui-hoc-343f8-default-rtdb.asia-southeast1.firebasedatabase.app/questionAnswer.json`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.topic = data.find((x: any) => x.topicName === this.topicName);
          this.listQuestions = this.topic?.content?.listExercises[0]?.quests;
        });
    }
  }

  changeQuestion() {
    this.activeQuest += 1;
  }

  checkAnswer(result: any, point: number = 0) {
    if (result?.point && result.result) {
      this.point = this.point + result.point;
    } else if (
      result.result != undefined &&
      result.point != undefined &&
      (result?.result || result?.point != 0)
    ) {
      this.point = this.point + 100;
    } else if (point != 0) {
      this.point = this.point + point;
    }

    setTimeout(() => {
      this.changeQuestion();
    }, 2000);
  }

  //Chưa chọn đủ đáp án cho câu hỏi Yes/No
  validateAnswers(event: any) {
    if (event?.result == false && event?.message?.length > 0) {
      this.errorMessage = event?.message;
      this.isDisplayErrorMessage = true;
      setTimeout(() => {
        this.errorMessage = '';
        this.isDisplayErrorMessage = false;
      }, 3000);
    } else {
      this.checkAnswer(event.result, event.point);
    }
  }

  onCheckAnswer() {}

  getData() {
    console.log(this._appService.allQuestionAnswer);
  }
}
