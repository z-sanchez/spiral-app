import { Firestore } from "firebase/firestore";
import { FIREBASE_COLLECTIONS } from "../utils/constants";
import { updateInFirebase } from "./updateInFirebase";

export const updateProfileInFirebase = async ({
  id,
  db,
  color,
  username,
}: {
  id: string;
  db: Firestore;
  color: string;
  username: string;
}) => {
  try {
    await updateInFirebase({
      documentId: id,
      collectionName: FIREBASE_COLLECTIONS.PICKS,
      updatedDocFields: {
        username: username,
      },
      db,
    });

    await updateInFirebase({
      documentId: id,
      collectionName: FIREBASE_COLLECTIONS.USERS,
      updatedDocFields: {
        username: username,
        color: color,
      },
      db,
    });
    return {
      success: true,
      error: null,
    };
  } catch (e) {
    console.log("FAILED TO UPDATE PROFILE", e);
    return {
      success: false,
      error: e,
    };
  }
};
