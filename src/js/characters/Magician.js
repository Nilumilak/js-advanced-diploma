import Character from "../Character";

export default class Magician extends Character {
    constructor(level, attack = 10, defence = 40, health = 50, savedCharacter = false) {
        super(level, attack, defence, health, 'magician', savedCharacter);
        this.maxMoves = 1;
        this.maxRange = 4;
    }
}
