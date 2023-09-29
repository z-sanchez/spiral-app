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
import { userPicksState } from "../state/UserPicksState";
import { transformFirebaseUserToAppUser } from "../utils/helpers/transformFirebaseUserToAppUser";
import { createUserPickObjectUser } from "../utils/helpers/firebase/picks";
import { createNewPicksUserInFirebase } from "../firebase/createNewPicksUserInFirebase";
import { getUserPicks } from "../firebase/getUserPicks";
import { UserPicksObject } from "../types/Firebase";
import { updateGroupPicks } from "../firebase/updateGroupPicks";
import { doesUserPickObjectNeedUpdate } from "../utils/helpers/doesUserPickObjectNeedUpdate";
import { useQuery } from "react-query";
import { getWeekData } from "../utils/helpers/espn/getWeekData";
import { getGroupPicks } from "../firebase/getGroupPicks";
import { fetchCurrentWeekData } from "../utils/helpers/espn/fetchWeekData";

export const useUser = () => {
  const { isLoading, data } = useQuery("gameScheduleData", () =>
    fetchCurrentWeekData()
  );
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

      let groupPicks = await getGroupPicks(db);

      const needUpdate = doesUserPickObjectNeedUpdate({
        latestWeekNumber: data?.parameters.week,
        currentWeekGames: getWeekData(data.schedule),
        userPicks: userPicks.picks,
      });

      if (needUpdate) {
        groupPicks = await updateGroupPicks(db);
        userPicks =
          groupPicks.find(({ id }) => id === userPicks.id) || userPicks;
      }

      setAuthState({
        signedIn: true,
        authUser: { ...firebaseAuthUser },
        user: appUser,
      });
      setUserPicksState({
        ...userPicks,
        groupPicks,
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

    let groupPicks = await getGroupPicks(db);

    const needUpdate = doesUserPickObjectNeedUpdate({
      latestWeekNumber: data?.parameters.week,
      currentWeekGames: getWeekData(data.schedule),
      userPicks: userPicks.picks,
    });

    if (needUpdate) {
      groupPicks = await updateGroupPicks(db);
      userPicks = groupPicks.find(({ id }) => id === userPicks.id) || userPicks;
    }

    setAuthState({
      signedIn: true,
      authUser: { ...firebaseAuthUser },
      user: appUser,
    });
    setUserPicksState({
      ...userPicks,
      groupPicks,
    });
    setCookie(import.meta.env.VITE_COOKIE, firebaseAuthUser.uid, 365);
    navigate("/");
  };

  const signInUserWithCookie = async ({
    firebaseAuthUserId,
  }: {
    firebaseAuthUserId: string;
  }) => {
    const user = await getUser({ userId: firebaseAuthUserId, db });
    const appUser = transformFirebaseUserToAppUser(user);

    let userPicks = (await getUserPicks({
      userId: firebaseAuthUserId,
      db,
      userObject: appUser,
    })) as UserPicksObject;

    let groupPicks = await getGroupPicks(db);

    const needUpdate = doesUserPickObjectNeedUpdate({
      latestWeekNumber: data?.parameters.week,
      currentWeekGames: getWeekData(data.schedule),
      userPicks: userPicks.picks,
    });

    if (needUpdate) {
      groupPicks = await updateGroupPicks(db);
      userPicks = groupPicks.find(({ id }) => id === userPicks.id) || userPicks;
    }

    setAuthState({
      signedIn: true,
      authUser: JSON.parse(JSON.stringify(getAuth())),
      user: appUser,
    });
    setUserPicksState({
      ...userPicks,
      groupPicks,
    });
    navigate("/");
  };

  return {
    userStateLoading: isLoading,
    authState,
    signInUser,
    signInUserWithCookie,
  };
};
