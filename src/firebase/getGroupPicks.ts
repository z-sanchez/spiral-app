import { Firestore, collection, getDocs } from "firebase/firestore";
import { UserPicksObject } from "../types/Firebase";

export const getGroupPicks = async (db: Firestore) => {
  const querySnapshot = await getDocs(collection(db, "picks"));
  const groupUserPickObjects: UserPicksObject[] = [];

  querySnapshot.forEach((result) => {
    const userPickObject = result.data() as UserPicksObject;

    groupUserPickObjects.push(userPickObject);
  });

  //return all groupUsers

  return groupUserPickObjects;
};
