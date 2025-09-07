import { Record } from "./Record";

export type User = {
  username: string;
  color: string;
  iconCharacter: string;
  id: string;
  photoURL: string | null;
  email: string;
};

export type UserStanding = {
  id: string;
  name: string;
  record: Record;
  winningPercentage: number;
  rank: number;
};

export type CurrentWeekStandings = UserStanding[];

export type AllTimeStandings = (UserStanding & {
  gamesBack: number;
  emblemStatus: string[];
})[];

export type League = {
  id: string;
  name: string;
  userIds: string[];
  currentWeekStandings: CurrentWeekStandings;
  allTimeStandings: AllTimeStandings;
  previousWeekStandings: AllTimeStandings[];
  lastUpdatedWeek: string;
  lastUpdatedAt: string;
};
