import { Firestore, doc, getDoc } from "firebase/firestore";
import { UserPicksObject } from "../types/Firebase";

export const getUserPicks = async ({
  userId,
  db,
}: {
  userId: string;
  db: Firestore;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<any> => {
  try {
    const usersRef = doc(db, "picks", userId);

    const querySnapshot = await getDoc(usersRef);

    const data = querySnapshot.data();

    return data as UserPicksObject;
  } catch (err) {
    console.log("ERROR HERE", { err });
  }
};
