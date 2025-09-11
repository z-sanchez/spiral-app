import { useRecoilState, useRecoilValue } from "recoil";
import { authenticationState } from "../state/AuthState";
import { createNewUserInFirebase } from "../firebase/createNewUserInFirebase";
import { User, getAuth } from "firebase/auth";
import { firestoreState } from "../state/FirestoreState";
import { Firestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/helpers/cookie";
import { createNewPickDocInFirebase } from "../firebase/createNewPicksUserInFirebase";
import { getFromFirebase } from "../firebase/getFromFirebase";
import { FIREBASE_COLLECTIONS } from "../utils/constants";
import { User as AppUser } from "../types/Firebase";

export const useUser = () => {
  const [authState, setAuthState] = useRecoilState(authenticationState);
  const navigate = useNavigate();
  const { db } = useRecoilValue(firestoreState) as { db: Firestore };

  const signInUser = async ({
    firebaseAuthUser,
  }: {
    firebaseAuthUser: User;
  }) => {
    const user = (await getFromFirebase({
      documentId: firebaseAuthUser.uid,
      db,
      collectionName: FIREBASE_COLLECTIONS.USERS,
    })) as AppUser | null;

    if (!user || user === null) {
      const newUser = await createNewUserInFirebase({ firebaseAuthUser, db });

      setAuthState({
        signedIn: true,
        authUser: JSON.parse(JSON.stringify(getAuth())),
        user: newUser,
      });
    } else {
      setAuthState({
        signedIn: true,
        authUser: JSON.parse(JSON.stringify(getAuth())),
        user: user,
      });
    }

    setCookie(import.meta.env.VITE_COOKIE, firebaseAuthUser.uid, 365);

    if (user?.leagueId) {
      navigate("/");
    } else {
      navigate("/join-league" + window.location.search);
    }

    return;
  };

  const signInUserWithCookie = async ({
    firebaseAuthUserId,
  }: {
    firebaseAuthUserId: string;
  }) => {
    const user = (await getFromFirebase({
      documentId: firebaseAuthUserId,
      collectionName: FIREBASE_COLLECTIONS.USERS,
      db,
    })) as AppUser | null;

    if (!user) return;

    setAuthState({
      signedIn: true,
      authUser: JSON.parse(JSON.stringify(getAuth())),
      user,
    });

    if (user?.leagueId) {
      navigate("/");
    } else {
      navigate("/join-league" + window.location.search);
    }
  };

  const addUserToLeague = async ({
    leagueId,
    key,
  }: {
    leagueId: string;
    key: string;
  }) => {
    if (!authState.user) return;

    const userLeagueId = await createNewPickDocInFirebase({
      user: authState.user,
      db,
      leagueId,
      leagueKey: key,
    });

    setAuthState({
      signedIn: true,
      authUser: JSON.parse(JSON.stringify(getAuth())),
      user: { ...authState.user, leagueId: userLeagueId || null },
    });

    navigate("/");
  };

  return {
    authState,
    signInUser,
    signInUserWithCookie,
    addUserToLeague,
  };
};
