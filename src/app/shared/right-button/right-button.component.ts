import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'right-button',
  templateUrl: './right-button.component.html',
  styleUrls: ['./right-button.component.css']
})
export class RightButtonComponent implements OnInit{

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
