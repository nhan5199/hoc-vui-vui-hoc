import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { DataService } from 'src/app/shared/data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-theory',
  templateUrl: './theory.component.html',
  styleUrls: ['./theory.component.css'],
})
export class TheoryComponent implements OnInit {
  videoUrl: string = '';
  topicName: string | null = '';
  listVideos: any;
  a =
    'https://firebasestorage.googleapis.com/v0/b/hoc-vui-vui-hoc-343f8.appspot.com/o/HO%E1%BA%A0T%20H%C3%8CNH.mp4?alt=media&token=f896ebb7-da26-4f99-aa46-5cfc4635f71c';
  constructor(
    private storage: AngularFireStorage,
    private readonly _dataDervice: DataService,
    private readonly _route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Specify the path in Firebase Storage
    // array.forEach((x) => {
    //   const videoRef = this.storage.ref(x);
    //   // Get the download URL for the video
    //   videoRef.getDownloadURL().subscribe((url: any) => {
    //     this.videoUrl = url;
    //     console.log('data title: ', x);
    //     console.log('data url: ', this.videoUrl);
    //   });
    // });
    this.topicName = this._route.snapshot.paramMap.get('topicName');
    this._dataDervice.videoArray.forEach((x: any) => {
      if (x.name.toLowerCase() === this.topicName?.toLowerCase()) {
        this.listVideos = x.videos;
      }
    });

    console.log('data: ', this.listVideos);
  }
}
