import themes from "./themes";
import PositionedCharacter from "./PositionedCharacter";
import Bowman from "./characters/Bowman";
import Daemon from "./characters/Daemon";
import Magician from "./characters/Magician";
import Swordsman from "./characters/Swordsman";
import Undead from "./characters/Undead";
import Vampire from "./characters/Vampire";
import { generateTeam } from "./generators";
import GamePlay from "./GamePlay";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.allCharacters = []; // all characters on board
    this.firstTeamAllowedCharacters = [Bowman, Swordsman, Magician];
    this.secondTeamAllowedCharacters = [Daemon, Undead, Vampire];
  }

  init() {
    // TODO: add event listeners to gamePlay events
    this.gamePlay.drawUi(themes.prairie);

    const firstTeam = generateTeam(this.firstTeamAllowedCharacters, 4, 2);
    const secondTeam = generateTeam(this.secondTeamAllowedCharacters, 4, 2);
    const teamPositionsList = this.getPositions();
    const firsTeamPositioned = this.initPositionTeam(firstTeam, teamPositionsList.firstTeamPositionsList);
    const secondTeamPositioned = this.initPositionTeam(secondTeam, teamPositionsList.secondTeamPositionsList);
    this.allCharacters = firsTeamPositioned.concat(secondTeamPositioned);
    this.gamePlay.redrawPositions(this.allCharacters);
    this.setHandlers();
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

  setHandlers() {
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
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
    if (!this.cellHasCharacter(index, () => {
      for (const posCharacter of this.allCharacters) {
        this.gamePlay.deselectCell(posCharacter.position);
      }
      this.gamePlay.selectCell(index);
    })) {
      GamePlay.showError('Empty cell');
    }
  }

  characterTag(character) {
    return `🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`;
  }

  cellHasCharacter(index, callback) {
    for (const posCharacter of this.allCharacters) {
      if (posCharacter.position == index) {
        callback(posCharacter);
        return true;
      }
    }
    return false;
  }

  onCellEnter(index) {
    this.cellHasCharacter(index, (posCharacter) => {
      this.gamePlay.showCellTooltip(this.characterTag(posCharacter.character), index);
    });
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
  }
}
