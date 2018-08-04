import { Component, OnInit, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import { Races } from '../../races';
import { PlayerCharacter } from '../../player-character';
import { Globals } from '../../globals';

@Component({
  selector: 'app-char-gen-basics',
  templateUrl: './char-gen-basics.component.html',
  styleUrls: ['./char-gen-basics.component.css']
})
export class CharGenBasicsComponent implements OnInit, AfterViewChecked {
  races = Races.racesArray;
  player: PlayerCharacter;
  selectedRace: any;
  attributePointsMax = 220;
  currentSkillPoints: number;
  constructor(private globals: Globals, private cdRef: ChangeDetectorRef) {
    // this.selectedRace = {};
    this.attributePointsMax = globals.baseAttributePoints;
    this.player = globals.player;
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (this.selectedRace) {
      this.updatePointsBasedOnAge();
      this.currentSkillPoints = this.calculateCurrentSkillPoints();
    }
    this.cdRef.detectChanges();
  }

  selectRace(race: any) {
    this.globals.resetSkills();
    this.globals.applyPresetMaxLevelForSkills();
    this.selectedRace = race;
    this.player.setupRace(this.selectedRace);
    this.player.money = this.globals.baseMoney;
    this.updatePointsBasedOnAge();
    this.setRaceMaxSkillLevels();
    this.addRaceSkills();
    this.globals.updateSkillsFrom(this.player);
    console.log(this.selectedRace.name);
  }
  getRemainingAttributePoints(): number {
    if ( !isNaN(this.player.getBaseAttributeSum())) {
      return this.attributePointsMax - this.player.getBaseAttributeSum() - this.player.getSpecialsCost();
    } else {
      return this.attributePointsMax - this.player.getSpecialsCost();
    }
  }

 checkSpecial(special: JSON) {

    if (special['isSelected']) {
      this.player.specials[special['id']] = special;
    } else {
      delete this.player.specials[special['id']];
    }
    console.log(this.player.specials);
 }
 updatePointsBasedOnAge() {
  this.player.skillPoints = this.globals.baseSkillPoints;
  this.attributePointsMax = this.globals.baseAttributePoints;
   if (this.player.age < this.selectedRace.age.juvenis) {
     this.player.skillPoints = this.globals.baseSkillPoints * 0.6;
     this.attributePointsMax = this.globals.baseAttributePoints * 0.6;
   }
   if (this.player.age > this.selectedRace.age.seniorMin) {
    this.player.skillPoints = this.globals.baseSkillPoints * 2;
    this.attributePointsMax = this.globals.baseAttributePoints * 0.8;
  }
 }

 calculateCurrentSkillPoints(): number {
   return this.player.skillPoints + this.player.calculateSkillCosts();
 }

 private setRaceMaxSkillLevels() {
  if ( this.selectedRace.jartMaxLevelMod.csoportok ) {
    const groupKeys = Object.keys(this.selectedRace.jartMaxLevelMod.csoportok);
    groupKeys.forEach(key => {
      const value = this.selectedRace.jartMaxLevelMod.csoportok[key];
      this.globals.setSkillMaxLevel(key, value, true);
    });
  }
  if ( this.selectedRace.jartMaxLevelMod.jart ) {
    const skillKeys = Object.keys(this.selectedRace.jartMaxLevelMod.jart);
    skillKeys.forEach(key => {
      const value = this.selectedRace.jartMaxLevelMod.jart[key];
      this.globals.setSkillMaxLevel(key, value, false);
    });
  }
 }
 private addRaceSkills() {
  this.globals.generateArray(this.selectedRace.bonusJart).forEach(skillConfig => {
    const skill = this.globals.getSkill(skillConfig.id);
    skill['minLevel'] = skillConfig.level;
    skill['maxLevel'] = skillConfig.level;
    this.player.skills[skill['id']] = skill;
  });
 }
}
