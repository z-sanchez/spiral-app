import { Firestore, doc, getDoc } from "firebase/firestore";
import { User } from "../types/Firebase";

export const getUser = async ({
  userId,
  db,
}: {
  userId: string;
  db: Firestore;
}): Promise<User | null> => {
  try {
    const usersRef = doc(db, "users", userId);
    const querySnapshot = await getDoc(usersRef);
    return querySnapshot.data() as User;
  } catch (err) {
    console.log("ERROR HERE", { err });
  }
  return null;
};
