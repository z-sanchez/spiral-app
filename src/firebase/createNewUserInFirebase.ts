import { UserObject } from "../types/Firebase";
import { Firestore, setDoc, doc } from "firebase/firestore";

export const createNewUserInFirebase = async ({
  newUser,
  db,
}: {
  newUser: UserObject;
  db: Firestore;
}) => {
  try {
    await setDoc(doc(db, "users", newUser.id), { ...newUser });

    console.log("Document written with ID: ", newUser.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
