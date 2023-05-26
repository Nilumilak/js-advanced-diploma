import Character from "../Character";

export default class Bowman extends Character {
    constructor(level, attack = 25, defence = 25, health = 50, savedCharacter = false) {
        super(level, attack, defence, health, 'bowman', savedCharacter);
        this.maxMoves = 2;
        this.maxRange = 2;
    }
}
