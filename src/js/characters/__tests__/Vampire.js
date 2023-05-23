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
    expect(character.health).toBe(100);
});

test('Base Vampire Health', () => {
    const character = new Vampire(1);
    expect(character.type).toBe('Vampire');
});
