import Character from "../Character";

export default class Swordsman extends Character {
    constructor(level, attack = 40, defence = 10, health = 50) {
        super(level, attack, defence, health, 'swordsman');
        this.maxMoves = 4;
        this.maxRange = 1;
    }
}
