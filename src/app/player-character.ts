import {CharacterAttribute} from './charater-attribute';

export class PlayerCharacter {
    id: number;
    name: string;
    age: number;
    race: string;
    speed: number;

    // Main attributes
    physique: CharacterAttribute;
    strenght: CharacterAttribute;
    stamina: CharacterAttribute;

    aptitude: CharacterAttribute;
    dexterity: CharacterAttribute;
    reflex: CharacterAttribute;

    consciousness: CharacterAttribute;
    willpower: CharacterAttribute;
    intellect: CharacterAttribute;

    essence: CharacterAttribute;
    magicpower: CharacterAttribute;
    essenceshield: CharacterAttribute;

    specials: JSON;
    attributePoints: number;
    skillPoints: number;

    constructor() {
        this.name = '';
        this.physique = new CharacterAttribute();
        this.strenght = new CharacterAttribute();
        this.stamina = new CharacterAttribute();

        this.aptitude = new CharacterAttribute();
        this.dexterity = new CharacterAttribute();
        this.reflex = new CharacterAttribute();

        this.consciousness = new CharacterAttribute();
        this.willpower = new CharacterAttribute();
        this.intellect = new CharacterAttribute();

        this.essence = new CharacterAttribute();
        this.magicpower = new CharacterAttribute();
        this.essenceshield = new CharacterAttribute();
    }

    setupRace(race: any) {
        this.speed = race.speed.base;
        this.race = race.name;

         const attributes = race.foertekek;
         this.physique.base = attributes.fizikum.min;
         this.strenght.base = attributes.fizikum.min;
         this.stamina.base = attributes.fizikum.min;

         this.aptitude.base = attributes.ratermettseg.min;
         this.dexterity.base = attributes.ratermettseg.min;
         this.reflex.base = attributes.ratermettseg.min;

         this.consciousness.base = attributes.tudat.min;
         this.intellect.base = attributes.tudat.min;
         this.willpower.base = attributes.tudat.min;

         this.essence.base = attributes.esszencia.min;
         this.magicpower.base = attributes.esszencia.min;
         this.essenceshield.base = attributes.esszencia.min;

         this.specials = {};
    }
    getBaseAttributeSum(): number {
        return this.physique.base + this.consciousness.base + this.aptitude.base + this.essence.base;
    }
    getSpecialsCost(): number {
        var sum = 0;
        for (const special in this.specials) {
            if (this.specials.hasOwnProperty(special)) {
                const element = this.specials[special];
                sum = sum + element.cost;
            }
        }
        return sum;
    }
}