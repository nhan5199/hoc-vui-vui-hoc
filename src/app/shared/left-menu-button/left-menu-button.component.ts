import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'left-menu-button',
  templateUrl: './left-menu-button.component.html',
  styleUrls: ['./left-menu-button.component.css']
})
export class LeftMenuButtonComponent implements OnInit{

  @Input('imgPath') imgPath : string = "";
  @Input('imgLabel') imgLabel : string = "";

  ngOnInit(): void {

  }
}
