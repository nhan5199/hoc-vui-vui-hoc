import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AngularFireList,
  AngularFireDatabase,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-question-list',
  templateUrl: './add-question-list.component.html',
  styleUrls: ['./add-question-list.component.css'],
})
export class AddQuestionListComponent implements OnInit {
  authorize: string | null = '';
  isAuthorize: boolean = false;
  isLoading: boolean = true;
  listUsers: any[] = [];
  passwordVisible: boolean = false;

  isInvalidInput: boolean = false;
  isWrongCredential: boolean = false;

  options: any[] = [
    { value: 'triangle', label: 'Hình tam giác' },
    { value: 'trapezoid', label: 'Hình thang' },
    { value: 'circle', label: 'Hình tròn' },
    { value: 'rectangular', label: 'Hình hộp chữ nhật' },
    { value: 'cube', label: 'Hình lập phương' },
  ];

  templateDownloadUrl: string = '';
  listQuestions: any = {
    imgPath: '',
    name: 'Phiếu bài tập ',
    url: '',
    quests: [],
  };

  newListQuestionsIndex: number = 0;

  selectedFile: File | null = null;

  itemList!: AngularFireList<any>;
  insertDbPath: string = '';
  selectedImgFiles!: FileList | null;
  selectedImagesArray: any[] = [];
  downloadUrls!: string[];

  code: number = 0;
  informMessage: string = '';

  @ViewChild('inputFile') inputFile!: ElementRef;
  @ViewChild('inputImages') inputImages!: ElementRef;

  constructor(
    private _route: ActivatedRoute,
    private _db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private fileUploadService: FileUploadService,
    private _location: Location
  ) {}

  async ngOnInit() {
    this.authorize = this._route.snapshot.paramMap.get('authorize');
    this._db
      .object('login')
      .valueChanges()
      .subscribe((data: any) => {
        if (data.toLowerCase() === this.authorize?.toLowerCase()) {
          this.isAuthorize = true;
          this.isLoading = false;
          fetch(
            `https://hoc-vui-vui-hoc-343f8-default-rtdb.asia-southeast1.firebasedatabase.app/user.json`
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              this.listUsers = data;
            });
        } else {
          this.isLoading = false;
        }
      });

    this.selectedOption = '0';
    this.getTemplateFile();
  }

  selectedOption: string | null = null;

  onTopicChange(): void {
    let listItems: any[] = [];
    let indexTopic = this.getTopicIndex(
      this.selectedOption ? this.selectedOption : 'triangle'
    );
    this.insertDbPath = `/questionAnswer/${indexTopic}/content/listExercises`;
    fetch(
      `https://hoc-vui-vui-hoc-343f8-default-rtdb.asia-southeast1.firebasedatabase.app/${this.insertDbPath}.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        listItems = Object.keys(data).map((key) => ({ key, ...data[key] }));
        let latestListIndex = 0;
        listItems.forEach((item: any) => {
          if (+item?.name.split(' ')[3] > latestListIndex) {
            latestListIndex = +item.name.split(' ')[3];
          }
        });
        this.newListQuestionsIndex = latestListIndex;
      });
  }

  getTopicIndex(topicName: string): number {
    let index = 0;
    switch (topicName.toLowerCase()) {
      case 'triangle':
        index = 0;
        break;
      case 'trapezoid':
        index = 1;
        break;
      case 'circle':
        index = 2;
        break;
      case 'rectangular':
        index = 3;
        break;
      case 'cube':
        index = 4;
        break;
      default:
        index = 0;
        break;
    }
    return index;
  }

  async getTemplateFile() {
    const downloadPath = '/upload-question/template hoc-vui.xlsx';
    const fileRef = this.storage.ref(downloadPath);
    this.templateDownloadUrl = await fileRef.getDownloadURL().toPromise();
  }

  async onFileChange(event: any) {
    this.selectedFile = event.target.files?.[0] || null;
    const file = event.target.files[0];
    if (file) {
      await this.readFile(file);
    }
  }

  async readFile(file: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, { type: 'array' });

      // Get the sheet names
      const sheetNames = workbook.SheetNames;

      // Loop through each sheet
      sheetNames.forEach((sheetName: any) => {
        const worksheet = workbook.Sheets[sheetName];
        //chuyển tất cả dòng dữ liệu trong excel và dạng mảng các json
        const data = XLSX.utils.sheet_to_json(worksheet);
        if (sheetName.toLowerCase() === 'câu hỏi') {
          data.forEach(async (item: any) => {
            let question = await this.convertJsonToData(item);
            this.listQuestions.quests.push(question);
          });
        }
      });
    };
    reader.readAsArrayBuffer(file);
  }

  deleteSelectedFile() {
    this.selectedFile = null;
  }

  //Khởi tạo câu hỏi dựa trên dữ liệu json
  convertJsonToData(data: any): any {
    let result: any;
    if (String(data['Lọai câu hỏi']).split('.')[0] === '1') {
      result = {
        answer: +data['Đáp án đúng'],
        choices: [
          {
            name: String(data['Câu trả lời 1']),
            value: 1,
          },
          {
            name: String(data['Câu trả lời 2']),
            value: 2,
          },
          {
            name:
              String(data['Câu trả lời 3'])?.length > 0
                ? String(data['Câu trả lời 3'])
                : null,
            value: String(data['Câu trả lời 3'])?.length > 0 ? 3 : null,
          },
          {
            name:
              String(data['Câu trả lời 4'])?.length > 0
                ? String(data['Câu trả lời 4'])
                : null,
            value: String(data['Câu trả lời 4'])?.length > 0 ? 4 : null,
          },
        ],
        decoratePath: `${this.selectedOption}/level${this.newListQuestionsIndex}/${data['Hình ảnh trang trí']}`,
        imgPath: `${this.selectedOption}/level${this.newListQuestionsIndex}/${data['Hình ảnh câu hỏi']}`,
        questionName: data['Tên câu hỏi'],
        type: 1,
      };
    } else if (String(data['Lọai câu hỏi']).split('.')[0] === '2') {
      result = {
        choices: [
          {
            answer: +data['Đáp án 1']?.split('.')[0],
            name: String(data['Ý kiến 1']),
          },
          {
            answer: +data['Đáp án 2']?.split('.')[0],
            name: String(data['Ý kiến 2']),
          },
          {
            answer: +data['Đáp án 3']?.split('.')[0],
            name: String(data['Ý kiến 3']),
          },
          {
            answer: +data['Đáp án 4']?.split('.')[0],
            name: String(data['Ý kiến 4']),
          },
        ],
        decoratePath: `${this.selectedOption}/level${this.newListQuestionsIndex}/${data['Hình ảnh trang trí']}`,
        imgPath: `${this.selectedOption}/level${this.newListQuestionsIndex}/${data['Hình ảnh câu hỏi']}`,
        questionName: data['Tên câu hỏi'],
        type: 2,
      };
    } else if (String(data['Lọai câu hỏi']).split('.')[0] === '3') {
      result = {
        answer: +data['Đáp án đúng'],
        decoratePath: `${this.selectedOption}/level${this.newListQuestionsIndex}/${data['Hình ảnh trang trí']}`,
        imgPath: `${this.selectedOption}/level${this.newListQuestionsIndex}/${data['Hình ảnh câu hỏi']}`,
        questionName: data['Tên câu hỏi'],
        type: 3,
        unit: data['Đơn vị'],
      };
    } else if (String(data['Lọai câu hỏi']).split('.')[0] === '5') {
      result = {
        answer: data['Đáp án đúng'].split('#'),
        decoratePath: `${this.selectedOption}/level${this.newListQuestionsIndex}/${data['Hình ảnh trang trí']}`,
        imgPath: `${this.selectedOption}/level${this.newListQuestionsIndex}/${data['Hình ảnh câu hỏi']}`,
        questionName: data['Tên câu hỏi'].split('#'),
        type: 5,
      };
    }
    return result;
  }

  clearFileName(): void {
    this.selectedFile = null;
  }

  onImagesSelected(event: any): void {
    this.selectedImgFiles = event.target.files;
    this.selectedImagesArray = [...event.target.files];
  }

  uploadFiles(): void {
    if (this.selectedImgFiles && this.selectedImgFiles.length > 0) {
      let insertPath = `${this.selectedOption}/quests/level${this.newListQuestionsIndex}`;
      this.fileUploadService
        .uploadFiles(this.selectedImgFiles, insertPath)
        .then((result: any) => {
          this.code = 200;
          this.informMessage = 'Thêm phiếu bài tập thành công!';
          this.selectedImgFiles = null;
          this.clearFileName();
        })
        .catch((error: any) => {
          this.code = 202;
          this.informMessage = 'Thêm phiếu bài tập thất bại!';
        });
      setTimeout(() => {
        this.informMessage = '';
      }, 3000);
    }
  }

  onCreateQuestions() {
    debugger;
    if (!this.selectedOption || !this.selectedFile) {
      this.code = 202;
      this.informMessage = 'Vui lòng chọn đủ thông tin Chủ đề và Câu hỏi!';
      setTimeout(() => {
        this.informMessage = '';
      }, 3000);

      return;
    }
    this.listQuestions.name += this.newListQuestionsIndex + 1;
    this.itemList = this._db.list('/' + this.insertDbPath);
    this.itemList.push(this.listQuestions).then(() => {});
    this.uploadFiles();
  }

  returnToBackPage() {
    this._location.back();
  }
}
