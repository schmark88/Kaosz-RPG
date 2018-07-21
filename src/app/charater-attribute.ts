export class CharacterAttribute {
    base: number;
    modifications: number[];

    toJSON() {
        return {
            base: this.base,
            modifications: this.modifications
        }
    }

    fromJSON(json) {
        this.base = json.base;
        this.modifications = json.modifications;
    }
}
