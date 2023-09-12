import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const userExists = async ({
  userId,
  db,
}: {
  userId: string;
  db: Firestore;
}): Promise<boolean> => {
  try {
    const usersRef = collection(db, "users");

    // Create a query against the collection.
    const q = query(usersRef, where("id", "==", userId));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.length ? true : false;
  } catch (err) {
    console.log("ERROR HERE", { err });
  }
  return true;
};
