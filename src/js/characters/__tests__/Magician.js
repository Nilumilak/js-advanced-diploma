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
    expect(character.health).toBe(100);
});

test('Base Magician Health', () => {
    const character = new Magician(1);
    expect(character.type).toBe('Magician');
});
