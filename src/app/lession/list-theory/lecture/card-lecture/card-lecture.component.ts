import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-lecture',
  templateUrl: './card-lecture.component.html',
  styleUrls: ['./card-lecture.component.css'],
})
export class CardLectureComponent implements OnInit {
  @Input('imgPath') imgPath: string = '';
  @Input('downloadUrl') downloadUrl: string = '';
  constructor() {}
  ngOnInit(): void {}
}
