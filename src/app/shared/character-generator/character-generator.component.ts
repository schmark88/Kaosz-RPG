import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { PersistenceService } from 'angular-persistence';
import { PlayerCharacter } from '../../player-character';

@Component({
  selector: 'app-character-generator',
  templateUrl: './character-generator.component.html',
  styleUrls: ['./character-generator.component.css']
})
export class CharacterGeneratorComponent implements OnInit {

  constructor(private globals: Globals, private persistence: PersistenceService) {

  }

  ngOnInit() {
  }
  saveCharacter() {
    this.globals.player.prepForSave();
    this.globals.storedCharacters.push(this.globals.player);
    this.globals.player = new PlayerCharacter();
    this.globals.updatePersistenceContainer();
  }

}
