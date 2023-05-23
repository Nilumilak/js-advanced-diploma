/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
export default class Team {
  constructor() {
    this.characters = new Set();
  }

  add(character) {
      if (this.characters.has(character)) {
          throw new Error(`Character ${character} is already in the team`);
      }
      this.characters.add(character);
  }
}
