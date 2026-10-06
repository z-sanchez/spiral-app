import { Record } from "./Record";

export type User = {
  username: string;
  color: string;
  iconCharacter: string;
  id: string;
  photoURL: string | null;
  email: string;
  leagueId: string | null;
};

export type UserStanding = {
  id: string;
  record: Record;
  winningPercentage: number;
  rank: number;
  gamesBack?: number;
  streak?: { count: number; type: "win" | "loss" };
};

export type CurrentWeekStandings = UserStanding[];

export type AllTimeStandings = UserStanding[];

export type League = {
  id: string;
  name: string;
  key: string;
  userIds: string[];
  currentWeekStandings: CurrentWeekStandings;
  allTimeStandings: AllTimeStandings;
  computedWeekStandings: { [key: string]: CurrentWeekStandings };
  lastUpdatedAt: string;
  lastComputedWeek: string;
};
