import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-math',
  templateUrl: './math.component.html',
  styleUrls: ['./math.component.css'],
})
export class MathComponent implements OnInit {
  listFile: any[] = [];
  topicName: string | null = '';
  fileUrlStorage: string = '';
  errorMessage: string = '';
  isLoading: boolean = true;
  folderNames: string[] = [];
  constructor(
    private readonly _location: Location,
    private readonly _route: ActivatedRoute,
    private storage: AngularFireStorage
  ) {}
  async ngOnInit() {
    this.topicName = this._route.snapshot.paramMap.get('topicName');
    this.fileUrlStorage = `https://firebasestorage.googleapis.com/v0/b/hoc-vui-vui-hoc-343f8.appspot.com/o/${this.topicName}%2Fmaths%2F`;

    // await this.fetchData();
    await this.getFolderNames();
    setTimeout(() => {
      this.isLoading = false;
    }, 0);
  }

  async getFolderNames() {
    const rootPath = `${this.topicName}/maths`;

    // Create a reference to the root path
    const storageRef = this.storage.ref(rootPath);

    // List all items (including folders) in the specified path
    storageRef
      .listAll()
      .pipe(
        finalize(() => {
          // This block will be executed when the listing is complete
          this.folderNames.forEach(async (folderName: string) => {
            await this.fetchData(folderName);
          });
        })
      )
      .subscribe(
        (result) => {
          // Extract folder names
          this.folderNames = result.prefixes.map((prefix) => prefix.fullPath);
        },
        (error) => {
          console.error('Error listing folders:', error);
        }
      );
  }
  // Create an async function to wait for the data
  async fetchData(folderName: string) {
    try {
      let folderNameArr = folderName.split('/');
      let lastFolderName = folderNameArr[folderNameArr?.length - 1];
      const storageRef = this.storage.ref(folderName);
      const result = await storageRef.listAll().toPromise();

      const urls: string[] = [];

      if (result && result?.items?.length > 0) {
        for (const itemRef of result.items) {
          const downloadPath = `/${itemRef.fullPath}`;
          const fileRef = this.storage.ref(downloadPath);
          const url = await fileRef.getDownloadURL().toPromise();
          urls.push(url);
        }

        let file = {
          name: '',
          downloadUrl: '',
          imgPath: '',
        };
        urls.forEach(async (url) => {
          if (url.includes('gsp')) {
            this.fileUrlStorage = `https://firebasestorage.googleapis.com/v0/b/hoc-vui-vui-hoc-343f8.appspot.com/o/${this.topicName}%2Fmaths%2F`;
            this.fileUrlStorage = this.fileUrlStorage + lastFolderName + '%2F';
            debugger;
            let name = url.slice(
              url.indexOf(this.fileUrlStorage) + this.fileUrlStorage.length,
              url.indexOf('.gsp')
            );

            file.name = decodeURIComponent(name);

            file.downloadUrl = url;
          } else {
            file.imgPath = url;
          }
        });
        this.listFile.push(file);
      }
    } catch (error) {
      this.errorMessage = 'Lỗi khi lấy dữ liệu';
    }
  }

  returnToBackPage() {
    this._location.back();
  }
}
