import { Firestore, setDoc, doc } from "firebase/firestore";

export const addToFirebase = async ({
  firebaseEntity,
  documentId,
  collectionName,
  db,
}: {
  firebaseEntity: unknown;
  documentId: string;
  collectionName: string;
  db: Firestore;
}): Promise<void> => {
  try {
    await setDoc(doc(db, collectionName, documentId), firebaseEntity);

    console.log("Document written with documentId: ", documentId);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};
