import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data';

@Component({
  selector: 'app-card-lecture',
  templateUrl: './card-lecture.component.html',
  styleUrls: ['./card-lecture.component.css'],
})
export class CardLectureComponent implements OnInit {
  @Input('imgPath') imgPath: string = '';
  @Input('downloadUrl') downloadUrl: string = '';
  @Input('name') name: string = '';
  constructor(private readonly _dataService: DataService) {}
  ngOnInit(): void {
    this._dataService.lecture.forEach((item: any) => {
      if (this.name.toLowerCase() === item.code.toLowerCase()) {
        this.name = item.name;
        if (this.name.length > 20) {
          this.name = this.name.slice(0, 20) + '...';
        }
      }
    });
  }
}
