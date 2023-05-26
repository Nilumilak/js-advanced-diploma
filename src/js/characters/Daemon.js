import Character from "../Character";

export default class Daemon extends Character {
    constructor(level, attack = 10, defence = 10, health = 50, savedCharacter = false) {
        super(level, attack, defence, health, 'daemon', savedCharacter);
        this.maxMoves = 1;
        this.maxRange = 4;
    }
}
