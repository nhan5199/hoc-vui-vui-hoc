import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, lastValueFrom, switchMap } from 'rxjs';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css'],
})
export class LectureComponent implements OnInit {
  listFile: any[] = [];
  topicName: string | null = '';
  constructor(
    private readonly _location: Location,
    private readonly _route: ActivatedRoute,
    private storage: AngularFireStorage
  ) {}
  async ngOnInit() {
    this.topicName = this._route.snapshot.paramMap.get('topicName');

    await this.fetchData();
  }

  // Create an async function to wait for the data
  async fetchData() {
    try {
      const folderPath = `/${this.topicName}/files`;
      const storageRef = this.storage.ref(folderPath);
      const result = await storageRef.listAll().toPromise();

      const urls: string[] = [];

      if (result && result?.items?.length > 0) {
        for (const itemRef of result.items) {
          const downloadPath = `/${itemRef.fullPath}`;
          const fileRef = this.storage.ref(downloadPath);
          const url = await fileRef.getDownloadURL().toPromise();
          urls.push(url);
        }

        this.listFile = Array.from({ length: urls.length / 2 }, () => ({
          imgPath: null,
          downloadUrl: null,
        }));

        urls.forEach((url) => {
          let index = url.slice(
            url.indexOf('bai') + 3,
            url.indexOf(
              url.includes('.pptx')
                ? '.pptx'
                : url.includes('.PNG')
                ? '.PNG'
                : '.png'
            )
          );
          if (url.includes('pptx')) {
            this.listFile[+index - 1].downloadUrl = url;
          } else {
            this.listFile[+index - 1].imgPath = url;
          }
        });
      }

      console.log(this.listFile);
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }

  returnToBackPage() {
    this._location.back();
  }
}
