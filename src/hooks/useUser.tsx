import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authenticationState } from "../state/AuthState";
import { createNewUserInFirebase } from "../firebase/createNewUserInFirebase";
import { createUserObjectFromGoogleUser } from "../utils/helpers/firebase/user";
import { User, getAuth } from "firebase/auth";
import { firestoreState } from "../state/FirestoreState";
import { Firestore } from "firebase/firestore";
import { userExists } from "../firebase/userExists";
import { getUser } from "../firebase/getUser";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/helpers/cookie";
import { SPIRAL_COOKIE_NAME } from "../utils/constants";
import { userPicksState } from "../state/UserPicksState";
import { transformFirebaseUserToAppUser } from "../utils/helpers/transformFirebaseUserToAppUser";
import { createUserPickObjectUser } from "../utils/helpers/firebase/picks";
import { createNewPicksUserInFirebase } from "../firebase/createNewPicksUserInFirebase";
import { getUserPicks } from "../firebase/getUserPicks";
import { UserPicksObject } from "../types/Firebase";
import userPicksMockData from "../mock/getUserPicksData.json";
import userData from "../mock/getUserData.json";
import { updateGroupPicks } from "../firebase/updateGroupPicks";

const useMockData = import.meta.env.DEV;

export const useUser = () => {
  const [authState, setAuthState] = useRecoilState(authenticationState);
  const setUserPicksState = useSetRecoilState(userPicksState);
  const navigate = useNavigate();
  const { db } = useRecoilValue(firestoreState) as { db: Firestore };

  const signInUser = async ({
    firebaseAuthUser,
  }: {
    firebaseAuthUser: User;
  }) => {
    const userExist = await userExists({ userId: firebaseAuthUser.uid, db });

    if (!userExist) {
      const newUser = createUserObjectFromGoogleUser(firebaseAuthUser);
      await createNewUserInFirebase({ newUser, db });

      const appUser = transformFirebaseUserToAppUser(newUser);

      let userPicks = createUserPickObjectUser(appUser);

      await createNewPicksUserInFirebase({ newUser: userPicks, db });

      const needUpdate = true;

      if (needUpdate) {
        userPicks =
          (await updateGroupPicks(db, 3)).find(
            ({ id }) => id === userPicks.id
          ) || userPicks;
      }

      setAuthState({
        signedIn: true,
        authUser: { ...firebaseAuthUser },
        user: appUser,
      });
      setUserPicksState({
        ...userPicks,
      });
      navigate("/");
      return;
    }

    const user = await getUser({ userId: firebaseAuthUser.uid, db });
    const appUser = transformFirebaseUserToAppUser(user);

    let userPicks = (await getUserPicks({
      userId: firebaseAuthUser.uid,
      db,
      userObject: appUser,
    })) as UserPicksObject;

    const needUpdate = true;

    if (needUpdate) {
      userPicks =
        (await updateGroupPicks(db, 3)).find(({ id }) => id === userPicks.id) ||
        userPicks;
    }

    setAuthState({
      signedIn: true,
      authUser: { ...firebaseAuthUser },
      user: appUser,
    });
    setUserPicksState({
      ...userPicks,
    });
    setCookie(SPIRAL_COOKIE_NAME, firebaseAuthUser.uid, 365);
    navigate("/");
  };

  const signInUserWithCookie = async ({
    firebaseAuthUserId,
  }: {
    firebaseAuthUserId: string;
  }) => {
    const user = useMockData
      ? JSON.parse(JSON.stringify(userData.user))
      : await getUser({ userId: firebaseAuthUserId, db });
    const appUser = transformFirebaseUserToAppUser(user);

    let userPicks = useMockData
      ? (JSON.parse(JSON.stringify(userPicksMockData)) as UserPicksObject)
      : ((await getUserPicks({
          userId: firebaseAuthUserId,
          db,
          userObject: appUser,
        })) as UserPicksObject);

    const needUpdate = true;

    if (needUpdate) {
      userPicks =
        (await updateGroupPicks(db, 3)).find(({ id }) => id === userPicks.id) ||
        userPicks;
    }

    setAuthState({
      signedIn: true,
      authUser: JSON.parse(JSON.stringify(getAuth())),
      user: appUser,
    });
    setUserPicksState({
      ...userPicks,
    });
    navigate("/");
  };

  return {
    authState,
    signInUser,
    signInUserWithCookie,
  };
};
