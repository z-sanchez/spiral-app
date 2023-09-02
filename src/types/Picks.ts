export type Picks = WeekPicks[];

type WeekPicks = {
  weekId: string;
  games: PickGame[];
};

type PickGame = {
  gameId: string;
  pick: PickOptions;
  winner: PickOptions;
};

enum PickOptions {
  HOME = "home",
  AWAY = "away",
  NONE = "none",
}
