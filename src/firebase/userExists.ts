import { Firestore, doc, getDoc } from "firebase/firestore";

export const userExists = async ({
  userId,
  db,
}: {
  userId: string;
  db: Firestore;
}): Promise<boolean> => {
  if (import.meta.env.VITE_USE_MOCK_DATA) return true;
  try {
    const docRef = doc(db, "users", userId);

    const querySnapshot = await getDoc(docRef);

    return querySnapshot.exists();
  } catch (err) {
    console.log("ERROR HERE", { err });
    return true;
  }
};
