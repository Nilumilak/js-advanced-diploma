import Undead from '../Undead';

test('Base Undead Level', () => {
    const character = new Undead(1);
    expect(character.level).toBe(1);
});

test('Base Undead Attack', () => {
    const character = new Undead(1);
    expect(character.attack).toBe(40);
});

test('Base Undead Defence', () => {
    const character = new Undead(1);
    expect(character.defence).toBe(10);
});

test('Base Undead Health', () => {
    const character = new Undead(1);
    expect(character.health).toBe(50);
});

test('Base Undead Health', () => {
    const character = new Undead(1);
    expect(character.type).toBe('undead');
});
