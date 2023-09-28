import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MathMenuComponent } from './math-menu/math-menu.component';
import { GeometryMenuComponent } from './geometry-menu/geometry-menu.component';
import { ListExerciseComponent } from './lession/list-excercise/list-exercise.component';
import { ListTheoryComponent } from './lession/list-theory/list-theory.component';
import { TheoryComponent } from './lession/list-theory/theory/theory.component';
import { ExerciseComponent } from './lession/list-excercise/excercise/exercise.component';
import { TopicComponent } from './lession/topic.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'math-menu',
    component: MathMenuComponent
  },
  {
    path: 'geometry-menu',
    component: GeometryMenuComponent
  },
  {
    path: "geometry-menu/:topicName/list-exercise",
    component: ListExerciseComponent,
    pathMatch: "full"
  },
  {
    path: "geometry-menu/:topicName/list-exercise/:exerciseName",
    component: ExerciseComponent,
  },
  {
    path: "geometry-menu/:topicName/list-theory/:theoryName",
    component: TheoryComponent,
  },
  {
    path: "geometry-menu/:topicName/list-theory",
    component: ListTheoryComponent,
    pathMatch: "full"
  },
  {
    path: 'geometry-menu/:topicName',
    component: TopicComponent,
  },
  // { path: '403', component: PageAccessDeniedComponent },
  // { path: '404', component: PageNotFoundComponent },
  // {
  //   path: '**',
  //   redirectTo: ''
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
