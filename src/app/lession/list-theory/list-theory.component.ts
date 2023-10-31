import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-theory',
  templateUrl: './list-theory.component.html',
  styleUrls: ['./list-theory.component.css'],
})
export class ListTheoryComponent implements OnInit {
  topicName: string | null = '';
  theoryName: string = 'theory-123';
  isLoading: boolean = true;
  url: string = '';
  errorMessage: string = '';
  constructor(
    private readonly _router: Router,
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
      const downloadPath = `/imgs/lesson/background/theory-background.gif`;
      const fileRef = this.storage.ref(downloadPath);
      const url = await fileRef.getDownloadURL().toPromise();
      this.url = url;
    } catch (error) {
      this.errorMessage = 'Lỗi khi lấy dữ liệu';
    }
  }

  goToVideo() {
    this._router.navigateByUrl(
      `geometry-menu/${this.topicName}/list-theory/${this.theoryName}/video`
    );
  }

  goToOnlineLecture() {
    this._router.navigateByUrl(
      `geometry-menu/${this.topicName}/list-theory/${this.theoryName}/lecture`
    );
  }

  gotoMath() {
    this._router.navigateByUrl(
      `geometry-menu/${this.topicName}/list-theory/${this.theoryName}/math`
    );
  }

  gotoFlipBook() {
    this._router.navigateByUrl(
      `geometry-menu/${this.topicName}/list-theory/${this.theoryName}/flipbook`
    );
  }

  returnToBackPage() {
    this._location.back();
  }
}
