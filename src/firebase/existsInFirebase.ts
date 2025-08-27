import { Firestore, doc, getDoc } from "firebase/firestore";

export const existsInFirebase = async ({
  documentId,
  collectionName,
  db,
}: {
  documentId: string;
  collectionName: string;
  db: Firestore;
}): Promise<boolean> => {
  try {
    const docRef = doc(db, collectionName, documentId);

    const querySnapshot = await getDoc(docRef);

    return querySnapshot.exists();
  } catch (err) {
    console.log("ERROR HERE", { err });
    return false;
  }
};
