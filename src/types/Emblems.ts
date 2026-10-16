export type EmblemType =
  | "allTimeLeader"
  | "allTimeSecondPlace"
  | "allTimeThirdPlace"
  | "onFire"
  | "lastWeekWinner"
  | "allTimeLastPlace";

export type EmblemProfile = {
  userId: string;
  emblems: EmblemType[];
};
