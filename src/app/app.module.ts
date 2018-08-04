import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PersistenceModule } from 'angular-persistence';

import { AppComponent } from './app.component';
import { HelperComponent } from './components/helper/helper.component';
import { CharGenBasicsComponent } from './components/char-gen-basics/char-gen-basics.component';
import { ForbiddenValidatorDirective } from './minmax.directive';
import { PercentRangeValidatorDirective } from './minmax.directive';

import { Globals } from './globals';
import { SpeedModfierComponent } from './components/speed-modfier/speed-modfier.component';
import { FateModifierComponent } from './components/fate-modifier/fate-modifier.component';
import { DisAdvantagesComponent } from './components/dis-advantages/dis-advantages.component';
import { SkillsManagerComponent } from './components/skills-manager/skills-manager.component';
import { MainNavBarComponent } from './shared/main-nav-bar/main-nav-bar.component';
import { CharacterGeneratorComponent } from './shared/character-generator/character-generator.component';
import { CharacterManagerComponent } from './shared/character-manager/character-manager.component';
import { AppRoutingModule } from './app-routing.module';
import { CharacterViewerComponent } from './shared/character-viewer/character-viewer.component';
import { ItemBrowserComponent } from './components/item-browser/item-browser.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';



@NgModule({
  declarations: [
    AppComponent,
    HelperComponent,
    CharGenBasicsComponent,
    ForbiddenValidatorDirective,
    PercentRangeValidatorDirective,
    SpeedModfierComponent,
    FateModifierComponent,
    DisAdvantagesComponent,
    SkillsManagerComponent,
    MainNavBarComponent,
    CharacterGeneratorComponent,
    CharacterManagerComponent,
    CharacterViewerComponent,
    ItemBrowserComponent,
    StatusBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PersistenceModule,
    MatSliderModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
