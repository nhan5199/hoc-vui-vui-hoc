import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'right-menu-button',
  templateUrl: './right-menu-button.component.html',
  styleUrls: ['./right-menu-button.component.css']
})
export class RightMenuButtonComponent implements OnInit {

  @Input('imgPath') imgPath : string = "";
  @Input('imgLabel') imgLabel : string = "";

  ngOnInit(): void {

  }
}
