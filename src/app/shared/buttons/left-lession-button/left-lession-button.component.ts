import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'left-lession-button',
  templateUrl: './left-lession-button.component.html',
  styleUrls: ['./left-lession-button.component.css']
})
export class LeftLessionButtonComponent implements OnInit{
  @Input('imgPath') imgPath : string = "";
  @Input('imgLabel') imgLabel : string = "Lý thuyết";
  @Input('url') url : string = "";
  @Input('name') name : string | null = "";


  constructor(
    private readonly _router : Router,
    private readonly _route : ActivatedRoute
  ){

  }

  ngOnInit(): void {

  }
}
