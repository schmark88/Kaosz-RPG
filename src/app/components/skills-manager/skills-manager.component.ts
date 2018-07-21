import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Globals } from '../../globals';
import { PlayerCharacter } from '../../player-character';
import * as cloneDeep from 'lodash/cloneDeep';


@Component({
  selector: 'app-skills-manager',
  templateUrl: './skills-manager.component.html',
  styleUrls: ['./skills-manager.component.scss']
})
export class SkillsManagerComponent implements OnInit, AfterViewChecked {

  player: PlayerCharacter;
  showTab = 'none' ;
  skills: any;

  constructor(private globals: Globals) {
    this.player = globals.player;
    this.skills = globals.skills;
   }

  ngOnInit() {
  }
  ngAfterViewChecked() {
  }

  private getSum(total, num) {
    return total + num;
  }

  private getMultiplier(value): number {
    if (value < -20) {
      return 2;
    }
    if (value < -10) {
      return 1.3;
    }
    if (value < 0) {
      return 1.15;
    }
    if (value > 10) {
      return 0.85;
    }
    if (value > 20) {
      return 0.7;
    }
    return 1;
  }

 getCostAndUpdate(obj): number {
  let cost = 0;
  if (obj.csoportok) {
    const multipliedCost = this.calculateMultipliedCostArray(obj);
    if (obj.id === 'fegyverforgatas') {
      this.globals.generateArray(obj.csoportok).forEach(element => {
        if (element.minDef < element.def) {
          const costArray = multipliedCost.slice(element.minDef, element.def);
          cost += Math.round(-1 * costArray.reduce(this.getSum));
        }
        if (element.minAtk < element.atk) {
          const costArray = multipliedCost.slice(element.minAtk, element.atk);
          cost += Math.round(-1 * costArray.reduce(this.getSum));
        }
      });
    } else {
      this.globals.generateArray(obj.csoportok).forEach(element => {
        if (element.minLevel < element.level) {
          const costArray = multipliedCost.slice(element.minLevel, element.level);
          cost += Math.round(-1 * costArray.reduce(this.getSum));
        }
      });
    }

    this.player.skillCosts[obj.id] = cost;
    this.player.skills[obj.id] = obj;
    this.setAggregatedLevel(obj);
    if (obj.level < 1) {
      this.removePlayerSkill(obj);
    }
  } else {
    // calc cost and add cost
    if (obj.minLevel < obj.level) {
      const multipliedCost = this.calculateMultipliedCostArray(obj);
      const costArray = multipliedCost.slice(obj.minLevel, obj.level);
      cost += Math.round(-1 * costArray.reduce(this.getSum));
    }
    this.player.skillCosts[obj.id] = cost;
    // add skill to player skills
    this.player.skills[obj.id] = obj;
    if (obj.level < 1) {
      this.removePlayerSkill(obj);
    }
  }
  return cost;
 }

 private removePlayerSkill(obj) {
  delete this.player.skillCosts[obj.id];
  delete this.player.skills[obj.id];
 }

 private calculateMultipliedCostArray(obj): any[] {
  const reqAttribute = this.player.getAttributeValue(obj.reqFoertekId);
  const diffArray = obj.req.map( v => reqAttribute - v);
  const multipliers = diffArray.map(this.getMultiplier);
  const clonedCost = cloneDeep(obj.cost);
  const multipliedCost = [];
  for (let index = 0; index < clonedCost.length; index++) {
    const element = clonedCost[index] * multipliers[index];
    multipliedCost.push(element);
  }
  return multipliedCost;
 }

  setAggregatedLevel(obj) {
    let level = 0;
    if (obj.id === 'fegyverforgatas') {
      this.globals.generateArray(obj.csoportok).forEach(element => {
        if (0 < element.atk) {
          level = level + element.atk;
        }
        if (0 < element.def) {
          level = level + element.def;
        }
      });
    } else if (obj.csoportok) {
      this.globals.generateArray(obj.csoportok).forEach(element => {
        if (0 < element.level) {
          level = level + element.level;
        }
      });
    }
    obj.level = level;
  }
}
