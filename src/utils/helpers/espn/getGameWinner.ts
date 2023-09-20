import { Competitors } from "../../../types/Competitors";
import { Game } from "../../../types/Game";

//returns false if tie
export const getGameWinner = (game: Game): Competitors | false => {
  const teamOne = game.competitors[0];
  const teamTwo = game.competitors[1];

  const isTie = teamOne.score === teamTwo.score ? true : false;

  if (!isTie) {
    return Number(teamOne?.score) > Number(teamTwo?.score) ? teamOne : teamTwo;
  }

  return false;
};
