import { Firestore, doc, updateDoc } from "firebase/firestore";
import { Picks } from "../types/Picks";

export const updateUserPicks = async (
  userId: string,
  picks: Picks,
  db: Firestore
) => {
  try {
    const userDocRef = doc(db, "users", userId);

    await updateDoc(userDocRef, {
      picks,
    });
  } catch (e) {
    console.log("FAILED TO UPDATE USER PICKS", userId);
  }
};
