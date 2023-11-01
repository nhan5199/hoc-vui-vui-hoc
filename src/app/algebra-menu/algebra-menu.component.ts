import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DataService } from '../shared/data';
import { Location } from '@angular/common';

@Component({
  selector: 'app-algebra-menu',
  templateUrl: './algebra-menu.component.html',
  styleUrls: ['./algebra-menu.component.css'],
})
export class AlgebraMenuComponent implements OnInit {
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private readonly _location: Location,
    private readonly _dataService: DataService,
    private storage: AngularFireStorage
  ) {
    this.isLoading = true;
  }

  async ngOnInit() {
    await this.fetchData();

    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  async fetchData() {
    // try {
    //   const downloadPathPlane = `/imgs/home/plane_geometry_background.gif`;
    //   const fileRef = this.storage.ref(downloadPathPlane);
    //   const urlPlane = await fileRef.getDownloadURL().toPromise();
    //   this.planeUrl = urlPlane;
    //   const downloadPathCube = `/imgs/home/cube_geometry_background.gif`;
    //   const fileRefCube = this.storage.ref(downloadPathCube);
    //   const urlCube = await fileRefCube.getDownloadURL().toPromise();
    //   this.cubeUrl = urlCube;
    // } catch (error) {
    //   this.errorMessage = 'Lỗi khi lấy dữ liệu hình học';
    // }
  }

  returnToBackPage() {
    this._location.back();
  }
}
