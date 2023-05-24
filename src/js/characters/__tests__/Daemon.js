import Daemon from '../Daemon';

test('Base Daemon Level', () => {
    const character = new Daemon(1);
    expect(character.level).toBe(1);
});

test('Base Daemon Attack', () => {
    const character = new Daemon(1);
    expect(character.attack).toBe(10);
});

test('Base Daemon Defence', () => {
    const character = new Daemon(1);
    expect(character.defence).toBe(10);
});

test('Base Daemon Health', () => {
    const character = new Daemon(1);
    expect(character.health).toBe(50);
});

test('Base Daemon Health', () => {
    const character = new Daemon(1);
    expect(character.type).toBe('daemon');
});
