import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './widget/calculator/calculator.component';
import { ButtonComponent } from './widget/button/button.component';
import { DisplayComponent } from './widget/display/display.component';
import { HomeComponent } from './page/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ButtonComponent,
    DisplayComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
