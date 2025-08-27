import { Firestore, doc, getDoc } from "firebase/firestore";

export const getFromFirebase = async ({
  documentId,
  collectionName,
  db,
}: {
  documentId: string;
  collectionName: string;
  db: Firestore;
}): Promise<unknown | null> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const querySnapshot = await getDoc(docRef);
    return querySnapshot.data();
  } catch (err) {
    console.log("ERROR HERE", { err });
    return null;
  }
};
