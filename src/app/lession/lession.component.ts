import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/data';

@Component({
  selector: 'app-lession',
  templateUrl: './lession.component.html',
  styleUrls: ['./lession.component.css']
})
export class LessionComponent implements OnInit {
  theoryImgPath : string = "";
  theoryUrl : string = "";
  theoryLabel : string = "Lý thuyết";

  exerciseImgPath : string = "";
  exerciseUrl : string = "";
  exerciseLabel : string = "Bài tập";

  lessionName : string | null = "";

  constructor(
    private readonly _router : Router,
    private readonly _route : ActivatedRoute,
    private readonly _data : DataService
  ){

  }

  ngOnInit(): void {
    this.lessionName = this._route.snapshot.paramMap.get('lessionName');
  }
}
