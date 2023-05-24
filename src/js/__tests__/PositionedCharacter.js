import { experiments } from "webpack";
import PositionedCharacter from "../PositionedCharacter";
import Bowman from "../characters/Bowman";

const character = new Bowman(2);

test('new PositionedCharacter', () => {
    expect.assertions(2);
    const positionedCharacter = new PositionedCharacter(character, 5);
    expect(positionedCharacter.character).toBe(character);
    expect(positionedCharacter.position).toBe(5);
});

test('character must be instance of Character or its children', () => {
    expect(() => new PositionedCharacter(NaN, 5)).toThrow('character must be instance of Character or its children');
});

test('position must be a number', () => {
    expect(() => new PositionedCharacter(character, 'test')).toThrow('position must be a number');
});
