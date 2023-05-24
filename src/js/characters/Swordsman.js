import Character from "../Character";

export default class Swordsman extends Character {
    constructor(level) {
        super(level, 40, 10, 'swordsman');
        this.maxMoves = 4;
        this.maxRange = 1;
    }
}
