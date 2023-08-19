import { Team } from "./Team";

export type Competitors = Team & {
  score: string;
  isHome: boolean;
};
