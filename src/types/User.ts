//type in app, need to create this on login
export type User = {
  username: string;
  color: string;
  iconCharacter: string;
  id: string;
  photoURL: string;
};

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
