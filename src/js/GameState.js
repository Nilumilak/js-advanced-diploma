export default class GameState {
  #turn = {
    first: 'first',
    second: 'second',
  };

  constructor() {
    this.turn = this.#turn.first;
  }

  changeTurn() {
    if (this.turn == this.#turn.first) {
      this.turn = this.#turn.second;
    } else {
      this.turn = this.#turn.first;
    }
  }
  
  static from(object) {
    // TODO: create object
    return null;
  }
}
