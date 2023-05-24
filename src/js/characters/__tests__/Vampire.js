import Vampire from '../Vampire';

test('Base Vampire Level', () => {
    const character = new Vampire(1);
    expect(character.level).toBe(1);
});

test('Base Vampire Attack', () => {
    const character = new Vampire(1);
    expect(character.attack).toBe(25);
});

test('Base Vampire Defence', () => {
    const character = new Vampire(1);
    expect(character.defence).toBe(25);
});

test('Base Vampire Health', () => {
    const character = new Vampire(1);
    expect(character.health).toBe(50);
});

test('Base Vampire Health', () => {
    const character = new Vampire(1);
    expect(character.type).toBe('vampire');
});

test('Base Vampire Moves', () => {
    const character = new Vampire(1);
    expect(character.maxMoves).toBe(2);
});

test('Base Vampire Range', () => {
    const character = new Vampire(1);
    expect(character.maxRange).toBe(2);
});

test('Attack', () => {
    const character1 = new Vampire(1);
    const character2 = new Vampire(1);
    character1.attackTarget(character2);
    expect(character2.health).toBe(47.5);
});
