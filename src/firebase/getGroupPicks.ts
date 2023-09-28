import { Firestore, collection, getDocs } from "firebase/firestore";
import { UserPicksObject } from "../types/Firebase";
import getGroupPicksMockResult from "../mock/getGroupPicks.json";

export const getGroupPicks = async (db: Firestore) => {
  if (import.meta.env.VITE_USE_MOCK_DATA) return getGroupPicksMockResult;

  const querySnapshot = await getDocs(collection(db, "picks"));
  const groupUserPickObjects: UserPicksObject[] = [];

  querySnapshot.forEach((result) => {
    const userPickObject = result.data() as UserPicksObject;

    groupUserPickObjects.push(userPickObject);
  });

  //return all groupUsers

  return groupUserPickObjects;
};
