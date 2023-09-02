import { Picks } from "./Picks";
import { Record } from "./Record";

//model in firebase
export type UserObject = {
  username: string;
  color: string;
  iconCharacter: string;
  id: string;
  email: string;
  groupGameData: {
    goupId: string;
    roi: number;
    record: Record;
    picks: Picks;
  }[];
};
