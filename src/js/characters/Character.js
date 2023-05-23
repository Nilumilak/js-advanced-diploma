export default class Character {
    constructor(level, attack = 0, defence = 0, type = undefined) {
        this.level = level;
        this.attack = attack;
        this.defence = defence;
        this.health = 100;
        this.type = type;
        if (new.target.name === 'Character') {
            throw Error('Cannot create class Character')
        }
    }
}
