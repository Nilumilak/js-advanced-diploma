import Character from "../Character";

export default class Bowman extends Character {
    constructor(level) {
        super(level, 25, 25, 'bowman');
        this.maxMoves = 2;
        this.maxRange = 2;
    }
}
