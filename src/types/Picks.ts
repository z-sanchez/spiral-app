export type SeasonPicks = { picks: WeekPicks; id: string; username: string };

export type WeekPicks = { [key: string]: GamePick };

type GamePick = { [key: string]: string };
