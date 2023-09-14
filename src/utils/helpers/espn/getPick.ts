import { Picks } from "../../../types/Picks";
import { NO_PICK } from "../../constants";

export const getPick = (weekId: string, gameId: string, userPicks: Picks) => {
  const pick = userPicks
    .find((week) => weekId === week.id)
    ?.games.find((game) => game.id === gameId)?.pick;

  if (!pick) return NO_PICK;

  return pick;
};
