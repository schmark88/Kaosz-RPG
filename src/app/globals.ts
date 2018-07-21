import { Injectable } from '@angular/core';
import { PlayerCharacter } from './player-character';
import * as advantagesRaw from '../assets/json/elonyok.json';
import * as disAdvantagesRaw from '../assets/json/hatranyok.json';
import * as nightSkills from '../assets/json/skills/ejszaka.json';
import * as lightSkills from '../assets/json/skills/feny.json';
import * as medicineSkills from '../assets/json/skills/gyogyitas.json';
import * as everydaySkills from '../assets/json/skills/hetkoznapok.json';
import * as jobSkills from '../assets/json/skills/szakmak.json';
import * as scienceSkills from '../assets/json/skills/tudomany.json';
import * as bloodSkills from '../assets/json/skills/ver.json';
import * as cloneDeep from 'lodash/cloneDeep';
import { PersistenceService, StorageType } from 'angular-persistence';


@Injectable()
export class Globals {
    baseSkillPoints = 10000;
    baseAttributePoints = 220;
    player = new PlayerCharacter();
    advantages = advantagesRaw;
    disAdvantages = disAdvantagesRaw;
    skills: JSON;
    presetMaxLevel = 3;
    storedCharacters: PlayerCharacter[];
    activeCharacter: PlayerCharacter;

    private CHARACTERS = "chars";

    private storage_type = StorageType.LOCAL;

    constructor( private persistenceService: PersistenceService) {
        this.resetSkills();
        this.applyPresetMaxLevelForSkills();
        this.storedCharacters = [];
        const smth = persistenceService.get(this.CHARACTERS, this.storage_type);
        if (smth) {
            this.generateArray(smth).forEach( element => {
                const character = new PlayerCharacter();
                character.fromJSON(element);
                this.storedCharacters.push(character);
            });
        }
    }
    updatePersistenceContainer() {
        const json = JSON.parse('[]');
        this.storedCharacters.forEach(element => {
            json.push(element.toJson());
            console.log("save: "+element.toJson());
        });
        this.persistenceService.set(this.CHARACTERS, json, {type: this.storage_type});
    }
    resetSkills() {
        this.skills = JSON.parse('{}');
        this.skills[nightSkills['koldulas'].jartCsop] = cloneDeep(nightSkills);
        this.skills[lightSkills['magiaelmelet'].jartCsop] = cloneDeep(lightSkills);
        this.skills[medicineSkills['diagnozis'].jartCsop] = cloneDeep(medicineSkills);
        this.skills[everydaySkills['ertekbecsles'].jartCsop] = cloneDeep(everydaySkills);
        this.skills[jobSkills['fegyverjavitas'].jartCsop] = cloneDeep(jobSkills);
        this.skills[scienceSkills['oktatas'].jartCsop] = cloneDeep(scienceSkills);
        this.skills[bloodSkills['fegyverforgatas'].jartCsop] = cloneDeep(bloodSkills);
    }

    applyPresetMaxLevelForSkills() {
        this.generateArray(this.skills).forEach(group => {
            this.generateArray(group).forEach(element => {
                element['maxLevel'] = this.presetMaxLevel;
            });
          });
    }

    generateArray(obj) {
        const keys = Object.keys(obj);
        return keys.map((key) => obj[key]);
     }
     getSkill(skillId): JSON {
        let skill =  JSON.parse('{}');
        // TODO: use normal for loop instead of foreach and break it if condition is met
        this.generateArray(this.skills).forEach(group => {
            this.generateArray(group).forEach(element => {
                if (element.id === skillId) {
                    skill = element;
                }
            });
          });
          return skill;
     }
     setSkillMaxLevel(skillId, maxlevel, isGroup) {
        if (isGroup)    {
            this.generateArray(this.skills[skillId]).forEach(skill => {
                skill['maxLevel'] = maxlevel;
            });
        } else {
            const skill = this.getSkill(skillId);
            skill['maxLevel'] = maxlevel;
        }

     }
     updateSkillsFrom(player: PlayerCharacter) {
        this.generateArray(this.skills).forEach(csoport => {
            this.generateArray(csoport).forEach(element => {
              element.level = element.minLevel;
              if (element.csoportok) {
                this.generateArray(element.csoportok).forEach(csoportE => {
                    csoportE.level = element.minLevel;
                });
            }
            });
        });
        this.generateArray( player.skills).forEach(skill => {
            this.skills[skill.jartCsop][skill.id] = skill;
        });
    }
}
