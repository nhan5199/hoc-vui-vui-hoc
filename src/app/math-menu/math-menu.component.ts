import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-math-menu',
  templateUrl: './math-menu.component.html',
  styleUrls: ['./math-menu.component.css']
})
export class MathMenuComponent implements OnInit {

  geometryButtonPath : string = "/assets/imgs/home/geometry_button.gif";
  geometryButtonLabel : string = "Hình học";
  algrebraButtonPath : string = "/assets/imgs/home/algebra_button.gif";
  algrebraButtonLabel : string = "Đại số";

  constructor(
    private readonly _router : Router
  ){
  }

  ngOnInit(): void {

  }

}
