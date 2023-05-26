import GameStateService from "../GameStateService";

class LocalStorage {
    #data = {};

    getItem(key) {
        return this.#data[key];
    }

    setItem(key, newdata) {
        this.#data[key] = newdata;
    }
}

test('GameStateSevice load', () => {
    const localStorage = new LocalStorage();
    const gameStateServie = new GameStateService(localStorage);
    const testObject = {
        1: 'test',
        2: 'test',
    };
    gameStateServie.save(testObject);
    expect(gameStateServie.load()).toEqual(testObject);
});

test('GameStateSevice load Error', () => {
    const localStorage = new LocalStorage();
    const gameStateServie = new GameStateService(localStorage);
    expect(() => gameStateServie.load()).toThrow('Invalid state');
});
