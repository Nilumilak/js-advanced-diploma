import Character from "../Character";

export default class Vampire extends Character {
    constructor(level, attack = 25, defence = 25, health = 50) {
        super(level, attack, defence, health, 'vampire');
        this.maxMoves = 2;
        this.maxRange = 2;
    }
}
