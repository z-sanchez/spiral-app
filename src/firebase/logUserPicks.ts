import { Firestore } from "firebase/firestore";
import { getUserPicksByIdForLogging } from "./getUserPicks";
import { UserPicksObject } from "../types/Firebase";

const emails = [
  "uOuggH3osrNoBDi20594olte9f82", //rick
  "GltrBWMcoxaKj0WFKpQVY9qAumb2", //sam
  "Df7FOWz8bcg3KDujgMa6aPM5JSg1", //amanda
  "6mwSuKjLhIPYd96mIcAjC8sUUZc2", //ziek
  "5AeB9qQUglQHvx7X05qp2B69nIw1", //bella
];

export const logUserPicks = async (db: Firestore) => {
  const userPicks: UserPicksObject[] = [];

  emails.forEach(async (id) => {
    const userPick = await getUserPicksByIdForLogging({ userId: id, db });
    userPicks.push(userPick);
  });

  console.log({ userPicks });
};
