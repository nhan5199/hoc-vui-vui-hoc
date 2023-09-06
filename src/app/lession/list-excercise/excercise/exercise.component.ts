import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit{
  exerciseName : string | null = "";

  constructor(
    private readonly _route : ActivatedRoute,
    private readonly _router : Router
  ){

  }

  ngOnInit(){
    this.exerciseName = this._route.snapshot.paramMap.get('exerciseName');
    this.exerciseName = "hình tam giác"
  }
}
