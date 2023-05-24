import Character from "../Character";

export default class Daemon extends Character {
    constructor(level) {
        super(level, 10, 10, 'daemon');
        this.maxMoves = 1;
        this.maxRange = 4;
    }
}
