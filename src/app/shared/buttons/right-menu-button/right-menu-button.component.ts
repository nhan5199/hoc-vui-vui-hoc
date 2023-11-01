import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'right-menu-button',
  templateUrl: './right-menu-button.component.html',
  styleUrls: ['./right-menu-button.component.css']
})
export class RightMenuButtonComponent implements OnInit {

  @Input('imgPath') imgPath : string = "";
  @Input('imgLabel') imgLabel : string = "";
  @Input('url') url : string = "";


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
