import { Record } from "./Record";

export type Picks = WeekPicks[] | null;

type WeekPicks = {
  id: string;
  games: PickGame[];
  record: Record;
};

type PickGame = {
  id: string;
  pick: PickOptions;
  winner: PickOptions;
};

enum PickOptions {
  HOME = "home",
  AWAY = "away",
  TIE = "tie",
  NOT_COMPLETED = "not completed",
}
