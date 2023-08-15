import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MathMenuComponent } from './math-menu/math-menu.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'math-menu',
    component: MathMenuComponent
  },
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./iframe/iframe.module').then((m) => m.IframeModule),
  // },
  // { path: '403', component: PageAccessDeniedComponent },
  // { path: '404', component: PageNotFoundComponent },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
