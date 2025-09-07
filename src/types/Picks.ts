export type SeasonPicks = { picks: WeekPicks; id: string; username: string };

export type WeekPicks = { [key: string]: Picks };

export type Picks = { [key: string]: string };
