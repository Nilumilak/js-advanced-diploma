import themes from "./themes";
import PositionedCharacter from "./PositionedCharacter";
import Bowman from "./characters/Bowman";
import Daemon from "./characters/Daemon";
import Magician from "./characters/Magician";
import Swordsman from "./characters/Swordsman";
import Undead from "./characters/Undead";
import Vampire from "./characters/Vampire";
import { generateTeam } from "./generators";
import { getRange, getCharIndexes, getCharRowColumn } from "./utils";
import GamePlay from "./GamePlay";
import cursors from "./cursors";
import GameState from "./GameState";

export default class GameController {
  #characterTypes = {
    bowman: Bowman,
    daemon: Daemon,
    magician: Magician,
    swordsman: Swordsman,
    undead: Undead,
    vampire: Vampire,
  };

  #selected = undefined;

  #levelTypes = [themes.mountain, themes.arctic, themes.desert];

  #currentLevel = undefined;

  #enemiesAmount = [5, 4, 3];

  constructor(gamePlay, stateService) {
    this.gameState = new GameState();
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.allCharacters = {}; // all characters on board
    this.firstTeamAllowedCharacters = [Bowman, Swordsman, Magician];
    this.secondTeamAllowedCharacters = [Daemon, Undead, Vampire];
  }
  
  get currentLevel() {
    return this.#currentLevel;
  }

  get getNextLevelType() {
    this.#currentLevel = this.#levelTypes.pop();
    return this.#currentLevel;
  }

  get nextLevelsList() {
    return this.#levelTypes;
  }

  setlevelTypes(levelTypesList) {
    this.#levelTypes = levelTypesList;
  }

  refreshLevels() {
    this.#levelTypes = [themes.mountain, themes.arctic, themes.desert];
  }

  get getNextEnemiesAmount() {
    return this.#enemiesAmount.pop();
  }

  refreshEnemies() {
    this.#enemiesAmount = [5, 4, 3];
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
    this.startNewGame();
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
    this.gamePlay.addNewGameListener(this.startNewGame.bind(this));
    this.gamePlay.addSaveGameListener(this.saveGame.bind(this));
    this.gamePlay.addLoadGameListener(this.loadGame.bind(this));
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
    if (this.gameState.running) {
      if (this.gameState.turn == 'first') {
        if (!this.cellHasCharacter(index, (character) => {
          if (getCharIndexes(this.allCharacters.firstTeamPositioned).includes(index)) {
            for (const posCharacter of this.allCharactersList) {
              this.gamePlay.deselectCell(posCharacter.position);
            }
            this.gamePlay.selectCell(index);
            this.characterSelected = character;
          } else if (getCharIndexes(this.allCharacters.secondTeamPositioned).includes(index)) {
            if (this.characterSelected && getRange(this.characterSelected, 'maxRange', this.gamePlay.boardSize).includes(index)) {
              this.gameState.changeTurn();
              const damage = this.characterSelected.character.attackTarget(character.character);
              this.deleteDeadCharacters();
              this.gamePlay.redrawPositions(this.allCharactersList);
              this.gamePlay.showDamage(index, damage)
                .then(() => this.enemyTurn());
            }
          }
        })) {
          if (this.characterSelected) {
            if (getRange(this.characterSelected, 'maxMoves', this.gamePlay.boardSize).includes(index)) {
              this.gamePlay.deselectCell(this.characterSelected.position);
              this.characterSelected.position = index;
              this.gamePlay.selectCell(index);
              this.gamePlay.redrawPositions(this.allCharactersList);
              this.gameState.changeTurn();
              this.enemyTurn();
            }
          } else {
            GamePlay.showError('Empty cell');
          }
        }
      }
    }
  }

  characterTag(character) {
    return `🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`;
  }

  cellHasCharacter(index, callback, characterList = this.allCharactersList) {
    for (const posCharacter of characterList) {
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
      if (this.allCharacters.firstTeamPositioned.includes(posCharacter)) {
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

  enemyTurn() {
    for (const character of this.allCharacters.secondTeamPositioned) {
      const characterAttackRange = getRange(character, 'maxRange', this.gamePlay.boardSize);
      if (this.gameState.turn == 'second') {
        for (const index of characterAttackRange) {
          if (this.cellHasCharacter(index, (targetCharacter) => {
            if (this.allCharacters.firstTeamPositioned.includes(targetCharacter)) {
              const damage = character.character.attackTarget(targetCharacter.character);
              this.deleteDeadCharacters();
              this.gamePlay.redrawPositions(this.allCharactersList);
              this.gamePlay.showDamage(index, damage);
              this.gameState.changeTurn();
            }
          }, this.allCharacters.firstTeamPositioned)) {
            if (this.gameState.turn == 'second') {
              this.gameState.changeTurn();
            }
            return;
          }
        }
      }
    }
    if (this.gameState.turn == 'second') {
      this.enemyMove();
      this.gamePlay.redrawPositions(this.allCharactersList);
      this.gameState.changeTurn();
    }
  }
  
  enemyMove() {
    const firstCharPosition = getCharRowColumn(this.allCharacters.firstTeamPositioned[0], this.gamePlay.boardSize, this.gamePlay.rowsColumnsMap);
    const secondCharPosition = getCharRowColumn(this.allCharacters.secondTeamPositioned[0], this.gamePlay.boardSize, this.gamePlay.rowsColumnsMap);
    const charMoveRange = getRange(this.allCharacters.secondTeamPositioned[0], 'maxMoves', this.gamePlay.boardSize);
    const charIndexes = getCharIndexes(this.allCharactersList);
    let checkPosition;
    let newPosition;

    const rowDifference = Math.abs(secondCharPosition.row - firstCharPosition.row);
    if (secondCharPosition.row < firstCharPosition.row) {
      for (let index = 1; index <= rowDifference; index++) {
        checkPosition = this.allCharacters.secondTeamPositioned[0].position + (this.gamePlay.boardSize * index);
        if (charMoveRange.includes(checkPosition)) {
          if (!charIndexes.includes(checkPosition)) {
            newPosition = checkPosition;
          }
        }
      }
    } else {
      for (let index = 1; index <= rowDifference; index++) {
        checkPosition = this.allCharacters.secondTeamPositioned[0].position - (this.gamePlay.boardSize * index);
        if (charMoveRange.includes(checkPosition)) {
          if (!charIndexes.includes(checkPosition)) {
            newPosition = checkPosition;
          }
        }
      }
    }
    if (newPosition) {
      this.allCharacters.secondTeamPositioned[0].position = newPosition;
    }

    const columnDifference = Math.abs(secondCharPosition.column - firstCharPosition.column);
    if (secondCharPosition.column < firstCharPosition.column) {
      for (let index = 1; index <= columnDifference; index++) {
        checkPosition = this.allCharacters.secondTeamPositioned[0].position + index;
        if (charMoveRange.includes(checkPosition)) {
          if (!charIndexes.includes(checkPosition)) {
            newPosition = checkPosition;
          }
        }
      }
    } else {
      for (let index = 1; index <= columnDifference; index++) {
        checkPosition = this.allCharacters.secondTeamPositioned[0].position - index;
        if (charMoveRange.includes(checkPosition)) {
          if (!charIndexes.includes(checkPosition)) {
            newPosition = checkPosition;
          }
        }
      }
    }
    if (newPosition) {
      this.allCharacters.secondTeamPositioned[0].position = newPosition;
    }
  }
  
  deleteDeadCharacters() {
    for (const character of this.allCharactersList) {
      if (character.character.health <= 0) {
        let index = this.allCharacters.firstTeamPositioned.indexOf(character);
        if (index > -1) {
          this.allCharacters.firstTeamPositioned.splice(this.allCharacters.firstTeamPositioned.indexOf(character), 1);
          if (character == this.characterSelected) {
            this.gamePlay.deselectCell(this.characterSelected.position);
            this.characterSelected = undefined;
          }
        } else {
          index = this.allCharacters.secondTeamPositioned.indexOf(character);
          if (index > -1) {
            this.allCharacters.secondTeamPositioned.splice(this.allCharacters.secondTeamPositioned.indexOf(character), 1);
            this.gameState.getPoint();
            this.gamePlay.updateScore(this.gameState);
          }
        }
      }
    }
    if (!this.allCharacters.firstTeamPositioned.length) {
      this.finishGame();
      GamePlay.showMessage('You Lost!');
    }
    if (!this.allCharacters.secondTeamPositioned.length) {
      this.allCharacters.firstTeamPositioned.forEach((character) => character.character.levelUp());
      this.startNextLevel();
    }
  }
  
  startNextLevel() {
    this.characterSelected = undefined;
    const nextLevel = this.getNextLevelType;
    this.gameState.turn = 'first';
    this.gameState.currentLevelNumber++;
    if (!nextLevel) {
      this.finishGame();
      GamePlay.showMessage('You Won!');
    } else {
      this.gamePlay.drawUi(nextLevel);
  
      const firstTeam = generateTeam(this.firstTeamAllowedCharacters, this.gameState.currentLevelNumber, 1);
      this.allCharacters.firstTeamPositioned.forEach(item => firstTeam.characters.add(item.character));
      const secondTeam = generateTeam(this.secondTeamAllowedCharacters, this.gameState.currentLevelNumber, this.getNextEnemiesAmount);
      const teamPositionsList = this.getPositions();
      const firstTeamPositioned = this.initPositionTeam(firstTeam, teamPositionsList.firstTeamPositionsList);
      const secondTeamPositioned = this.initPositionTeam(secondTeam, teamPositionsList.secondTeamPositionsList);
      this.allCharacters.firstTeamPositioned = firstTeamPositioned;
      this.allCharacters.secondTeamPositioned = secondTeamPositioned;
      this.gamePlay.redrawPositions(this.allCharactersList);
    }
  }

  finishGame() {
    this.gameState.running = false;
    let cellIndex = 0;
    for (let row = 0; row < this.gamePlay.boardSize; row++) {
      for (let column = 0; column < this.gamePlay.boardSize; column++) {
          this.gamePlay.deselectCell(cellIndex);
          cellIndex++;
      }
    }
  }

  startNewGame() {
    this.gameState.running = true;
    this.refreshLevels();
    this.refreshEnemies();
    this.gameState.refreshPoints();
    
    this.gamePlay.drawUi(themes.prairie);
    this.#currentLevel = themes.prairie;

    const firstTeam = generateTeam(this.firstTeamAllowedCharacters, this.gameState.currentLevelNumber, 2);
    const secondTeam = generateTeam(this.secondTeamAllowedCharacters, this.gameState.currentLevelNumber, 2);
    const teamPositionsList = this.getPositions();
    const firstTeamPositioned = this.initPositionTeam(firstTeam, teamPositionsList.firstTeamPositionsList);
    const secondTeamPositioned = this.initPositionTeam(secondTeam, teamPositionsList.secondTeamPositionsList);
    this.allCharacters.firstTeamPositioned = firstTeamPositioned;
    this.allCharacters.secondTeamPositioned = secondTeamPositioned;
    this.gamePlay.redrawPositions(this.allCharactersList);
    this.gamePlay.updateScore(this.gameState);
  }

  saveGame() {
    this.gameState.firstTeamList = this.allCharacters.firstTeamPositioned;
    this.gameState.secondTeamList = this.allCharacters.secondTeamPositioned;
    this.gameState.currentLevel = this.currentLevel;
    this.gameState.nextLevelsList = this.nextLevelsList;
    this.stateService.save(this.gameState);
    GamePlay.showMessage('Game is saved');
  }

  loadGame() {
    try {
      const { maxPoints } = this.gameState;
      const savedData = this.stateService.load();
      this.gameState = GameState.from(savedData);
      if (maxPoints > this.gameState.maxPoints) {
        this.gameState.maxPoints = maxPoints;
      }
  
      this.characterSelected = undefined;
      const nextLevel = this.gameState.currentLevel;
      this.#currentLevel = nextLevel;
      this.setlevelTypes(this.gameState.nextLevelsList);
      this.gamePlay.drawUi(nextLevel);
      
      this.allCharacters.firstTeamPositioned = this.gameState.firstTeamList.map(data => this.createCharacterFromData(data));
      this.allCharacters.secondTeamPositioned = this.gameState.secondTeamList.map(data => this.createCharacterFromData(data));
      this.gamePlay.redrawPositions(this.allCharactersList);
      this.gamePlay.updateScore(this.gameState);
      setTimeout(() => {
        GamePlay.showMessage('Game is loaded');
      }, 100);
    } catch {
      GamePlay.showError('Cannot find saved data');
    }
  }

  createCharacterFromData(data) {
    if (Object.keys(this.#characterTypes).includes(data.character.type)) {
      const character = new this.#characterTypes[data.character.type](data.character.level, data.character.attack, data.character.defence, data.character.health, true);
      return new PositionedCharacter(character, data.position);
    }
  }
}
