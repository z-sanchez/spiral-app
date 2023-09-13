import { Firestore, doc, getDoc } from "firebase/firestore";

export const userExists = async ({
  userId,
  db,
}: {
  userId: string;
  db: Firestore;
}): Promise<boolean> => {
  try {
    const docRef = doc(db, "users", userId);

    const querySnapshot = await getDoc(docRef);

    return querySnapshot.exists();
  } catch (err) {
    console.log("ERROR HERE", { err });
    return false;
  }
};
