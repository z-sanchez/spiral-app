import { Firestore, setDoc, doc } from "firebase/firestore";
import { User } from "../types/Firebase";
import { createDefaultPicksObject } from "../utils/helpers/firebase/picks";

export const createNewPickDocInFirebase = async ({
  user,
  db,
}: {
  user: User;
  db: Firestore;
}) => {
  try {
    const defaultPickObject = createDefaultPicksObject(user);

    await setDoc(doc(db, "picks", user.id), { ...defaultPickObject });

    console.log("Document written with ID: ", user.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
