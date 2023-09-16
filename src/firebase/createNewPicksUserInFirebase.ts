import { UserPicksObject } from "../types/Firebase";
import { Firestore, setDoc, doc } from "firebase/firestore";

export const createNewPicksUserInFirebase = async ({
  newUser,
  db,
}: {
  newUser: UserPicksObject;
  db: Firestore;
}) => {
  try {
    await setDoc(doc(db, "picks", "sanchez-group"), {
      [`${newUser.id}`]: { ...newUser },
    });

    console.log("Document written with ID: ", newUser.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
