import { Component, OnInit, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import { PlayerCharacter } from '../../player-character';
import { Globals } from 'src/app/globals';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit, AfterViewChecked {

  player: PlayerCharacter;
  isEditable: boolean;

  constructor(private globals: Globals, private router: Router, private cdRef: ChangeDetectorRef, private location: Location) {
    if ( this.router.url === '/newcharacter') {
      this.isEditable = false;
      this.player = globals.player;
    } else {
      this.isEditable = true;
      this.player = globals.activeCharacter;
    }
  }

  ngAfterViewChecked(): void {
    this.isEditable ?  this.player = this.globals.activeCharacter : this.player = this.globals.player;
    this.cdRef.detectChanges();
  }

  ngOnInit() {
  }

  saveCharacter() {
    this.globals.player.prepForSave();
    this.globals.storedCharacters.push(this.globals.player);
    this.globals.activeCharacter = this.globals.player;
    this.globals.player = new PlayerCharacter();
    this.globals.updatePersistenceContainer();
    this.router.navigateByUrl('/viewcharacter');
  }

}
