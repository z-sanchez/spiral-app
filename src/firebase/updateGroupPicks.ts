import { Firestore, collection, getDocs } from "firebase/firestore";
import { UserPicksObject } from "../types/Firebase";
import { updateUserPickObjectForFirebase } from "../utils/helpers/firebase/picks";
import { updateUserPickObject } from "./updateUserPicks";

export const updateGroupPicks = async (
  db: Firestore,
  latestWeekNumber: number
) => {
  const querySnapshot = await getDocs(collection(db, "picks"));
  let groupUserPickObjects: UserPicksObject[] = [];

  querySnapshot.forEach((result) => {
    const userPickObject = result.data() as UserPicksObject;

    groupUserPickObjects.push(userPickObject);
  });

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
