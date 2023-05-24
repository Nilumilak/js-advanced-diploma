import themes from "./themes";
import PositionedCharacter from "./PositionedCharacter";
import Bowman from "./characters/Bowman";
import Daemon from "./characters/Daemon";
import Magician from "./characters/Magician";
import Swordsman from "./characters/Swordsman";
import Undead from "./characters/Undead";
import Vampire from "./characters/Vampire";
import { generateTeam } from "./generators";
import { getRange, getCharIndexes } from "./utils";
import GamePlay from "./GamePlay";
import cursors from "./cursors";

export default class GameController {
  #selected = undefined;

  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.allCharacters = {}; // all characters on board
    this.firstTeamAllowedCharacters = [Bowman, Swordsman, Magician];
    this.secondTeamAllowedCharacters = [Daemon, Undead, Vampire];
  }

  get allCharactersList() {
    let charactersList = [];
    for (const key in this.allCharacters) {
      charactersList = charactersList.concat(this.allCharacters[key]);
    }
    return charactersList;
  }

  get characterSelected() {
    return this.#selected;
  }

  set characterSelected(character) {
    this.#selected = character;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    this.gamePlay.drawUi(themes.prairie);

    const firstTeam = generateTeam(this.firstTeamAllowedCharacters, 4, 2);
    const secondTeam = generateTeam(this.secondTeamAllowedCharacters, 4, 2);
    const teamPositionsList = this.getPositions();
    const firsTeamPositioned = this.initPositionTeam(firstTeam, teamPositionsList.firstTeamPositionsList);
    const secondTeamPositioned = this.initPositionTeam(secondTeam, teamPositionsList.secondTeamPositionsList);
    this.allCharacters.firsTeamPositioned = firsTeamPositioned;
    this.allCharacters.secondTeamPositioned = secondTeamPositioned;
    this.gamePlay.redrawPositions(this.allCharactersList);
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
    if (!this.cellHasCharacter(index, (character) => {
      if (getCharIndexes(this.allCharacters.firsTeamPositioned).includes(index)) {
        for (const posCharacter of this.allCharactersList) {
          this.gamePlay.deselectCell(posCharacter.position);
        }
        this.gamePlay.selectCell(index);
        this.characterSelected = character;
      }
    })) {
      GamePlay.showError('Empty cell');
    }
  }

  characterTag(character) {
    return `🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`;
  }

  cellHasCharacter(index, callback) {
    for (const posCharacter of this.allCharactersList) {
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
      if (this.allCharacters.firsTeamPositioned.includes(posCharacter)) {
        this.gamePlay.setCursor(cursors.pointer);
      } else if (this.characterSelected && this.allCharacters.secondTeamPositioned.includes(posCharacter)) {
        if (getRange(this.characterSelected, 'maxRange', this.gamePlay.boardSize).includes(posCharacter.position)) {
          this.gamePlay.setCursor(cursors.crosshair);
          this.gamePlay.selectCell(index, 'red');
        } else {
          this.gamePlay.setCursor(cursors.notallowed);
        }
      }
    });
    if (this.characterSelected
      && getRange(this.characterSelected, 'maxMoves', this.gamePlay.boardSize).includes(index)
      && !getCharIndexes(this.allCharactersList).includes(index)) {
      this.gamePlay.selectCell(index, 'green');
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
    this.gamePlay.setCursor(cursors.auto);
    for (let row = 0; row < this.gamePlay.boardSize; row++) {
      for (let column = 0; column < this.gamePlay.boardSize; column++) {
        if (this.characterSelected && index != this.characterSelected.position) {
          this.gamePlay.deselectCell(index);
        }
      }
    }
  }
}
