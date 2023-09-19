import { Firestore } from "firebase/firestore";
import { getUserPicksByEmail } from "./getUserPicks";
import { UserPicksObject } from "../types/Firebase";

const emails = [
  "ricksanchez3@yahoo.com",
  "samanthasanchez887@gmail.com",
  "amanda3491@gmail.com",
  "zieksanchez3@gmail.com",
  "mumychelsea@gmail.com",
];

export const logUserPicks = async (db: Firestore) => {
  const userPicks: UserPicksObject[] = [];

  emails.forEach(async (email) => {
    const userPick = await getUserPicksByEmail({ userEmail: email, db });
    userPicks.push(userPick);
  });

  console.log({ userPicks });
};
