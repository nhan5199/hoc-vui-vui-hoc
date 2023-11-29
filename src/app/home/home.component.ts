import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import * as emailjs from 'emailjs-com';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  listAdminEmails: string[] = ['nhannguyenn510@gmail.com'];
  goToMath: string = '/math-menu';
  isLoading: boolean = true;
  informMessage: string = '';
  url: string = '';
  envLink: string = '';
  code: number = 200;
  constructor(
    private readonly titleService: Title,
    private storage: AngularFireStorage,
    private _db: AngularFireDatabase
  ) {
    this.titleService.setTitle('Học vui - Vui học');
  }

  async ngOnInit() {
    await this.fetchData();
    setTimeout(() => {
      this.isLoading = false;
    }, 0);

    //Test environment
    this.envLink = 'http://localhost:4200';

    //product environment
    // this.envLink = 'https://hoc-vui-vui-hoc.vercel.app/';
  }

  async fetchData() {
    try {
      const downloadPath = `/imgs/home/home_pic.gif`;
      const fileRef = this.storage.ref(downloadPath);
      const url = await fileRef.getDownloadURL().toPromise();
      this.url = url;
    } catch (error) {
      this.informMessage = 'Lỗi khi lấy dữ liệu';
      this.code = 202;
    }
  }
  sendEmail(authorize: string) {
    this.listAdminEmails.forEach((email: string) => {
      emailjs
        .send(
          'service_gyi1nqd',
          'template_96x6cyn',
          {
            to_name: email,
            authorize: authorize,
            link: this.envLink,
          },
          '_OMpeInpwPG_qlFA6'
        )
        .then(
          (response) => {
            console.log(1);
            this.informMessage = 'Gửi mail thành công!';
            this.code = 200;
          },
          (error) => {
            this.informMessage = 'Gửi mail thất bại';
            this.code = 202;
          }
        );
    });
  }

  onLogin() {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$';

    const allChars =
      uppercaseChars + lowercaseChars + numberChars + specialChars;

    let password = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars.charAt(randomIndex);
    }

    this._db.object('login').set(password);
    this.sendEmail(password);
  }
}
