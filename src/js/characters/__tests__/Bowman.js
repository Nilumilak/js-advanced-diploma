import Bowman from '../Bowman';

test('Base Bowman Level', () => {
    const character = new Bowman(1);
    expect(character.level).toBe(1);
});

test('Base Bowman Attack', () => {
    const character = new Bowman(1);
    expect(character.attack).toBe(25);
});

test('Base Bowman Defence', () => {
    const character = new Bowman(1);
    expect(character.defence).toBe(25);
});

test('Base Bowman Health', () => {
    const character = new Bowman(1);
    expect(character.health).toBe(100);
});

test('Base Bowman Health', () => {
    const character = new Bowman(1);
    expect(character.type).toBe('Bowman');
});
