import { Firestore } from "firebase/firestore";
import { User } from "../types/Firebase";
import { User as firebaseAuthUser } from "firebase/auth";
import { createUserObjectFromGoogleUser } from "../utils/helpers/firebase/user";
import { addToFirebase } from "./addToFirebase";
import { FIREBASE_COLLECTIONS } from "../utils/constants";

export const createNewUserInFirebase = async ({
  firebaseAuthUser,
  db,
}: {
  firebaseAuthUser: firebaseAuthUser;
  db: Firestore;
}): Promise<User> => {
  const newUser = createUserObjectFromGoogleUser({ ...firebaseAuthUser });

  await addToFirebase({
    firebaseEntity: newUser,
    documentId: newUser.id,
    collectionName: FIREBASE_COLLECTIONS.USERS,
    db,
  });

  return newUser;
};
