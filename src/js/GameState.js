export default class GameState {
  #turn = {
    first: 'first',
    second: 'second',
  };

  constructor(turn = this.#turn.first, running = true, points = 0, maxPoints = 0, firstTeamList = [], secondTeamList = [], currentLevel = undefined, nextLevelsList = []) {
    this.turn = turn;
    this.running = running;
    this.points = points;
    this.maxPoints = maxPoints;
    this.firstTeamList = firstTeamList;
    this.secondTeamList = secondTeamList;
    this.currentLevel = currentLevel;
    this.nextLevelsList = nextLevelsList;
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
    if (this.points > this.maxPoints) {
      this.maxPoints = this.points;
    }
  }

  refreshPoints() {
    this.points = 0;
  }

  static from(object) {
    const {
      turn,
      running,
      points,
      maxPoints,
      firstTeamList,
      secondTeamList,
      currentLevel,
      nextLevelsList,
    } = object;
    return new GameState(
      turn,
      running,
      points,
      maxPoints,
      firstTeamList,
      secondTeamList,
      currentLevel,
      nextLevelsList,
      );
  }
}
