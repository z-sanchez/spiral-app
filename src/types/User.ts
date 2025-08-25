export type Group = {
  id: string;
  players: string[];
  seasonPot: number;
  weekPots: [];
};

export type WeekPot = {
  id: string;
  pot: number;
  ante: number;
  players: string[];
  multipliers: {
    first: number;
    second: number;
    third: number;
  };
};
