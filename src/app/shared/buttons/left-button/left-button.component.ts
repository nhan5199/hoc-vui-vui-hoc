import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'left-button',
  templateUrl: './left-button.component.html',
  styleUrls: ['./left-button.component.css']
})
export class LeftButtonComponent implements OnInit{
  @Input('imgPath') imgPath : string = "";
  @Input('imgLabel') imgLabel : string = "";
  @Input('name') name : string = "";


  constructor(
    private readonly _router : Router,
    private readonly _route : ActivatedRoute
  ){

  }

  ngOnInit(): void {

  }

  goToPage(){
    this._router.navigateByUrl(`geometry-menu/${this.name}`);
  }

}
