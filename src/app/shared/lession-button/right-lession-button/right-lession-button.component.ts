import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'right-lession-button',
  templateUrl: './right-lession-button.component.html',
  styleUrls: ['./right-lession-button.component.css']
})
export class RightLessionButtonComponent implements OnInit{

  @Input('imgPath') imgPath : string = "";
  @Input('imgLabel') imgLabel : string = "Bài tập";
  @Input('url') url : string = "";
  @Input('name') name : string | null = "";


  constructor(
    private readonly _router : Router
  ){

  }

  ngOnInit(): void {

  }

}
