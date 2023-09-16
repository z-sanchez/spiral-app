import { Firestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { Picks } from "../types/Picks";

export const updateUserPicks = async (
  userId: string,
  picks: Picks,
  db: Firestore
) => {
  try {
    const groupId = "sanchez-group";
    const userDocRef = doc(db, "picks", groupId);

    const allPicks = await getDoc(userDocRef);

    const allPicksData = allPicks.data();

    await updateDoc(userDocRef, {
      ...allPicksData,
      [`${userId}.picks`]: picks,
    });
  } catch (e) {
    console.log("FAILED TO UPDATE USER PICKS", userId, e);
  }
};
