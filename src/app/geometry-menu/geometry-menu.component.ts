import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geometry-menu',
  templateUrl: './geometry-menu.component.html',
  styleUrls: ['./geometry-menu.component.css']
})
export class GeometryMenuComponent implements OnInit{

  planeGeometryMenu : any[] = [];
  cubeGeometryMenu : any[] = [];

  constructor(

  ){

  }

  ngOnInit(): void {
    this.planeGeometryMenu = [
      {
        label: "Hình tam giác",
        imgPath: "/assets/imgs/home/triangle-button.gif",
        url: ""
      },
      {
        label: "Hình tứ giác",
        imgPath: "/assets/imgs/home/rectangle-button.gif",
        url: ""
      },
      {
        label: "Hình tròn",
        imgPath: "/assets/imgs/home/circle-buton.gif",
        url: ""
      }
    ];

    this.cubeGeometryMenu = [
      {
        label: "Hình hộp chữ nhật",
        imgPath: "/assets/imgs/home/rectangular-button.gif",
        url: ""
      },
      {
        label: "Hình lập phương",
        imgPath: "/assets/imgs/home/cube-button.gif",
        url: ""
      },
      {
        label: "Hình trụ",
        imgPath: "/assets/imgs/home/cylinder-button.gif",
        url: ""
      }
    ];

    console.log(this.planeGeometryMenu.length)
  }


}
