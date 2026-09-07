export type SeasonPicks = {
  picks: WeekPicks;
  id: string;
  username: string;
  pickPreferenceRanking: { [key: string]: number };
};

export type WeekPicks = { [key: string]: Picks };

export type Picks = { [key: string]: string };
