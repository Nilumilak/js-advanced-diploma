import {
    calcTileType, 
    createTileMap, 
    getRange, 
    getCharIndexes,
} from "../utils";
import PositionedCharacter from "../PositionedCharacter";
import Magician from "../characters/Magician";
import Undead from "../characters/Undead";

const testTileMap = {
    0: 'top-left',
    1: 'top',
    2: 'top',
    3: 'top',
    4: 'top',
    5: 'top',
    6: 'top',
    7: 'top-right',
    8: 'left',
    9: 'center',
    10: 'center',
    11: 'center',
    12: 'center',
    13: 'center',
    14: 'center',
    15: 'right',
    16: 'left',
    17: 'center',
    18: 'center',
    19: 'center',
    20: 'center',
    21: 'center',
    22: 'center',
    23: 'right',
    24: 'left',
    25: 'center',
    26: 'center',
    27: 'center',
    28: 'center',
    29: 'center',
    30: 'center',
    31: 'right',
    32: 'left',
    33: 'center',
    34: 'center',
    35: 'center',
    36: 'center',
    37: 'center',
    38: 'center',
    39: 'right',
    40: 'left',
    41: 'center',
    42: 'center',
    43: 'center',
    44: 'center',
    45: 'center',
    46: 'center',
    47: 'right',
    48: 'left',
    49: 'center',
    50: 'center',
    51: 'center',
    52: 'center',
    53: 'center',
    54: 'center',
    55: 'right',
    56: 'bottom-left',
    57: 'bottom',
    58: 'bottom',
    59: 'bottom',
    60: 'bottom',
    61: 'bottom',
    62: 'bottom',
    63: 'bottom-right',
};

test.each([
    ['top-left', 0],
    ['top', 5],
    ['top-right', 7],
    ['left', 8],
    ['right', 15],
    ['bottom-left', 56],
    ['bottom', 60],
    ['bottom-right', 63],
    ['center', 35],
])('Test calcTileType: %s', (tileType, index) => {
    expect(calcTileType(index, testTileMap)).toBe(tileType);
});

test('Test createTileMap', () => {
    expect(createTileMap(8)).toEqual(testTileMap);
});

test('getRange moves', () => {
    const character = new Magician(1);
    const posCharacter = new PositionedCharacter(character, 12);
    expect(getRange(posCharacter, 'maxMoves', 5)).toEqual([6, 7, 8, 11, 13, 16, 17, 18]);
});

test('getRange attack range', () => {
    const character = new Undead(1);
    const posCharacter = new PositionedCharacter(character, 12);
    expect(getRange(posCharacter, 'maxRange', 5)).toEqual([6, 7, 8, 11, 13, 16, 17, 18]);
});

test('getCharIndexed', () => {
    const character = new Undead(1);
    const posCharacter1 = new PositionedCharacter(character, 12);
    const posCharacter2 = new PositionedCharacter(character, 13);
    const posCharacter3 = new PositionedCharacter(character, 14);
    expect(getCharIndexes([posCharacter1, posCharacter2, posCharacter3])).toEqual([12, 13, 14]);
});
