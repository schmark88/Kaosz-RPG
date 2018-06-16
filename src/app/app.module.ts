import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelperComponent } from './components/helper/helper.component';
import { CharGenBasicsComponent } from './components/char-gen-basics/char-gen-basics.component';
import { ForbiddenValidatorDirective } from './minmax.directive';
import { PercentRangeValidatorDirective } from './minmax.directive';

import { Globals } from './globals';

@NgModule({
  declarations: [
    AppComponent,
    HelperComponent,
    CharGenBasicsComponent,
    ForbiddenValidatorDirective,
    PercentRangeValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
