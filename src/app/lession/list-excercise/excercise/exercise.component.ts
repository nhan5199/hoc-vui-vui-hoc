import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Event } from '@angular/router';
import { DataService } from 'src/app/shared/data';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit{
  exerciseName : string | null = "";
  topicName : string | null = "";
  listQuestions : any;
  topic : any;
  activeQuest : number = 0
  point : number = 0;

  errorMessage : string = "";
  isDisplayErrorMessage : boolean = false;
  constructor(
    private readonly _route : ActivatedRoute,
    private readonly _dataService : DataService
  ){

  }

  ngOnInit(){
    this.exerciseName = this._route.snapshot.paramMap.get('exerciseName');
    this.topicName = this._route.snapshot.paramMap.get('topicName');
    this.exerciseName = "exercise-1"

    this.topic = this._dataService.topic.find(x => x.topicName == this.topicName);
    this.listQuestions = this.topic.content.listExercises.find((x : any) => x.name == this.exerciseName).quests;
  }

  changeQuestion(){
    this.activeQuest += 3 ;
  }

  checkAnswer(result : any){
    if (result){
      this.point += 100;
    }

    setTimeout(() => {
      this.changeQuestion();
    }, 2000);
  }

  //Chưa chọn đủ đáp án cho câu hỏi Yes/No
  validateAnswers(event : any){
    if (event?.result == false && event?.message?.length > 0){
      this.errorMessage = event?.message;
      this.isDisplayErrorMessage = true;
      setTimeout(() => {
        this.errorMessage = "";
        this.isDisplayErrorMessage = false;
      }, 3000);
    }
    else{
      this.checkAnswer(event.result);
    }

  }
  onCheckAnswer(){

  }
}
