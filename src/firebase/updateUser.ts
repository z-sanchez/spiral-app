import { Firestore, doc, updateDoc } from "firebase/firestore";

export const updateUserObjectColorAndUsername = async (
  userId: string,
  color: string,
  username: string,
  db: Firestore
) => {
  if (import.meta.env.VITE_USE_MOCK_DATA) return;

  try {
    const userDocRef = doc(db, "users", userId);
    console.log("UPDATING COLOR AND USERNAME", userId);
    await updateDoc(userDocRef, { color, username });
    return {
      success: true,
      error: null,
    };
  } catch (e) {
    console.log("FAILED TO UPDATE USER OBJECT COLOR AND USERNAME", userId, e);
    return {
      success: false,
      error: e,
    };
  }
};
