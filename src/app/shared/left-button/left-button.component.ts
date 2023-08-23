import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'left-button',
  templateUrl: './left-button.component.html',
  styleUrls: ['./left-button.component.css']
})
export class LeftButtonComponent implements OnInit{
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
