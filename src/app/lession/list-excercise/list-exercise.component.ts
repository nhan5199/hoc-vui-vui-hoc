import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-exercise',
  templateUrl: './list-exercise.component.html',
  styleUrls: ['./list-exercise.component.css']
})
export class ListExerciseComponent implements OnInit{

  topicName : string | null = "";
  exerciseName : string = "exercise-123";

  constructor(
    private readonly _router : Router,
    private readonly _route : ActivatedRoute
  ){}

  ngOnInit(): void {
    this.topicName = this._route.snapshot.paramMap.get('topicName');
  }

  goToExercise(){
    this._router.navigateByUrl(`geometry-menu/${this.topicName}/list-exercise/${this.exerciseName}`);
  }
}
