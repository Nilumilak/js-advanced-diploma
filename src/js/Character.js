/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  constructor(level, atttack = 0, defence = 0, health = 50, type = 'generic', savedCharacter = false) {
    this.level = level;
    this.attack = atttack;
    this.defence = defence;
    this.health = health;
    this.type = type;
    if (new.target.name === 'Character') {
      throw Error('Cannot create class Character');
    }

    if (!savedCharacter) {
      Array(this.level - 1).fill(0).forEach(_ => this.upgradeStats());
    }
  }

  attackTarget(target) {
    const damage = Math.max(this.attack - target.defence, this.attack * 0.1);
    target.health -= damage;
    return damage;
  }

  upgradeStats() {
    this.attack = Math.max(this.attack, this.attack * ((80 + this.health) / 100));
    this.defence = Math.max(this.defence, this.defence * ((80 + this.health) / 100));
    this.health = Math.min(100, this.health + 80);
  }

  levelUp() {
    if (this.level < 4) {
      this.level++;
      this.upgradeStats();
    }
  }
}
