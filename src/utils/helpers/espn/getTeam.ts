import { Competitors } from "../../../types/Competitors";
import { Game } from "../../../types/Game";

export const getHomeTeam = (game: Game): Competitors | null => {
  return game?.competitors.find(({ isHome }) => isHome) || null;
};

export const getAwayTeam = (game: Game): Competitors | null => {
  return game?.competitors.find(({ isHome }) => !isHome) || null;
};
