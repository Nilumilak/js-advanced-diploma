import Character from "../Character";

export default class Undead extends Character {
    constructor(level, attack = 40, defence = 10, health = 50, savedCharacter = false) {
        super(level, attack, defence, health, 'undead', savedCharacter);
        this.maxMoves = 4;
        this.maxRange = 1;
    }
}
