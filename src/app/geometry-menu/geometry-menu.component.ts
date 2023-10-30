import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DataService } from '../shared/data';

@Component({
  selector: 'app-geometry-menu',
  templateUrl: './geometry-menu.component.html',
  styleUrls: ['./geometry-menu.component.css'],
})
export class GeometryMenuComponent implements OnInit {
  planeGeometryMenu: any[] = [];
  cubeGeometryMenu: any[] = [];
  isLoading: boolean = true;
  planeUrl: string = '';

  cubeUrl: string = '';
  errorMessage: string = '';

  constructor(
    private readonly _location: Location,
    private readonly _dataService: DataService,
    private storage: AngularFireStorage
  ) {
    this.isLoading = true;
  }

  async ngOnInit() {
    this.cubeGeometryMenu = this._dataService.cubeGeometryMenu;
    this.planeGeometryMenu = this._dataService.planeGeometryMenu;
    await this.fetchData();

    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  async fetchData() {
    try {
      const downloadPathPlane = `/imgs/home/plane_geometry_background.gif`;
      const fileRef = this.storage.ref(downloadPathPlane);
      const urlPlane = await fileRef.getDownloadURL().toPromise();
      this.planeUrl = urlPlane;

      const downloadPathCube = `/imgs/home/cube_geometry_background.gif`;
      const fileRefCube = this.storage.ref(downloadPathCube);
      const urlCube = await fileRefCube.getDownloadURL().toPromise();
      this.cubeUrl = urlCube;
    } catch (error) {
      this.errorMessage = 'Lỗi khi lấy dữ liệu hình học';
    }
  }

  returnToBackPage() {
    this._location.back();
  }
}
