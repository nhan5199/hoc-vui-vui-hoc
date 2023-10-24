import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-theory',
  templateUrl: './list-theory.component.html',
  styleUrls: ['./list-theory.component.css'],
})
export class ListTheoryComponent implements OnInit {
  topicName: string | null = '';
  theoryName: string = 'theory-123';

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _location: Location
  ) {}

  ngOnInit(): void {
    this.topicName = this._route.snapshot.paramMap.get('topicName');
  }

  goToVideo() {
    this._router.navigateByUrl(
      `geometry-menu/${this.topicName}/list-theory/${this.theoryName}/video`
    );
  }

  goToOnlineLecture() {
    this._router.navigateByUrl(
      `geometry-menu/${this.topicName}/list-theory/${this.theoryName}/lecture`
    );
  }

  gotoMath() {
    this._router.navigateByUrl(
      `geometry-menu/${this.topicName}/list-theory/${this.theoryName}/math`
    );
  }

  gotoFlipBook() {
    this._router.navigateByUrl(
      `geometry-menu/${this.topicName}/list-theory/${this.theoryName}/book`
    );
  }

  returnToBackPage() {
    this._location.back();
  }
}
