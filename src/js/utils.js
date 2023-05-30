/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index, tileMap) {
  // TODO: ваш код будет тут
  return tileMap[index];
}

export function createBoardMap(boardSize) {
  const tileMap = {};
  const rowsColumnsMap = {};
  let index = 0;
  for (let row = 0; row < boardSize; row++) {
    for (let column = 0; column < boardSize; column++) {
      if (row == 0 && column == 0) {
        tileMap[index] = 'top-left';
      } else if (row == 0 && column == boardSize - 1) {
        tileMap[index] = 'top-right';
      } else if (row == boardSize - 1 && column == 0) {
        tileMap[index] = 'bottom-left';
      } else if (row == boardSize - 1 && column == boardSize - 1) {
        tileMap[index] = 'bottom-right';
      } else if (row == 0) {
        tileMap[index] = 'top';
      } else if (row == boardSize - 1) {
        tileMap[index] = 'bottom';
      } else if (column == 0) {
        tileMap[index] = 'left';
      } else if (column == boardSize - 1) {
        tileMap[index] = 'right';
      } else {
        tileMap[index] = 'center';
      }
      if (rowsColumnsMap[`row${row}`] == undefined) {
        rowsColumnsMap[`row${row}`] = [index];
      } else {
        rowsColumnsMap[`row${row}`].push(index);
      }
      if (rowsColumnsMap[`column${column}`] == undefined) {
        rowsColumnsMap[`column${column}`] = [index];
      } else {
        rowsColumnsMap[`column${column}`].push(index);
      }
      
      index++;
    }
  }
  return [tileMap, rowsColumnsMap];
}

export function getCharRowColumn(character, boardSize, rowsColumnsMap) {
  const rowColumn = {};
  for (let index = 0; index < boardSize; index++) {
    if (rowsColumnsMap[`row${index}`].includes(character.position)) {
      rowColumn.row = index;
    }
    if (rowsColumnsMap[`column${index}`].includes(character.position)) {
      rowColumn.column = index;
    }
  }
  return rowColumn;
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}

export function getRange(posCharacter, type, boardSize) {
  let position = 0;
  for (let row = 0; row < boardSize; row++) {
    for (let column = 0; column < boardSize; column++) {
      if (position == posCharacter.position) {
        const range = posCharacter.character[type];
        return getRangeList(posCharacter, column, boardSize, range);
      }
      position++;
    }
  }
}

export function getCharIndexes(charList) {
  const indexList = [];
  for (const posCharacter of charList) {
    indexList.push(posCharacter.position);
  }
  return indexList;
}

function getRangeList(posCharacter, charColumn, boardSize, range) {
  const rangeList = [];

  let leftIndex = posCharacter.position - (range * (boardSize + 1));
  let columnEnd = range * 2;

  if (charColumn < range) {
    leftIndex += range - charColumn;
    columnEnd -= range - charColumn;
  } else if (boardSize - charColumn - 1 < range) {
    columnEnd -= range - (boardSize - charColumn - 1);
  }

  for (let rangeRow = 0; rangeRow <= range * 2; rangeRow++) {
    for (let rangeIndex = leftIndex; rangeIndex <= leftIndex + columnEnd; rangeIndex++) {
      if (rangeIndex != posCharacter.position) {
        rangeList.push(rangeIndex);
      }
    }
    leftIndex += boardSize;
  }
  return rangeList;
}
