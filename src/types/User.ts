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

type ExtendedUser = {
  username: string;
  color: string;
  iconCharacter: string;
  id: string;
  record: Record;
  coins: number;
  email: string;
  picks: Picks;
};
