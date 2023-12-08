import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Location } from '@angular/common';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

@Component({
  selector: 'app-edit-question-list',
  templateUrl: './edit-question-list.component.html',
  styleUrls: ['./edit-question-list.component.css'],
})
export class EditQuestionListComponent implements OnInit {
  topicKey!: string | null;
  topicName!: string | null;
  exerciseKey!: string | null;

  isLoading: boolean = true;
  exercise: any;
  backUpExercise: any;
  storageLevel: string = '';

  onSave: boolean = false;
  code: number = 0;
  informMessage: string = '';
  constructor(
    private readonly _route: ActivatedRoute,

    private storage: AngularFireStorage,
    private readonly _location: Location,

    private _db: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    this.topicKey = this._route.snapshot.paramMap.get('topicId');
    this.topicName = this._route.snapshot.paramMap.get('topicName');
    this.exerciseKey = this._route.snapshot.paramMap.get('id');

    this.fetchData();
  }

  async fetchData() {
    fetch(
      `https://hoc-vui-vui-hoc-343f8-default-rtdb.asia-southeast1.firebasedatabase.app//questionAnswer/${this.topicKey}/content/listExercises/${this.exerciseKey}.json`
    )
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        this.exercise = data;
        this.exercise.quests = Object.keys(data.quests).map((key) => ({
          key,
          ...data.quests[key],
        }));

        //get folder img path for question
        this.storageLevel = `level` + (+this.exercise?.name?.split(' ')[3] - 1);

        let urls: any[] = [];
        //Get list img from folder
        const folderPath = `/${this.topicName}/quests/${this.storageLevel}`;
        const storageRef = this.storage.ref(folderPath);
        const result = await storageRef.listAll().toPromise();

        if (result && result?.items?.length > 0) {
          for (const itemRef of result.items) {
            const downloadPath = `/${itemRef.fullPath}`;
            const fileRef = this.storage.ref(downloadPath);
            const url = await fileRef.getDownloadURL().toPromise();
            urls.push(url);
          }
        }

        this.exercise.quests.forEach((question: any) => {
          if (question.decoratePath) {
            let decoratepath = question.decoratePath
              .split('/')[2]
              .split('.')[0];
            question.decoratePath = urls.find((x) => x.includes(decoratepath));
          }

          if (question.imgPath) {
            let imgPath = question.imgPath.split('/')[2].split('.')[0];
            question.imgPath = urls.find((x) => x.includes(imgPath));
          }
        });
        this.backUpExercise = [...Array.from(this.exercise?.quests)];
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });
  }

  deleteQuestion(index: number) {
    this.exercise.quests.splice(index, 1);
  }

  onSaveExercise() {
    this.onSave = true;

    //Xử lý hình ảnh trước khi lưu
    this.exercise.quests.forEach((aquestion: any) => {});

    //Lưu
    const itemRef = this._db.object(
      `questionAnswer/${this.topicKey}/content/listExercises/${this.exerciseKey}`
    );
    itemRef.update(this.exercise);

    this.informMessage = 'Lưu thành công!';
    this.code = 200;

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  onReloadData() {
    this.exercise.quests = this.backUpExercise;
  }

  onChangeQuestion(index: number, event: any) {
    this.exercise.quests[index] = event;
  }

  returnToBackPage() {
    this._location.back();
  }
}
