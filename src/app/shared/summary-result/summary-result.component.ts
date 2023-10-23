import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-summary-result',
  templateUrl: './summary-result.component.html',
  styleUrls: ['./summary-result.component.css'],
})
export class SummaryResultComponent implements OnInit {
  @Input('point') point: number = 0;
  @Input('correctAnswers') rightAnswer: number = 0;
  @Input('wrongAnswers') wrongAnswer: number = 0;
  constructor(private readonly _location: Location) {}

  ngOnInit(): void {}

  reloadPage() {
    window.location.reload();
  }

  returnToMenu() {
    this._location.back();
  }
}
