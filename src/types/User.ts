import { Picks } from "./Picks";
import { Record } from "./Record";

export type User = {
  username: string;
  color: string;
  iconCharacter: string;
  id: string;
  record: {
    wins: number;
    loses: number;
  };
  coins: number;
};

export type ExtendedUser = {
  username: string;
  color: string;
  iconCharacter: string;
  id: string;
  email: string;
  groupGameData?: {
    goupId: string;
    roi: number;
    record: Record;
    picks: Picks;
  }[];
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
