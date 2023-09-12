import { User } from "../types/User";
import { collection, addDoc, Firestore } from "firebase/firestore";

export const createNewUserInFirebase = async ({
  newUser,
  db,
}: {
  newUser: User;
  db: Firestore;
}) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      ...newUser,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
