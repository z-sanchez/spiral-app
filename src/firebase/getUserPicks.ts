import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { UserPicksObject } from "../types/Firebase";
import { User } from "../types/User";
import { createUserPickObjectUser } from "../utils/helpers/firebase/picks";
import { createNewPicksUserInFirebase } from "./createNewPicksUserInFirebase";
import getUserPicksMockData from "../mock/getUserPicksW4Finished.json";

export const getUserPicks = async ({
  userId,
  db,
  userObject,
}: {
  userId: string;
  db: Firestore;
  userObject: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<any> => {
  if (import.meta.env.VITE_USE_MOCK_DATA) return getUserPicksMockData;

  try {
    const usersRef = doc(db, "picks", userId);

    const querySnapshot = await getDoc(usersRef);

    if (!querySnapshot.exists()) {
      const userPicks = createUserPickObjectUser(userObject);

      await createNewPicksUserInFirebase({ newUser: userPicks, db });

      return userPicks;
    }
    const data = querySnapshot.data();

    return data as UserPicksObject;
  } catch (err) {
    console.log({ err });
  }
};

export const getUserPicksByIdForLogging = async ({
  userId,
  db,
}: {
  userId: string;
  db: Firestore;
}) => {
  const userPicksQuery = query(
    collection(db, "picks"),
    where("id", "==", userId)
  );

  const querySnapshot = await getDocs(userPicksQuery);

  let picks: UserPicksObject = {
    id: "",
    username: "",
    roi: 0,
    picks: [],
    record: { wins: 0, loses: 0, ties: 0 },
  };

  querySnapshot.forEach((doc) => {
    picks = doc.data() as UserPicksObject;
  });

  return picks;
};
