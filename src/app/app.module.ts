import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AlgebraMenuComponent } from './algebra-menu/algebra-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeometryMenuComponent } from './geometry-menu/geometry-menu.component';
import { HomeComponent } from './home/home.component';
import { ExerciseShapeComponent } from './lession/exercise-shape/exercise-shape.component';
import { ExcerciseCardComponent } from './lession/list-excercise/excercise-card/excercise-card.component';
import { ExerciseComponent } from './lession/list-excercise/excercise/exercise.component';
import { ListExerciseComponent } from './lession/list-excercise/list-exercise.component';
import { FlipbookComponent } from './lession/list-theory/flipbook/flipbook.component';
import { CardLectureComponent } from './lession/list-theory/lecture/card-lecture/card-lecture.component';
import { LectureComponent } from './lession/list-theory/lecture/lecture.component';
import { ListTheoryComponent } from './lession/list-theory/list-theory.component';
import { MathComponent } from './lession/list-theory/math/math.component';
import { VideoComponent } from './lession/list-theory/video/video.component';
import { TopicComponent } from './lession/topic.component';
import { MathMenuComponent } from './math-menu/math-menu.component';
import { AnswerPointComponent } from './shared/answer-point/answer-point.component';
import { HomeButtonComponent } from './shared/buttons/home-button/home-button.component';
import { LeftButtonComponent } from './shared/buttons/left-button/left-button.component';
import { LeftLessionButtonComponent } from './shared/buttons/left-lession-button/left-lession-button.component';
import { LeftMenuButtonComponent } from './shared/buttons/left-menu-button/left-menu-button.component';
import { RightButtonComponent } from './shared/buttons/right-button/right-button.component';
import { RightLessionButtonComponent } from './shared/buttons/right-lession-button/right-lession-button.component';
import { RightMenuButtonComponent } from './shared/buttons/right-menu-button/right-menu-button.component';
import { ConfirmPopupComponent } from './shared/confirm-popup/confirm-popup.component';
import { DataService } from './shared/data';
import { ErrorMessageComponent } from './shared/error-message/error-message.component';
import { ChooseCorrectAnswerComponent } from './shared/question-type/choose-correct-answer/choose-correct-answer.component';
import { ExchangeUnitComponent } from './shared/question-type/exchange-unit/exchange-unit.component';
import { WriteAnswerComponent } from './shared/question-type/write-answer/write-answer.component';
import { WriteTextAnswerComponent } from './shared/question-type/write-text-answer/write-text-answer.component';
import { YesNoQuestionComponent } from './shared/question-type/yes-no-question/yes-no-question.component';
import { SummaryResultComponent } from './shared/summary-result/summary-result.component';

import { ResizableModule } from 'angular-resizable-element';
import { KonvaModule } from 'ng2-konva';
import { ExerciseShapeInfoComponent } from './lession/exercise-shape/exercise-shape-info/exercise-shape-info.component';
import { LogInComponent } from './management/log-in/log-in.component';
import { ManageQuestionComponent } from './management/manage-question/manage-question.component';
import { AddQuestionListComponent } from './management/manage-question/add-question-list/add-question-list.component';
import { EditQuestionListComponent } from './management/manage-question/edit-question-list/edit-question-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeButtonComponent,
    MathMenuComponent,
    RightMenuButtonComponent,
    LeftMenuButtonComponent,
    GeometryMenuComponent,
    LeftButtonComponent,
    RightButtonComponent,
    TopicComponent,
    ListExerciseComponent,
    ListTheoryComponent,
    VideoComponent,
    ExerciseComponent,
    LeftLessionButtonComponent,
    RightLessionButtonComponent,
    AnswerPointComponent,
    ChooseCorrectAnswerComponent,
    YesNoQuestionComponent,
    ErrorMessageComponent,
    ExchangeUnitComponent,
    WriteAnswerComponent,
    SummaryResultComponent,
    ConfirmPopupComponent,
    LectureComponent,
    FlipbookComponent,
    CardLectureComponent,
    MathComponent,
    AlgebraMenuComponent,
    WriteTextAnswerComponent,
    ExcerciseCardComponent,
    ExerciseShapeComponent,
    ExerciseShapeInfoComponent,
    LogInComponent,
    ManageQuestionComponent,
    AddQuestionListComponent,
    EditQuestionListComponent,
  ],
  imports: [
    KonvaModule,
    ResizableModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
