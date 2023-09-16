import { Firestore, doc, updateDoc } from "firebase/firestore";
import { Picks } from "../types/Picks";

export const updateUserPicks = async (
  userId: string,
  picks: Picks,
  db: Firestore
) => {
  try {
    const groupId = "sanchez-group";
    const userDocRef = doc(db, "picks", groupId);

    await updateDoc(userDocRef, {
      [`${userId}.picks`]: picks,
    });
  } catch (e) {
    console.log("FAILED TO UPDATE USER PICKS", userId, e);
  }
};
