import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
})
export class TopicComponent implements OnInit {
  theoryImgPath: string = '';
  theoryUrl: string = '';
  theoryLabel: string = 'Lý thuyết';

  exerciseImgPath: string = '';
  exerciseUrl: string = '';
  exerciseLabel: string = 'Bài tập';

  topicName: string | null = '';
  isLoading: boolean = true;

  url: string = '';
  errorMessage: string = '';
  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _location: Location,
    private storage: AngularFireStorage
  ) {}

  async ngOnInit() {
    this.topicName = this._route.snapshot.paramMap.get('topicName');
    await this.fetchData();

    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  async fetchData() {
    try {
      const downloadPath = `/imgs/lesson/background/${this.topicName}-lession-background.gif`;
      const fileRef = this.storage.ref(downloadPath);
      const url = await fileRef.getDownloadURL().toPromise();
      this.url = url;
    } catch (error) {
      this.errorMessage = 'Lỗi khi lấy dữ liệu';
    }
  }

  returnToBackPage() {
    this._location.back();
  }
}
