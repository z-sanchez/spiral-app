import { Firestore } from "firebase/firestore";
import { UserPicksObject } from "../types/Firebase";
import { createNewPicksUserInFirebase } from "./createNewPicksUserInFirebase";

export const uploadUserPicksFromJson = async (
  userPicks: UserPicksObject[],
  db: Firestore
) => {
  userPicks.forEach((userPickObject) => {
    createNewPicksUserInFirebase({ newUser: userPickObject, db });
  });
};
