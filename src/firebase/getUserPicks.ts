import { Firestore, doc, getDoc } from "firebase/firestore";
import { createUserPickObjectUser } from "../utils/helpers/firebase/picks";
import { createNewPicksUserInFirebase } from "./createNewPicksUserInFirebase";
import { SeasonPicks } from "../types/Picks";
import { User } from "../types/Firebase";

export const getUserPicks = async ({
  db,
  userObject,
}: {
  db: Firestore;
  userObject: User;
}): Promise<SeasonPicks> => {
  try {
    const usersRef = doc(db, "picks", userObject.id);

    const querySnapshot = await getDoc(usersRef);

    if (!querySnapshot.exists()) {
      const userPicks = createUserPickObjectUser(userObject);

      await createNewPicksUserInFirebase({ newUser: userPicks, db });

      return userPicks;
    }
    const data = querySnapshot.data();

    return data as SeasonPicks;
  } catch (err) {
    console.log({ err });
  }

  return { picks: {}, id: userObject.id, username: "" };
};
