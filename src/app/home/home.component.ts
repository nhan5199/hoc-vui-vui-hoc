import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  goToMath : string = "/math-menu";
  constructor(
    private readonly titleService:Title
  ) {
    this.titleService.setTitle("Học vui - Vui học");
  }

  ngOnInit(){

  }

}
