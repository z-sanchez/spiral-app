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
import { existsInFirebase } from "../firebase/existsInFirebase";

export const useUser = () => {
  const [authState, setAuthState] = useRecoilState(authenticationState);
  const navigate = useNavigate();
  const { db } = useRecoilValue(firestoreState) as { db: Firestore };

  const signInUser = async ({
    firebaseAuthUser,
  }: {
    firebaseAuthUser: User;
  }) => {
    const userExist = await existsInFirebase({
      documentId: firebaseAuthUser.uid,
      db,
      collectionName: FIREBASE_COLLECTIONS.USERS,
    });

    if (!userExist) {
      const newUser = await createNewUserInFirebase({ firebaseAuthUser, db });

      await createNewPickDocInFirebase({ user: newUser, db });

      setAuthState({
        signedIn: true,
        authUser: { ...firebaseAuthUser },
        user: newUser,
      });

      setCookie(import.meta.env.VITE_COOKIE, firebaseAuthUser.uid, 365);

      if (!newUser.color) {
        navigate("/profileSettings");
      } else {
        navigate("/");
      }
      return;
    }
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

    if (!user?.color) {
      navigate("/profileSettings");
    } else {
      navigate("/");
    }
  };

  return {
    authState,
    signInUser,
    signInUserWithCookie,
  };
};
