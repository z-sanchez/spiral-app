import { Picks } from "./Picks";

export type User = {
  username: string;
  color: string;
  iconCharacter: string;
  id: string;
  photoURL: string | null;
  email: string;
};

export type UserPicksObject = {
  id: string;
  username: string;
  picks: Map<string, Picks>;
};
