export type Picks = WeekPicks[];

export type WeekPicks = {
  id: string;
  games: PickGame[];
  status: string;
};

type PickGame = {
  id: string;
  pick: string;
  winner: string;
  status: string;
};
