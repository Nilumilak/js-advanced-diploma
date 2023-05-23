import Character from "../Character";

test('Test Cannot create Character', () => {
    expect(() => new Character(1)).toThrow('Cannot create class Character');
});
