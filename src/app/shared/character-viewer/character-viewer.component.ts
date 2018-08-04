import { Component, OnInit, AfterViewChecked} from '@angular/core';
import { PlayerCharacter } from '../../player-character';
import { Globals } from '../../globals';

@Component({
  selector: 'app-character-viewer',
  templateUrl: './character-viewer.component.html',
  styleUrls: ['./character-viewer.component.css']
})
export class CharacterViewerComponent implements OnInit, AfterViewChecked {
  player: PlayerCharacter;
  globals: Globals;
  dice100: number;
  dice6: number;
  gold: number;
  silver: number;
  moneyPrev: number;

  constructor(private globals1: Globals) {
    this.player = globals1.activeCharacter;
    this.globals = globals1;
    this.updateMoneyFromPlayer();
  }

  ngOnInit() {
  }
  ngAfterViewChecked() {
    if (this.player != null) {
      this.player.money = this.globals.convertGSToMoney(this.gold, this.silver);
      this.moneyPrev = this.player.money;
      this.globals.updatePersistenceContainer();
    }
  }

  updateMoneyFromPlayer() {
    if (this.player != null) {
      this.moneyPrev = this.player.money;
      const moneyDict = this.globals.convertMoneyToGS(this.moneyPrev);
      this.gold = moneyDict.gold;
      this.silver = moneyDict.silver;
    }
  }

  setActiveCharacter(char) {
    this.globals.activeCharacter = char;
    this.player = char;
    this.updateMoneyFromPlayer()
  }

  rollD6() {
    this.dice6 = Math.floor(Math.random() * 6) + 1;
  }

  rollD100() {
    this.dice100 = Math.floor(Math.random() * 100) + 1;
  }

  deleteCharacter(char) {
    const index = this.globals.storedCharacters.indexOf(char, 0);
    if (index > -1) {
      this.globals.storedCharacters.splice(index, 1);
    }
  }

  equipWeapon(item) {
    if ( !this.player.equipedWeapons.includes(item)) {
      this.player.equipedWeapons.push(item);
    } else {
      const index = this.player.equipedWeapons.indexOf(item, 0);
      if (index > -1) {
        this.player.equipedWeapons.splice(index, 1);
      }
    }
  }
  equipArmor(item) {
    if ( !this.player.equipedArmors.includes(item)) {
      this.player.equipedArmors.push(item);
    } else {
      const index = this.player.equipedArmors.indexOf(item, 0);
      if (index > -1) {
        this.player.equipedArmors.splice(index, 1);
      }
    }
  }


}
