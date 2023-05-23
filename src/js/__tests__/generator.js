import { characterGenerator, generateTeam } from "../generators";
import Bowman from "../characters/Bowman"
import Swordsman from "../characters/Swordsman"
import Magician from "../characters/Magician"
import Team from "../Team";

test('characterGenerator', () => {
    expect.assertions(2)
    const allowedTypes = [Bowman, Swordsman, Magician];
    const generator = characterGenerator(allowedTypes, 4);
    expect([1, 2, 3, 4]).toContain(generator.next().value.level);
    expect(['Bowman', 'Swordsman', 'Magician']).toContain(generator.next().value.type);
});

test('generateTeam', () => {
    expect.assertions(2)
    const allowedTypes = [Bowman, Swordsman, Magician];
    const team = generateTeam(allowedTypes, 4, 3);
    expect(team.characters.size).toBe(3);
    expect(team).toBeInstanceOf(Team);
});
