import { Firestore, doc, getDoc } from "firebase/firestore";
import { UserPicksObject } from "../types/Firebase";
import { User } from "../types/User";
import { createUserPickObjectUser } from "../utils/helpers/firebase/picks";
import { createNewPicksUserInFirebase } from "./createNewPicksUserInFirebase";

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
