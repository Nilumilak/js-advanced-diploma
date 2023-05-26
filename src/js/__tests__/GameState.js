import GameState from "../GameState";

test('changeTurn', () => {
    expect.assertions(2);
    const gameState = new GameState();

    gameState.changeTurn();
    expect(gameState.turn).toBe('second');
    gameState.changeTurn();
    expect(gameState.turn).toBe('first');
});

test('getPoint', () => {
    const gameState = new GameState();

    gameState.getPoint();
    expect(gameState.points).toBe(1);
});

test('refreshPoints', () => {
    const gameState = new GameState();

    gameState.getPoint();
    gameState.refreshPoints();
    expect(gameState.points).toBe(0);
});

test('saveMaxPoints', () => {
    const gameState = new GameState();

    gameState.getPoint();
    gameState.saveMaxPoints();
    expect(gameState.maxPoints).toBe(1);
});
