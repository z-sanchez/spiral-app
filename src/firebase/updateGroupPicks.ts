import { Firestore, collection, getDocs } from "firebase/firestore";
import { UserPicksObject } from "../types/Firebase";
import { updateUserPickObjectForFirebase } from "../utils/helpers/firebase/picks";
import { updateUserPickObject } from "./updateUserPicks";
import { fetchCurrentWeekParams } from "../utils/helpers/espn/fetchWeekData";

export const updateGroupPicks = async (db: Firestore) => {
  const querySnapshot = await getDocs(collection(db, "picks"));
  let groupUserPickObjects: UserPicksObject[] = [];

  querySnapshot.forEach((result) => {
    const userPickObject = result.data() as UserPicksObject;

    groupUserPickObjects.push(userPickObject);
  });

  const latestWeekNumber = await fetchCurrentWeekParams().then(
    (result) => result.week
  );

  groupUserPickObjects = await Promise.all(
    groupUserPickObjects.map(async (pickObject) => {
      const updatedObject = await updateUserPickObjectForFirebase(
        pickObject,
        latestWeekNumber
      );
      //update user pick object
      updateUserPickObject(updatedObject.id, updatedObject, db);

      return updatedObject;
    })
  );

  //return all groupUsers

  return groupUserPickObjects;
};
