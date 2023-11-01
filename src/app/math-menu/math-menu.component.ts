import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-math-menu',
  templateUrl: './math-menu.component.html',
  styleUrls: ['./math-menu.component.css'],
})
export class MathMenuComponent implements OnInit {
  geometryButtonPath: string = '/assets/imgs/home/geometry_button.gif';
  geometryButtonLabel: string = 'Hình học';
  geometryUrl: string = '/geometry-menu';
  geometryImgUrl: string = '/geometry-menu';
  algrebraButtonPath: string = '/assets/imgs/home/algebra_button.gif';
  algrebraButtonLabel: string = 'Đại lượng';
  algebraUrl: string = '/algebra-menu';
  algebraImgUrl: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';
  constructor(
    private readonly _location: Location,
    private storage: AngularFireStorage
  ) {}

  async ngOnInit() {
    await this.fetchData();

    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  goToGeometryMenu() {}

  async fetchData() {
    try {
      const downloadPathPlane = `/imgs/home/geometry_background.gif`;
      const fileRef = this.storage.ref(downloadPathPlane);
      const urlPlane = await fileRef.getDownloadURL().toPromise();
      this.geometryImgUrl = urlPlane;

      const downloadPathCube = `/imgs/home/algebra_background.gif`;
      const fileRefCube = this.storage.ref(downloadPathCube);
      const urlCube = await fileRefCube.getDownloadURL().toPromise();
      this.algebraImgUrl = urlCube;
    } catch (error) {
      this.errorMessage = 'Lỗi khi lấy dữ liệu menu toán';
    }
  }

  returnToBackPage() {
    this._location.back();
  }
}
