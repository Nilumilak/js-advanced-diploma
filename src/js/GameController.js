import themes from "./themes";
import PositionedCharacter from "./PositionedCharacter";
import Bowman from "./characters/Bowman";
import Daemon from "./characters/Daemon";
import Magician from "./characters/Magician";
import Swordsman from "./characters/Swordsman";
import Undead from "./characters/Undead";
import Vampire from "./characters/Vampire";
import { generateTeam } from "./generators";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.teamPositionsList = this.getPositions();
    this.firstTeamAllowedCharacters = [Bowman, Swordsman, Magician];
    this.secondTeamAllowedCharacters = [Daemon, Undead, Vampire];
  }

  init() {
    // TODO: add event listeners to gamePlay events
    this.gamePlay.drawUi(themes.prairie);

    const firstTeam = generateTeam(this.firstTeamAllowedCharacters, 4, 2);
    const secondTeam = generateTeam(this.secondTeamAllowedCharacters, 4, 2);
    const firsTeamPositioned = this.initPositionTeam(firstTeam, this.teamPositionsList.firstTeamPositionsList);
    const secondTeamPositioned = this.initPositionTeam(secondTeam, this.teamPositionsList.secondTeamPositionsList);
    this.gamePlay.redrawPositions(firsTeamPositioned.concat(secondTeamPositioned));
    // TODO: load saved stated from stateService
  }

  initPositionTeam(team, positionList) {
    const randomItem = arr => arr.splice(Math.floor(Math.random() * arr.length), 1);
    const positionedCharacterList = [];
    for (const character of team.characters) {
      const position = randomItem(positionList)[0];
      positionedCharacterList.push(new PositionedCharacter(character, position));
    }
    return positionedCharacterList;
  }

  getPositions() {
    const firstTeam = [];
    const secondTeam = [];
    let position = 0;
    for (let row = 0; row < this.gamePlay.boardSize; row++) {
      for (let column = 0; column < this.gamePlay.boardSize; column++) {
        if (column == 0 || column == 1) {
          firstTeam.push(position);
        }
        if (column == 6 || column == 7) {
          secondTeam.push(position);
        }
        position++;
      }
    }
    return { firstTeamPositionsList: firstTeam, secondTeamPositionsList: secondTeam };
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
