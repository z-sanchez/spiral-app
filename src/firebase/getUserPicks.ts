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
    const usersRef = doc(db, "picks", "sanchez-group");

    const querySnapshot = await getDoc(usersRef);

    const data = querySnapshot.data() as { [key: string]: UserPicksObject };

    return data[userId] as UserPicksObject;
  } catch (err) {
    console.log("ERROR HERE", { err });
  }
};
