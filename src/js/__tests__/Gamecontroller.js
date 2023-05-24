import GameController from "../GameController";
import GamePlay from "../GamePlay";
import Bowman from "../characters/Bowman";

const gamePlay = new GamePlay();
const gameController = new GameController(gamePlay, undefined);

test('characterTag', () => {
    const character = new Bowman(2);
    expect(gameController.characterTag(character)).toBe(`🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`);
});
