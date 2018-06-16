import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HelperComponent } from './components/helper/helper.component';
import { CharGenBasicsComponent } from './components/char-gen-basics/char-gen-basics.component';
import { ForbiddenValidatorDirective } from './minmax.directive';
import { PercentRangeValidatorDirective } from './minmax.directive';

import { Globals } from './globals';
import { SpeedModfierComponent } from './components/speed-modfier/speed-modfier.component';
import { FateModifierComponent } from './components/fate-modifier/fate-modifier.component';


@NgModule({
  declarations: [
    AppComponent,
    HelperComponent,
    CharGenBasicsComponent,
    ForbiddenValidatorDirective,
    PercentRangeValidatorDirective,
    SpeedModfierComponent,
    FateModifierComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    BrowserAnimationsModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
