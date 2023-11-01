import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-lecture',
  templateUrl: './card-lecture.component.html',
  styleUrls: ['./card-lecture.component.css'],
})
export class CardLectureComponent implements OnInit {
  @Input('imgPath') imgPath: string = '';
  @Input('downloadUrl') downloadUrl: string = '';
  @Input('name') name: string = '';
  title: string = this.name;
  constructor() {}
  ngOnInit(): void {
    this.title = this.name;
    this.name =
      this.name?.length > 20 ? this.name.slice(0, 18) + '...' : this.name;
  }
}
