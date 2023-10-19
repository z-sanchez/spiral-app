import { Firestore, doc, updateDoc } from "firebase/firestore";
import { Picks } from "../types/Picks";
import { UserPicksObject } from "../types/Firebase";

export const updateUserPicks = async (
  userId: string,
  picks: Picks,
  db: Firestore
) => {
  if (import.meta.env.VITE_USE_MOCK_DATA) {
    return {
      success: true,
      error: null,
    };
  }
  try {
    // const groupId = "sanchez-group";
    const userDocRef = doc(db, "picks", userId);

    await updateDoc(userDocRef, { picks });
    return {
      success: true,
      error: null,
    };
  } catch (e) {
    console.log("FAILED TO UPDATE USER PICKS", userId, e);
    return {
      success: false,
      error: e,
    };
  }
};

export const updateUserPickObject = async (
  userId: string,
  pickObject: UserPicksObject,
  db: Firestore
) => {
  if (import.meta.env.VITE_USE_MOCK_DATA) return;

  try {
    // const groupId = "sanchez-group";
    const userDocRef = doc(db, "picks", userId);
    console.log("UPDATING", pickObject.id);
    await updateDoc(userDocRef, { ...pickObject });
    return {
      success: true,
      error: null,
    };
  } catch (e) {
    console.log("FAILED TO UPDATE USER PICKS", userId, e);
    return {
      success: false,
      error: e,
    };
  }
};
