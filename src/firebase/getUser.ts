import { Firestore, doc, getDoc } from "firebase/firestore";
import getUserMockData from "../mock/getUserData.json";

export const getUser = async ({
  userId,
  db,
}: {
  userId: string;
  db: Firestore;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<any> => {
  if (import.meta.env.VITE_USE_MOCK_DATA) return getUserMockData.user;

  try {
    const usersRef = doc(db, "users", userId);
    const querySnapshot = await getDoc(usersRef);
    return querySnapshot.data();
  } catch (err) {
    console.log("ERROR HERE", { err });
  }
  return true;
};
