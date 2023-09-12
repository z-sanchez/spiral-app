import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getUser = async ({
  userId,
  db,
}: {
  userId: string;
  db: Firestore;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<any> => {
  try {
    const usersRef = collection(db, "users");

    // Create a query against the collection.
    const q = query(usersRef, where("id", "==", userId));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs[0].data();
  } catch (err) {
    console.log("ERROR HERE", { err });
  }
  return true;
};
