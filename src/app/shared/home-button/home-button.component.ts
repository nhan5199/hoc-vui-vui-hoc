import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-button',
  templateUrl: './home-button.component.html',
  styleUrls: ['./home-button.component.css'],
})
export class HomeButtonComponent implements OnInit {
  @Input('link') link: string = '';

  errorMessage: string = '';
  url: string = '';

  constructor(private _router: Router) {}

  async ngOnInit() {}
  navigateToMenu() {
    this._router.navigateByUrl(`${this.link}`);
  }
}
