import { Injectable } from '@angular/core';
import { PlayerCharacter } from './player-character';

@Injectable()
export class Globals {
    baseSkillPoints = 10000;
    baseAttributePoints = 220;
    player = new PlayerCharacter();
}
