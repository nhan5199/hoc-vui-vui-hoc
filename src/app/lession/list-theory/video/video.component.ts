import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { DataService } from 'src/app/shared/data';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-theory',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  videoUrl: string = '';
  topicName: string | null = '';
  listVideos: string[] = [];

  constructor(
    private storage: AngularFireStorage,
    private readonly _route: ActivatedRoute,
    private readonly _location: Location
  ) {}

  async ngOnInit() {
    this.topicName = this._route.snapshot.paramMap.get('topicName');
    await this.fetchData();
  }

  async fetchData() {
    try {
      const folderPath = `/${this.topicName}/videos`;
      const storageRef = this.storage.ref(folderPath);
      const result = await storageRef.listAll().toPromise();

      if (result && result?.items?.length > 0) {
        for (const itemRef of result.items) {
          const downloadPath = `/${itemRef.fullPath}`;
          const fileRef = this.storage.ref(downloadPath);
          const url = await fileRef.getDownloadURL().toPromise();
          this.listVideos.push(url);
        }
      }

      console.log(this.listVideos);
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }

  returnToBackPage() {
    this._location.back();
  }
}
