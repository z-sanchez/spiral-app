import { Firestore, doc, updateDoc } from "firebase/firestore";

export const updateInFirebase = async ({
  documentId,
  collectionName,
  updatedDocFields,
  db,
}: {
  documentId: string;
  collectionName: string;
  updatedDocFields: { [key: string]: unknown };
  db: Firestore;
}) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, { ...updatedDocFields });
    return {
      success: true,
      error: null,
    };
  } catch (e) {
    console.log("FAILED TO UPDATE DOCUMENT", documentId, e);
    return {
      success: false,
      error: e,
    };
  }
};
