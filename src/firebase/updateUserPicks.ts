import { Firestore, doc, updateDoc } from "firebase/firestore";
import { Picks } from "../types/Picks";
import { UserPicksObject } from "../types/Firebase";

export const updateUserPicks = async (
  userId: string,
  picks: Picks,
  db: Firestore
) => {
  try {
    // const groupId = "sanchez-group";
    const userDocRef = doc(db, "picks", userId);

    await updateDoc(userDocRef, { picks });
  } catch (e) {
    console.log("FAILED TO UPDATE USER PICKS", userId, e);
  }
};

export const updateUserPickObject = async (
  userId: string,
  pickObject: UserPicksObject,
  db: Firestore
) => {
  try {
    // const groupId = "sanchez-group";
    const userDocRef = doc(db, "picks", userId);

    await updateDoc(userDocRef, { ...pickObject });
  } catch (e) {
    console.log("FAILED TO UPDATE USER PICKS", userId, e);
  }
};
