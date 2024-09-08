import { Firestore, collection, getDocs } from "firebase/firestore";
import { UserPicksObject } from "../types/Firebase";
import { updateUserPickObjectForFirebase } from "../utils/helpers/firebase/picks";
import { updateUserPickObject } from "./updateUserPicks";
import { fetchCurrentWeekParams } from "../utils/helpers/espn/fetchWeekData";
import getGroupPicksMockResult from "../mock/getGroupPicks.json";

export const updateGroupPicks = async (db: Firestore) => {
  let groupUserPickObjects: UserPicksObject[] = [];

  if (import.meta.env.VITE_USE_MOCK_DATA) {
    groupUserPickObjects = getGroupPicksMockResult;
  } else {
    const querySnapshot = await getDocs(collection(db, "picks"));

    querySnapshot.forEach((result) => {
      const userPickObject = result.data() as UserPicksObject;

      groupUserPickObjects.push(userPickObject);
    });
  }

  const latestParams = await fetchCurrentWeekParams().then((result) => result);
  const latestWeekNumber =
    latestParams.seasontype !== 2 ? 1 : latestParams.week;

  const latestYearNumber = latestParams.year;

  groupUserPickObjects = await Promise.all(
    groupUserPickObjects.map(async (pickObject) => {
      const updatedObject = await updateUserPickObjectForFirebase(
        pickObject,
        latestWeekNumber,
        latestYearNumber
      );
      //update user pick object
      updateUserPickObject(updatedObject.id, updatedObject, db);

      return updatedObject;
    })
  );

  //return all groupUsers

  return groupUserPickObjects;
};
