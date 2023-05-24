import Swordsman from '../Swordsman';

test('Base Swordsman Level', () => {
    const character = new Swordsman(1);
    expect(character.level).toBe(1);
});

test('Base Swordsman Attack', () => {
    const character = new Swordsman(1);
    expect(character.attack).toBe(40);
});

test('Base Swordsman Defence', () => {
    const character = new Swordsman(1);
    expect(character.defence).toBe(10);
});

test('Base Swordsman Health', () => {
    const character = new Swordsman(1);
    expect(character.health).toBe(50);
});

test('Base Swordsman Health', () => {
    const character = new Swordsman(1);
    expect(character.type).toBe('swordsman');
});
