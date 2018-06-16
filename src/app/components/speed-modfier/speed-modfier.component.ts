import { Component, OnInit } from '@angular/core';
import { PlayerCharacter } from '../../player-character';
import { Globals } from '../../globals';
import { Races } from '../../races';

@Component({
  selector: 'app-speed-modifier',
  templateUrl: './speed-modfier.component.html',
  styleUrls: ['./speed-modfier.component.css']
})
export class SpeedModfierComponent implements OnInit {

  player: PlayerCharacter;
  races = Races;

  constructor(private globals: Globals) {
    this.player = globals.player;
   }

  ngOnInit() {
  }

}
