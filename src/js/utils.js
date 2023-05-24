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

export function createTileMap(boardSize) {
  const tileMap = {};
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
      index++;
    }
  }
  return tileMap;
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
