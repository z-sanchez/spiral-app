import { Firestore } from "firebase/firestore";
import { User } from "../types/Firebase";
import { createDefaultPicksObject } from "../utils/helpers/firebase/picks";
import { addToFirebase } from "./addToFirebase";
import { FIREBASE_COLLECTIONS } from "../utils/constants";

export const createNewPickDocInFirebase = async ({
  user,
  db,
}: {
  user: User;
  db: Firestore;
}) => {
  const defaultPickObject = createDefaultPicksObject(user);

  addToFirebase({
    firebaseEntity: defaultPickObject,
    documentId: user.id,
    collectionName: FIREBASE_COLLECTIONS.PICKS,
    db,
  });
};
