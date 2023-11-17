import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'right-button',
  templateUrl: './right-button.component.html',
  styleUrls: ['./right-button.component.css'],
})
export class RightButtonComponent implements OnInit {
  @Input('imgPath') imgPath: string = '';
  @Input('imgLabel') imgLabel: string = '';
  @Input('name') name: string = '';

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {}

  goToPage() {
    if (this.name === 'Trò chơi tương tác') {
      this._router.navigateByUrl(`/exercise-shape`);
    } else {
      this._router.navigateByUrl(`/geometry-menu/${this.name}`);
    }
  }
}
