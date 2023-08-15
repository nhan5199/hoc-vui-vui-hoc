import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeButtonComponent } from './shared/home-button/home-button.component';
import { MathMenuComponent } from './math-menu/math-menu.component';
import { RightMenuButtonComponent } from './shared/right-menu-button/right-menu-button.component';
import { LeftMenuButtonComponent } from './shared/left-menu-button/left-menu-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeButtonComponent,
    MathMenuComponent,
    RightMenuButtonComponent,
    LeftMenuButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
