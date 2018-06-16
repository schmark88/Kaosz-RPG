import { Component, OnInit } from '@angular/core';
import { PlayerCharacter } from '../../player-character';
import { Globals } from '../../globals';

@Component({
  selector: 'app-fate-modifier',
  templateUrl: './fate-modifier.component.html',
  styleUrls: ['./fate-modifier.component.css']
})
export class FateModifierComponent implements OnInit {

  player: PlayerCharacter;
  originalGoodFate: number;
  originalBadFate: number;

  constructor(private globals: Globals) {
    this.player = globals.player;
    this.originalBadFate = this.player.badFateBoundary;
    this.originalGoodFate = this.player.goodFateBoundary;
   }

  ngOnInit() {
  }

}
