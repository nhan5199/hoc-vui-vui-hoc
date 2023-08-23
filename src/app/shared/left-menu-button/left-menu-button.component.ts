import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'left-menu-button',
  templateUrl: './left-menu-button.component.html',
  styleUrls: ['./left-menu-button.component.css']
})
export class LeftMenuButtonComponent implements OnInit{

  @Input('imgPath') imgPath : string = "";
  @Input('imgLabel') imgLabel : string = "";
  @Input('url') url : string = "";
  @Input('type') type : number = 1;


  constructor(
    private readonly _router : Router
  ){

  }

  ngOnInit(): void {

  }

  goToPage(){
    this._router.navigateByUrl(this.url);
  }
}
