import { Firestore, doc, getDoc } from "firebase/firestore";

export const getUser = async ({
  userId,
  db,
}: {
  userId: string;
  db: Firestore;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<any> => {
  try {
    const usersRef = doc(db, "users", userId);

    const querySnapshot = await getDoc(usersRef);

    return querySnapshot.data();
  } catch (err) {
    console.log("ERROR HERE", { err });
  }
  return true;
};
