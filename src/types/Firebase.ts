import { Picks } from "./Picks";
import { Record } from "./Record";

//model in firebase
export type UserObject = {
  username: string;
  color: string;
  iconCharacter: string;
  id: string;
  email: string;
  photoUrl: string;
};

export type UserPicksObject = {
  id: string;
  username: string;
  roi: number;
  record: Record;
  picks: Picks;
  color?: string;
};
