import { Picks } from "./Picks";
import { Record } from "./Record";

//type in app, need to create this on login
export type User = {
  username: string;
  color: string;
  iconCharacter: string;
  id: string;
  record: Record;
  roi: number;
  picks: Picks;
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
