import { Component, OnInit} from '@angular/core';
import { Globals } from '../../globals';
import { PlayerCharacter } from '../../player-character';

@Component({
  selector: 'app-dis-advantages',
  templateUrl: './dis-advantages.component.html',
  styleUrls: ['./dis-advantages.component.scss']
})
export class DisAdvantagesComponent implements OnInit {

// Dom variables
  showTab = -1;
// Class variables
  player: PlayerCharacter;
  advantages: any;
  disAdvantages: any;

  constructor(private globals: Globals) {
    this.player = globals.player;
    this.advantages = globals.advantages;
    this.disAdvantages = globals.disAdvantages;
    globals.generateArray(this.advantages).forEach(element => {
      element.level = 1;
    });
    globals.generateArray(this.disAdvantages).forEach(element => {
      element.level = 1;
    });
  }

  ngOnInit() {
  }

  getMaxStep(obj): number {
    return ((obj.costMax - obj.costMin) / obj.costStep ) + 1;
  }
  getCost(obj): number {
    obj.currentCost = obj.costMin + ((obj.level - 1) * obj.costStep);
    if (obj.isSelected) {
      this.player.skillCosts[obj.id] = obj.currentCost;
      this.player.disAdvantages[obj.id] = obj;
    }
    return obj.currentCost;
  }
  check(obj) {
    if (obj.isSelected) {
      this.player.skillCosts[obj.id] = obj.currentCost;
      this.player.disAdvantages[obj.id] = obj;
    } else {
      delete this.player.skillCosts[obj.id];
      delete this.player.disAdvantages[obj.id];
    }
 }
}
