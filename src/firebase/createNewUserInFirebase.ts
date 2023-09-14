import { User } from "../types/User";
import { Firestore, setDoc, doc } from "firebase/firestore";

export const createNewUserInFirebase = async ({
  newUser,
  db,
}: {
  newUser: User;
  db: Firestore;
}) => {
  try {
    await setDoc(doc(db, "users", newUser.id), { ...newUser });

    console.log("Document written with ID: ", newUser.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
