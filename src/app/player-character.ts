import {CharacterAttribute} from './charater-attribute';

export class PlayerCharacter {
    id: string;
    name: string;
    age: number;
    raceName: string;
    raceId: string;
    speed: number;
    hitpoints: number;
    mana: number;

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

    attributePoints: number;
    skillPoints: number;

    goodFateBoundary: number;
    badFateBoundary: number;

    specials: JSON = JSON.parse('{}');
    skillCosts: JSON = JSON.parse('{}');

    disAdvantages: JSON = JSON.parse('{}');

    skills: JSON = JSON.parse('{}');

    constructor() {
        this.name = '';
        this.age = 0;
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

        this.goodFateBoundary = 33;
        this.badFateBoundary = 66;
    }

    maxHP() {
        return Math.round(this.physique.base * 1.2 + 20);
    }
    maxMana() {
        return this.essence.base;
    }

    effectiveMana() {
        if (this.skills['esszenciafelszabaditas']) {
            return this.magicpower.base * 0.1 * this.skills['esszenciafelszabaditas'].level;
        }
        return 0;
    }

    maxMagicResist() {
        if (this.skills['esszenciapajzsaktivizalas']) {
            return (this.essenceshield.base * 0.2) + (this.essenceshield.base * 0.1 * this.skills['esszenciapajzsaktivizalas'].level);
        }
        return this.essenceshield.base * 0.2;
    }

    setupRace(race: any) {
        this.speed = race.speed.base;
        this.raceName = race.name;
        this.raceId = race.id;

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

        this.age = Math.floor(race.age.seniorMin - race.age.juvenis / 2);

        this.speed = race.speed.base;
        this.specials = JSON.parse('{}');
        this.skills = JSON.parse('{}');
        this.skillCosts = JSON.parse('{}');
        this.disAdvantages = JSON.parse('{}');
    }
    getBaseAttributeSum(): number {
        return this.physique.base + this.consciousness.base + this.aptitude.base + this.essence.base;
    }
    getSpecialsCost(): number {
        let sum = 0;
        for (const special in this.specials) {
            if (this.specials.hasOwnProperty(special)) {
                const element = this.specials[special];
                sum = sum + element.cost;
            }
        }
        return sum;
    }
    generateArray(obj) {
        return Object.keys(obj).map((key) => obj[key]);
    }
    calculateSkillCosts(): number {
        let sum = 0;
        this.generateArray(this.skillCosts).forEach(element => {
            sum = sum + element;
        });
        return sum;
    }
    getAttributeValue(attributeName): number {
        if (attributeName === 'fizikum') {
            return this.physique.base;
        }
        if (attributeName === 'ero') {
            return this.strenght.base;
        }
        if (attributeName === 'szivossag') {
            return this.physique.base;
        }

        if (attributeName === 'ratermettseg') {
            return this.aptitude.base;
        }
        if (attributeName === 'ugyesseg') {
            return this.dexterity.base;
        }
        if (attributeName === 'reflex') {
            return this.reflex.base;
        }

        if (attributeName === 'tudat') {
            return this.consciousness.base;
        }
        if (attributeName === 'intelligencia') {
            return this.intellect.base;
        }
        if (attributeName === 'lelkiero') {
            return this.willpower.base;
        }

        if (attributeName === 'esszencia') {
            return this.essence.base;
        }
        if (attributeName === 'varazsero') {
            return this.magicpower.base;
        }
        if (attributeName === 'esszenciapajzs') {
            return this.essenceshield.base;
        }
        throw new Error('No such attribute: ' + attributeName);
    }

    prepForSave() {
        this.skillPoints -= this.calculateSkillCosts();
        this.skillCosts = JSON.parse('{}');
        if (this.id) {
            this.id = this.name + new Date();
        }
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            raceName: this.raceName,
            raceId: this.raceId,
            speed: this.speed,
            hitpoints: this.hitpoints,
            physique: this.physique.toJSON(),
            strenght: this.strenght.toJSON(),
            stamina: this.stamina.toJSON(),
            aptitude: this.aptitude.toJSON(),
            dexterity: this.dexterity.toJSON(),
            reflex: this.reflex.toJSON(),
            consciousness: this.consciousness.toJSON(),
            willpower: this.willpower.toJSON(),
            intellect: this.intellect.toJSON(),
            essence: this.essence.toJSON(),
            magicpower: this.magicpower.toJSON(),
            essenceshield: this.essenceshield.toJSON(),
            attributePoints: this.attributePoints,
            skillPoints: this.skillPoints,
            goodFateBoundary: this.goodFateBoundary,
            badFateBoundary: this.badFateBoundary,
            specials: this.specials,
            skillCosts: this.skillCosts,
            disAdvantages: this.disAdvantages,
            skills: this.skills

        };
    }
    fromJSON(json) {
        this.id = json.id;
        this.name = json.name;
        this.age = json.age;
        this.raceId = json.raceId;
        this.raceName = json.raceName;
        this.speed = json.speed;
        this.hitpoints = json.hitpoints;

        this.physique.fromJSON(json.physique);
        this.strenght.fromJSON(json.strenght);
        this.stamina.fromJSON(json.stamina);

        this.aptitude.fromJSON(json.aptitude);
        this.dexterity.fromJSON(json.dexterity);
        this.reflex.fromJSON(json.reflex);

        this.consciousness.fromJSON(json.consciousness);
        this.intellect.fromJSON(json.intellect);
        this.willpower.fromJSON(json.willpower);

        this.essence.fromJSON(json.essence);
        this.magicpower.fromJSON(json.magicpower);
        this.essenceshield.fromJSON(json.essenceshield);

        this.specials = json.specials;
        this.skills = json.skills;
        this.skillPoints = json.skillPoints;
        this.skillCosts = json.skillCosts;
        this.disAdvantages = json.disAdvantages;
        this.goodFateBoundary = json.goodFateBoundary;
        this.badFateBoundary = json.badFateBoundary;
    }
}
