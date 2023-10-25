import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geometry-menu',
  templateUrl: './geometry-menu.component.html',
  styleUrls: ['./geometry-menu.component.css'],
})
export class GeometryMenuComponent implements OnInit {
  planeGeometryMenu: any[] = [];
  cubeGeometryMenu: any[] = [];

  constructor(private readonly _location: Location) {}

  ngOnInit(): void {
    this.planeGeometryMenu = [
      {
        label: 'Hình tam giác',
        imgPath: '/assets/imgs/home/triangle-button.gif',
        name: 'triangle',
      },
      {
        label: 'Hình thang',
        imgPath: '/assets/imgs/home/rectangle-button.gif',
        name: 'trapezoid',
      },
      {
        label: 'Hình tròn',
        imgPath: '/assets/imgs/home/circle-buton.gif',
        name: 'circle',
      },
    ];

    this.cubeGeometryMenu = [
      {
        label: 'Hình hộp chữ nhật',
        imgPath: '/assets/imgs/home/rectangular-button.gif',
        name: 'rectangular',
      },
      {
        label: 'Hình lập phương',
        imgPath: '/assets/imgs/home/cube-button.gif',
        name: 'cube',
      },
    ];
  }

  returnToBackPage() {
    this._location.back();
  }
}
