import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/data';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  theoryImgPath : string = "";
  theoryUrl : string = "";
  theoryLabel : string = "Lý thuyết";

  exerciseImgPath : string = "";
  exerciseUrl : string = "";
  exerciseLabel : string = "Bài tập";

  topicName : string | null = "";

  constructor(
    private readonly _router : Router,
    private readonly _route : ActivatedRoute,
    private readonly _data : DataService
  ){

  }

  ngOnInit(): void {
    this.topicName = this._route.snapshot.paramMap.get('topicName');
  }
}
