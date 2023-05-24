import Team from "../Team";
import Bowman from "../characters/Bowman";

test('Team add character', () => {
    expect.assertions(2);
    const team = new Team();
    const character = new Bowman(1);
    team.add(character);
    expect(team.characters.size).toBe(1);
    expect(team.characters).toContain(character);
});

test('Character already exists', () => {
    const team = new Team();
    const character = new Bowman(1);
    team.add(character);
    expect(() => team.add(character)).toThrow(`Character ${character} is already in the team`);
});
