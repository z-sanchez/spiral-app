import { Record } from "./Record";

export type Team = {
  abbreviation: string;
  id: string;
  location: string;
  name: string;
  color: string;
  alternateColor: string;
  record: Record;
};
