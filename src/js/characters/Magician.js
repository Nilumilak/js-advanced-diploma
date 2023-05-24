import Character from "../Character";

export default class Magician extends Character {
    constructor(level) {
        super(level, 10, 40, 'magician');
        this.maxMoves = 1;
        this.maxRange = 4;
    }
}
