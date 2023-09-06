import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeButtonComponent } from './shared/home-button/home-button.component';
import { MathMenuComponent } from './math-menu/math-menu.component';
import { RightMenuButtonComponent } from './shared/right-menu-button/right-menu-button.component';
import { LeftMenuButtonComponent } from './shared/left-menu-button/left-menu-button.component';
import { GeometryMenuComponent } from './geometry-menu/geometry-menu.component';
import { CommonModule } from '@angular/common';
import { LeftButtonComponent } from './shared/left-button/left-button.component';
import { RightButtonComponent } from './shared/right-button/right-button.component';
import { LessionComponent } from './lession/lession.component';
import { DataService } from './shared/data';
import { ListTheoryComponent } from './lession/list-theory/list-theory.component';
import { TheoryComponent } from './lession/list-theory/theory/theory.component';
import { LeftLessionButtonComponent } from './shared/lession-button/left-lession-button/left-lession-button.component';
import { RightLessionButtonComponent } from './shared/lession-button/right-lession-button/right-lession-button.component';
import { ExerciseComponent } from './lession/list-excercise/excercise/exercise.component';
import { ListExerciseComponent } from './lession/list-excercise/list-exercise.component';

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
    LessionComponent,
    ListExerciseComponent,
    ListTheoryComponent,
    TheoryComponent,
    ExerciseComponent,
    LeftLessionButtonComponent,
    RightLessionButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
