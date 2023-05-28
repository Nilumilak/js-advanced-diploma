import GameController from "../GameController";
import GamePlay from "../GamePlay";
import Bowman from "../characters/Bowman";
import PositionedCharacter from "../PositionedCharacter";

const gamePlay = new GamePlay();
const gameController = new GameController(gamePlay, undefined);

test('characterTag', () => {
    const character = new Bowman(2);
    expect(gameController.characterTag(character)).toBe(`🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`);
});

test('createCharacterFromData', () => {
    expect.assertions(5);
    const data = {
        character: {
            level: 3,
            attack: 57,
            defence: 57,
            health: 100,
            type: "bowman", 
        },
        position: 20,
    };
    const character = new PositionedCharacter(new Bowman(3), 20);
    const createdCharacter = gameController.createCharacterFromData(data);

    expect(character.character.level).toBe(createdCharacter.character.level);
    expect(character.character.attack).toBe(createdCharacter.character.attack);
    expect(character.character.defence).toBe(createdCharacter.character.defence);
    expect(character.character.health).toBe(createdCharacter.character.health);
    expect(character.position).toBe(createdCharacter.position);
});
