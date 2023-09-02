import { Record } from "./Record";

export type Picks = WeekPicks[];

type WeekPicks = {
  id: string;
  games: PickGame[];
  record: Record;
};

type PickGame = {
  id: string;
  pick: PickOptions;
  winner: GAME_WINNER;
};

enum GAME_WINNER {
  HOME = "home",
  AWAY = "away",
  TIE = "tie",
  NOT_COMPLETED = "not completed",
}

enum PickOptions {
  HOME = "home",
  AWAY = "away",
  NO_PICK = "no pick",
}
