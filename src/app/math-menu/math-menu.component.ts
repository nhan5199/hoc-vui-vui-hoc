import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-math-menu',
  templateUrl: './math-menu.component.html',
  styleUrls: ['./math-menu.component.css'],
})
export class MathMenuComponent implements OnInit {
  geometryButtonPath: string = '/assets/imgs/home/geometry_button.gif';
  geometryButtonLabel: string = 'Hình học';
  geometryUrl: string = '/geometry-menu';
  algrebraButtonPath: string = '/assets/imgs/home/algebra_button.gif';
  algrebraButtonLabel: string = 'Đại lượng';
  algebraUrl: string = '';
  constructor(private readonly _location: Location) {}

  ngOnInit(): void {}

  goToGeometryMenu() {}

  returnToBackPage() {
    this._location.back();
  }
}
