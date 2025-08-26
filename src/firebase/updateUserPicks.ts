import { Firestore, doc, updateDoc } from "firebase/firestore";
import { SeasonPicks } from "../types/Picks";

export const updateUserPicks = async (
  userId: string,
  picks: SeasonPicks,
  db: Firestore
) => {
  try {
    const userDocRef = doc(db, "picks", userId);

    await updateDoc(userDocRef, picks);

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
