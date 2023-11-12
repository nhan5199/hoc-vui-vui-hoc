import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-list-exercise',
  templateUrl: './list-exercise.component.html',
  styleUrls: ['./list-exercise.component.css'],
})
export class ListExerciseComponent implements OnInit {
  topicName: string | null = '';
  exerciseName: string = 'exercise-123';
  topic: any;
  listExcercise: any[] = [];
  isLoading: boolean = true;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _location: Location,
    private readonly _appService: AppComponent
  ) {}

  ngOnInit(): void {
    this.topicName = this._route.snapshot.paramMap.get('topicName');
    this.getQuestionAnswer();

    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  goToExercise() {
    this._router.navigateByUrl(
      `geometry-menu/${this.topicName}/list-exercise/${this.exerciseName}`
    );
  }

  getQuestionAnswer() {
    if (this._appService.allQuestionAnswer?.length > 0) {
      this.topic = this._appService.allQuestionAnswer.find((x) => {
        x.topicName === this.topicName;
      });
    } else {
      fetch(
        `https://hoc-vui-vui-hoc-343f8-default-rtdb.asia-southeast1.firebasedatabase.app/questionAnswer.json`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.topic = data.find((x: any) => x.topicName === this.topicName);
          this.listExcercise = this.topic.content.listExercises;
        });
    }
  }

  returnToBackPage() {
    this._location.back();
  }
}
