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
    expect(character.health).toBe(50);
});

test('Base Bowman Health', () => {
    const character = new Bowman(1);
    expect(character.type).toBe('bowman');
});

test('Base Bowman Moves', () => {
    const character = new Bowman(1);
    expect(character.maxMoves).toBe(2);
});

test('Base Bowman Range', () => {
    const character = new Bowman(1);
    expect(character.maxRange).toBe(2);
});

test('Attack', () => {
    const character1 = new Bowman(1);
    const character2 = new Bowman(1);
    character1.attackTarget(character2);
    expect(character2.health).toBe(47.5);
});

test('levelUp', () => {
    expect.assertions(4);
    const character = new Bowman(1);
    character.levelUp();
    expect(character.level).toBe(2);
    expect(character.attack).toBe(32.5);
    expect(character.defence).toBe(32.5);
    expect(character.health).toBe(100);
});
