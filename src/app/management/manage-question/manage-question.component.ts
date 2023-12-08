import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-service.service';

@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.css'],
})
export class ManageQuestionComponent implements OnInit {
  isLoading: boolean = false;
  authorize: string | null = '';

  topics: any[] = [
    { value: 'triangle', label: 'Hình tam giác' },
    { value: 'trapezoid', label: 'Hình thang' },
    { value: 'circle', label: 'Hình tròn' },
    { value: 'rectangular', label: 'Hình hộp chữ nhật' },
    { value: 'cube', label: 'Hình lập phương' },
  ];

  listTopics: any[] = [];
  isExpand: boolean[] = [false, false, false, false, false];
  displayConfirmDelete: boolean = false;
  selectedDelete: any = {};
  itemList!: AngularFireList<any>;
  insertDbPath: string = '';

  //popup thông báo
  informMessage: string = '';
  code: number = 200;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _location: Location,
    private _db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.authorize = this._route.snapshot.paramMap.get('authorize');
    this.fetchData();
  }

  fetchData() {
    fetch(
      `https://hoc-vui-vui-hoc-343f8-default-rtdb.asia-southeast1.firebasedatabase.app/questionAnswer.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data = Object.keys(data).map((key) => ({
          key,
          ...data[key],
        }));

        data.forEach((topic: any) => {
          this.listTopics.push({
            key: topic.key,
            listExercises: Object.keys(topic.content.listExercises).map(
              (key) => ({
                key,
                ...topic.content.listExercises[key],
              })
            ),
            topicName: this.getTopicName(topic.topicName),
            topicCode: topic.topicName,
          });
        });
      });
  }

  getTopicName(code: string): string {
    let label: string = '';
    this.topics.forEach((topic: any) => {
      if (topic?.value.toLowerCase() === code.toLowerCase()) {
        label = topic.label;
        return;
      }
    });
    return label;
  }

  onAddQuestionList() {
    this._router.navigateByUrl(
      `log-in/${this.authorize}/manage-question/add-question-list`
    );
  }

  onExpandTopic(key: number) {
    this.isExpand[key] = !this.isExpand[key];
  }

  onEditTopic(key: any, topicCode: string, topicKey: number) {
    this._router.navigateByUrl(
      `log-in/${this.authorize}/manage-question/${topicKey}/${topicCode}/${key}`
    );
  }

  onDeleteTopic(key: any, topicCode: string, topicKey: number) {
    this.displayConfirmDelete = true;
    this.selectedDelete = {
      topicCode: topicCode,
      key: key,
      topicKey: topicKey,
    };
  }

  onConfirmDelete(event: any) {
    this.displayConfirmDelete = false;

    if (event) {
      //Xóa câu hỏi trên firebase
      let topicContent = this.listTopics.find(
        (x: any) =>
          x.topicCode.toLowerCase() ===
          this.selectedDelete.topicCode.toLowerCase()
      );
      let selectedDeleteItem = topicContent.listExercises.find(
        (x: any) =>
          x.key.toLowerCase() === this.selectedDelete.key.toLowerCase()
      );
      this.insertDbPath = `/questionAnswer/${this.selectedDelete.topicKey}/content/listExercises`;
      const itemRef = this._db.object(
        this.insertDbPath + '/' + selectedDeleteItem.key
      );
      itemRef.remove();

      //Xóa hình trên storage
      let imgPath = '';
      this.listTopics.forEach((topic: any) => {
        if (
          topic.key.toLowerCase() ===
          this.selectedDelete.topicKey.toString().toLowerCase()
        ) {
          topic.listExercises.forEach((exercise: any) => {
            if (
              exercise.key.toLowerCase() ===
              this.selectedDelete.key.toLowerCase()
            ) {
              exercise.quests = Object.keys(exercise.quests).map((key) => ({
                key,
                ...exercise.quests[key],
              }));
              exercise.quests.forEach((question: any) => {
                if (question.decoratePath?.length > 0) {
                  imgPath = question?.decoratePath.split('/')[1];
                }
              });
            }
          });
        }
      });
      this.fileUploadService.deleteFolder(
        `/${this.selectedDelete.topicCode}/quests/${imgPath}`
      );

      // Xóa ở giao diện
      this.listTopics.forEach((topic: any) => {
        if (
          topic.topicCode.toLowerCase() ===
          this.selectedDelete.topicCode.toLowerCase()
        ) {
          let index = topic.listExercises.findIndex(
            (x: any) => x.key === this.selectedDelete.key
          );
          if (index !== -1) {
            topic.listExercises.splice(index, 1);
          }
        }
      });

      setTimeout(() => {
        this.informMessage = 'Xóa thành công!';
        this.code = 200;
      }, 100);
    }
  }

  returnToBackPage() {
    this._location.back();
  }
}
