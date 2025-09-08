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
  color: string;
};

export type CurrentWeekStandings = UserStanding[];

export type AllTimeStandings = (UserStanding & {
  gamesBack: number;
  emblemStatus: string[];
})[];

export type League = {
  name: string;
  userIds: string[];
  currentWeekStandings: CurrentWeekStandings;
  allTimeStandings: AllTimeStandings;
  previousWeekStandings: { [key: string]: AllTimeStandings };
  lastUpdatedWeek: string;
  lastCompletedWeek: string;
  lastUpdatedAt: string;
};
