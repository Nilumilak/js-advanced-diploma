import Character from "../Character";

export default class Bowman extends Character {
    constructor(level, attack = 25, defence = 25, health = 50) {
        super(level, attack, defence, health, 'bowman');
        this.maxMoves = 2;
        this.maxRange = 2;
    }
}
