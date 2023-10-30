import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  goToMath: string = '/math-menu';
  isLoading: boolean = true;
  errorMessage: string = '';
  url: string = '';
  constructor(
    private readonly titleService: Title,
    private storage: AngularFireStorage
  ) {
    this.titleService.setTitle('Học vui - Vui học');
  }

  async ngOnInit() {
    await this.fetchData();
    setTimeout(() => {
      this.isLoading = false;
    }, 0);
  }

  async fetchData() {
    try {
      const downloadPath = `/imgs/home/home_pic.gif`;
      const fileRef = this.storage.ref(downloadPath);
      const url = await fileRef.getDownloadURL().toPromise();
      this.url = url;
    } catch (error) {
      this.errorMessage = 'Lỗi khi lấy dữ liệu';
    }
  }
}
