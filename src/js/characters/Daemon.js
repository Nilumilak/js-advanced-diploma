import Character from "../Character";

export default class Daemon extends Character {
    constructor(level, attack = 10, defence = 10, health = 50) {
        super(level, attack, defence, health, 'daemon');
        this.maxMoves = 1;
        this.maxRange = 4;
    }
}
