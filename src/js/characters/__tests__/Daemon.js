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

test('Base Daemon Moves', () => {
    const character = new Daemon(1);
    expect(character.maxMoves).toBe(1);
});

test('Base Daemon Range', () => {
    const character = new Daemon(1);
    expect(character.maxRange).toBe(4);
});

test('Attack', () => {
    const character1 = new Daemon(1);
    const character2 = new Daemon(1);
    character1.attackTarget(character2);
    expect(character2.health).toBe(49);
});
