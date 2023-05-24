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
  constructor(level, atttack = 0, defence = 0, type = 'generic') {
    this.level = level;
    this.attack = atttack;
    this.defence = defence;
    this.health = 50;
    this.type = type;
    if (new.target.name === 'Character') {
      throw Error('Cannot create class Character');
    }
    // TODO: выбросите исключение, если кто-то использует "new Character()"
  }
}
