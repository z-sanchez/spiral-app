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
import { Picks } from "../types/Picks";

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
  try {
    console.log({ userObject });
    const usersRef = doc(db, "picks", userId);

    const querySnapshot = await getDoc(usersRef);

    if (!querySnapshot.exists()) {
      const userPicks = createUserPickObjectUser(userObject);

      console.log({ userPicks });
      await createNewPicksUserInFirebase({ newUser: userPicks, db });

      return userPicks;
    }
    const data = querySnapshot.data();

    return data as UserPicksObject;
  } catch (err) {
    console.log({ err });
  }
};

export const getUserPicksByEmail = async ({
  userEmail,
  db,
}: {
  userEmail: string;
  db: Firestore;
}) => {
  const userPicksQuery = query(
    collection(db, "picks"),
    where("username", "==", userEmail)
  );

  const querySnapshot = await getDocs(userPicksQuery);

  let picks: Picks = [];

  querySnapshot.forEach((doc) => {
    picks = doc.data().picks;
  });

  return picks;
};
