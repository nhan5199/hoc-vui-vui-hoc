import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

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
  countWrongAnswers: number = 0;
  countCorrectAnswers: number = 0;

  errorMessage: string = '';
  isDisplayErrorMessage: boolean = false;
  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _appService: AppComponent,
    private readonly _location: Location
  ) {}

  ngOnInit() {
    this.exerciseName = this._route.snapshot.paramMap.get('exerciseName');
    this.topicName = this._route.snapshot.paramMap.get('topicName');
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
          debugger;
          let tempExerciseName = this.exerciseName ? this.exerciseName : '';
          let exercise = this.topic?.content?.listExercises.find(
            (x: any) => this.convertViToEn(x.name) === tempExerciseName
          );
          this.listQuestions = exercise.quests;
        });
    }
  }

  changeQuestion() {
    this.activeQuest += 1;
  }

  checkAnswer(result: any, point: number = 0) {
    if (result?.point && result.result) {
      this.countCorrectAnswers += 1;
      this.point = this.point + result.point;
    } else if (
      (result.result != undefined &&
        result.point != undefined &&
        (result?.result || result?.point != 0)) ||
      result == true
    ) {
      this.countCorrectAnswers += 1;
      this.point = this.point + 100;
    } else if (point != 0) {
      this.countCorrectAnswers += 1;
      this.point = this.point + point;
    } else {
      this.countWrongAnswers += 1;
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

  reloadQuestionAnswer() {
    this.activeQuest = 0;
    window.location.reload();
  }

  returnToBackPage() {
    this.activeQuest = 0;
    this._location.back();
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
    str = str.split(' ').join('-');
    debugger;
    return toUpperCase ? str.toUpperCase() : str;
  }
}
