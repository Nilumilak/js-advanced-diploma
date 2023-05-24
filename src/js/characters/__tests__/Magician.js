import Magician from '../Magician';

test('Base Magician Level', () => {
    const character = new Magician(1);
    expect(character.level).toBe(1);
});

test('Base Magician Attack', () => {
    const character = new Magician(1);
    expect(character.attack).toBe(10);
});

test('Base Magician Defence', () => {
    const character = new Magician(1);
    expect(character.defence).toBe(40);
});

test('Base Magician Health', () => {
    const character = new Magician(1);
    expect(character.health).toBe(50);
});

test('Base Magician Health', () => {
    const character = new Magician(1);
    expect(character.type).toBe('magician');
});

test('Base Magician Moves', () => {
    const character = new Magician(1);
    expect(character.maxMoves).toBe(1);
});

test('Base Magician Range', () => {
    const character = new Magician(1);
    expect(character.maxRange).toBe(4);
});

test('Attack', () => {
    const character1 = new Magician(1);
    const character2 = new Magician(1);
    character1.attackTarget(character2);
    expect(character2.health).toBe(49);
});
