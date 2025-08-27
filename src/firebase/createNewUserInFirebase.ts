import { Firestore, setDoc, doc } from "firebase/firestore";
import { User } from "../types/Firebase";
import { User as firebaseAuthUser } from "firebase/auth";
import { createUserObjectFromGoogleUser } from "../utils/helpers/firebase/user";

export const createNewUserInFirebase = async ({
  firebaseAuthUser,
  db,
}: {
  firebaseAuthUser: firebaseAuthUser;
  db: Firestore;
}): Promise<User> => {
  try {
    const newUser = createUserObjectFromGoogleUser({ ...firebaseAuthUser });

    await setDoc(doc(db, "users", newUser.id), { ...newUser });

    console.log("Document written with ID: ", newUser.id);
    return newUser;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};
