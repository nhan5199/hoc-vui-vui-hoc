import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  exerciseName: string | null = '';
  topicName: string | null = '';
  listQuestions: any;
  topic: any;
  exercise: any;
  activeQuest: number = 0;
  point: number = 0;
  countWrongAnswers: number = 0;
  countCorrectAnswers: number = 0;

  errorMessage: string = '';
  isDisplayErrorMessage: boolean = false;

  isPhoneAndOrientation: boolean = false;
  storageLevel: string = '';
  isLoading: boolean = true;
  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _appService: AppComponent,
    private readonly _location: Location,

    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.exerciseName = this._route.snapshot.paramMap.get('exerciseName');
    this.topicName = this._route.snapshot.paramMap.get('topicName');

    this.getQuestionAnswer();

    if (window.screen.width < 1100) {
      if (window.orientation === 90 || window.orientation === -90) {
        let flipbook = document.getElementById('flipbook');
        if (flipbook) {
          flipbook.style.display = 'flex';
        }
        this.isPhoneAndOrientation = false;
      } else {
        let flipbook = document.getElementById('flipbook');
        if (flipbook) {
          flipbook.style.display = 'none';
        }
        this.isPhoneAndOrientation = true;
      }
    }
  }

  getQuestionAnswer() {
    if (this._appService.allQuestionAnswer?.length > 0) {
      this.topic = this._appService.allQuestionAnswer.find(
        (x) => x.topicName === this.topicName
      );

      this.listQuestions = this.topic?.content?.listExercises[0]?.quests;
    } else {
      fetch(
        `https://hoc-vui-vui-hoc-343f8-default-rtdb.asia-southeast1.firebasedatabase.app/questionAnswer.json`
      )
        .then((response) => {
          return response.json();
        })
        .then(async (data) => {
          this.topic = data.find((x: any) => x.topicName === this.topicName);
          let tempExerciseName = this.exerciseName ? this.exerciseName : '';
          let questionsList = Object.keys(
            this.topic?.content?.listExercises
          ).map((key) => ({
            key,
            ...this.topic?.content?.listExercises[key],
          }));
          this.exercise = questionsList.find(
            (x: any) => this.convertViToEn(x.name) === tempExerciseName
          );
          this.listQuestions = this.exercise.quests;

          //get folder img path for question
          this.storageLevel =
            `level` + (+this.exercise?.name?.split(' ')[3] - 1);

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

          this.listQuestions.forEach((question: any) => {
            if (question.decoratePath) {
              let decoratepath = question.decoratePath
                .split('/')[2]
                .split('.')[0];
              question.decoratePath = urls.find((x) =>
                x.includes(decoratepath)
              );
            }

            if (question.imgPath) {
              let imgPath = question.imgPath.split('/')[2].split('.')[0];
              question.imgPath = urls.find((x) => x.includes(imgPath));
            }
          });

          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    }
  }

  changeQuestion() {
    this.activeQuest += 1;
  }

  checkAnswer(result: any, point: number = 0) {
    if (result?.point && result.result) {
      this.countCorrectAnswers += 1;
      this.point = this.point + result.point;
    } else if (!result?.result && result?.point > 0) {
      this.countWrongAnswers += 1;
      this.point = this.point + result.point;
    }
    //Nếu là câu hỏi trắc nghiệm hoặc điền khuyết
    else if (
      (result.result != undefined &&
        result.point != undefined &&
        (result?.result || (result?.point != 0 && result?.point == 100))) ||
      result == true
    ) {
      this.countCorrectAnswers += 1;
      this.point = this.point + 100;
    }
    //Nếu là câu hỏi đúng sai
    else if (point != 0) {
      //Nếu đúng hết
      if (point == 100) {
        this.countCorrectAnswers += 1;
      }
      //Nếu có ý sai
      else {
        this.countWrongAnswers += 1;
      }

      this.point = this.point + point;
    } else {
      this.countWrongAnswers += 1;
    }

    setTimeout(() => {
      this.changeQuestion();
    }, 2000);
  }

  //Chưa chọn đủ đáp án cho câu hỏi Yes/No
  validateAnswers(event: any) {
    if (event?.result == false && event?.message?.length > 0) {
      this.errorMessage = event?.message;
      this.isDisplayErrorMessage = true;
      setTimeout(() => {
        this.errorMessage = '';
        this.isDisplayErrorMessage = false;
      }, 3000);
    } else {
      this.checkAnswer(event.result, event.point);
    }
  }

  reloadQuestionAnswer() {
    this.activeQuest = 0;
    window.location.reload();
  }

  returnToBackPage() {
    this.activeQuest = 0;
    this._location.back();
  }

  convertViToEn(str: string, toUpperCase: boolean = false) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
    str = str.split(' ').join('-');
    return toUpperCase ? str.toUpperCase() : str;
  }

  ngAfterViewInit(): void {
    const panels: HTMLElement[] = Array.from(
      document.querySelectorAll('.panel')
    );
    const numPanels: number = panels.length;

    // if a panel is open, lower its z-idx
    // otherwise, set zIdx back to the original
    function checkZ(aPanel: HTMLElement) {
      if (aPanel.classList.contains('open')) {
        setTimeout(() => {
          aPanel.style.zIndex = '1';
        }, 800);
      } else {
        // set z-index back to original stored in data
        const zIdx = Number(aPanel.dataset['zIdx']);
        aPanel.style.zIndex = zIdx.toString();
      }
    }

    // loop through all panels and reverse sort via zIdx
    panels.forEach((panel, i) => {
      const zIdx: number = numPanels - i; // Specify the type of zIdx
      panel.style.zIndex = zIdx.toString();
      panel.dataset['zIdx'] = zIdx.toString();
    });

    const imgs: HTMLElement[] = Array.from(
      document.querySelectorAll('.panel img')
    );

    imgs.forEach((img) => {
      img.addEventListener('click', (event) => {
        const target = img.parentElement?.parentElement as HTMLElement;
        const panel = target.closest('.panel') as HTMLElement;
        if (panel) {
          if (
            target.classList.contains('front') ||
            target.classList.contains('back')
          ) {
            panel.classList.toggle('open');
            checkZ(panel);
          }
        }
        event.stopPropagation();
      });
    });
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: Event): void {
    if (window.screen.width < 900) {
      if (window.orientation === 90 || window.orientation === -90) {
        let flipbook = document.getElementById('flipbook');
        if (flipbook) {
          flipbook.style.display = 'flex';
        }
        this.isPhoneAndOrientation = false;
      } else {
        let flipbook = document.getElementById('flipbook');
        if (flipbook) {
          flipbook.style.display = 'none';
        }
        this.isPhoneAndOrientation = true;
      }
    }
  }
}
