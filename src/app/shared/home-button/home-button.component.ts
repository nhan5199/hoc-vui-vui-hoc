import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-button',
  templateUrl: './home-button.component.html',
  styleUrls: ['./home-button.component.css']
})
export class HomeButtonComponent implements OnInit {

  @Input('link') link : string = "";

  constructor(
    private _router: Router,
  ){

  }

  ngOnInit(): void {

  }

  navigateToMenu(){
    this._router.navigateByUrl(`${this.link}`);
  }
}
