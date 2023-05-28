import Character from "../Character";
import Bowman from "../characters/Bowman";

test('Test Cannot create Character', () => {
    expect(() => new Character(1)).toThrow('Cannot create class Character');
});

test('Create character with level 2', () => {
    expect.assertions(4);
    const character = new Bowman(2);
    expect(character.level).toBe(2);
    expect(character.attack).toBe(32);
    expect(character.defence).toBe(32);
    expect(character.health).toBe(100);
});

test('Create character with max level', () => {
    const character = new Bowman(4);
    character.levelUp();
    expect(character.level).toBe(4);
    expect(character.attack).toBe(102);
    expect(character.defence).toBe(102);
    expect(character.health).toBe(100);
});
