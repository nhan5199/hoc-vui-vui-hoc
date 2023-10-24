import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
})
export class TopicComponent implements OnInit {
  theoryImgPath: string = '';
  theoryUrl: string = '';
  theoryLabel: string = 'Lý thuyết';

  exerciseImgPath: string = '';
  exerciseUrl: string = '';
  exerciseLabel: string = 'Bài tập';

  topicName: string | null = '';

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _location: Location
  ) {}

  ngOnInit(): void {
    this.topicName = this._route.snapshot.paramMap.get('topicName');
  }

  returnToBackPage() {
    this._location.back();
  }
}
