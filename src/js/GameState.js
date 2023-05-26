export default class GameState {
  #turn = {
    first: 'first',
    second: 'second',
  };

  constructor() {
    this.turn = this.#turn.first;
    this.running = true;
    this.points = 0;
    this.maxPoints = 0;
  }

  changeTurn() {
    if (this.turn == this.#turn.first) {
      this.turn = this.#turn.second;
    } else {
      this.turn = this.#turn.first;
    }
  }

  getPoint() {
    this.points++;
  }

  refreshPoints() {
    this.points = 0;
  }

  saveMaxPoints() {
    this.maxPoints = this.points;
    this.points = 0;
  }
  
  static from(object) {
    // TODO: create object
    return null;
  }
}
