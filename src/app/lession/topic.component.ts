import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
})
export class TopicComponent implements OnInit, AfterViewInit {
  theoryImgPath: string = '';
  theoryUrl: string = '';
  theoryLabel: string = 'Lý thuyết';

  exerciseImgPath: string = '';
  exerciseUrl: string = '';
  exerciseLabel: string = 'Bài tập';

  topicName: string | null = '';
  isLoading: boolean = true;
  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _location: Location
  ) {}

  ngOnInit(): void {
    this.topicName = this._route.snapshot.paramMap.get('topicName');
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  returnToBackPage() {
    this._location.back();
  }
}
