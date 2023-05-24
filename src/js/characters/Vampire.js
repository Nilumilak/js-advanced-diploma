import Character from "../Character";

export default class Vampire extends Character {
    constructor(level) {
        super(level, 25, 25, 'vampire');
        this.maxMoves = 2;
        this.maxRange = 2;
    }
}
