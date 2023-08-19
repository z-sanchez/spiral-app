import { Competitors } from "./Competitors";

export type Game = {
  date: string;
  id: string;
  links: { href: string }[];
  name: string;
  shortName: string;
  competitors: Competitors[];
  venue: string;
};
