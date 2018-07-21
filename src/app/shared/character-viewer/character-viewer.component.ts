import { Component, OnInit, enableProdMode } from '@angular/core';
import { PlayerCharacter } from '../../player-character';
import { Globals } from '../../globals';

@Component({
  selector: 'app-character-viewer',
  templateUrl: './character-viewer.component.html',
  styleUrls: ['./character-viewer.component.css']
})
export class CharacterViewerComponent implements OnInit {
  player: PlayerCharacter;
  globals: any;

  constructor(private globals1: Globals) {
    this.player = globals1.activeCharacter;
    this.globals = globals1;
  }

  ngOnInit() {
  }

  setActiveCharacter(char) {
    this.globals.activeCharacter = char;
    this.player = char;
  }

}
