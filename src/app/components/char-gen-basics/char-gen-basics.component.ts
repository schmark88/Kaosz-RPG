import { Component, OnInit} from '@angular/core';
import { Races } from '../../races';
import { PlayerCharacter } from '../../player-character';
import { Globals } from '../../globals';

@Component({
  selector: 'app-char-gen-basics',
  templateUrl: './char-gen-basics.component.html',
  styleUrls: ['./char-gen-basics.component.css']
})
export class CharGenBasicsComponent implements OnInit {
  private globals: Globals;
  races = Races.racesArray;
  player: PlayerCharacter;
  selectedRace: any;
  attributePointsMax = 220;
  constructor(private globals1: Globals) {
    // this.selectedRace = {};
    this.globals = globals1;
    this.attributePointsMax = globals1.baseAttributePoints;
    this.player = globals1.player;
  }

  ngOnInit() {
  }

  selectRace(race: any) {
    this.selectedRace = race;
    this.player.setupRace(this.selectedRace);
    console.log(this.selectedRace.name);
  }
  getRemainingAttributePoints(): number {
    if ( !isNaN(this.player.getBaseAttributeSum())){
      return this.attributePointsMax - this.player.getBaseAttributeSum() - this.player.getSpecialsCost();
    } else {
      return this.attributePointsMax - this.player.getSpecialsCost();
    }
  }
  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return obj[key]});
 }
 checkSpecial(special: JSON){

    if (special['isSelected']) {
      this.player.specials[special['id']] = special;
    } else {
      delete this.player.specials[special['id']];
    }
    console.log(this.player.specials);
 }
 updatePointsBasedOnAge(){
   if (this.player.age < this.selectedRace.age.juvenis) {
     this.player.skillPoints = this.globals.baseSkillPoints * 0.6;
     this.attributePointsMax = this.globals.baseAttributePoints * 0.6;
   }
   if (this.player.age > this.selectedRace.age.seniorMin) {
    this.player.skillPoints = this.globals.baseSkillPoints * 2;
    this.attributePointsMax = this.globals.baseAttributePoints * 0.8;
  }
 }
}
