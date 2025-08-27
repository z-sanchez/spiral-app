import { useRecoilState, useRecoilValue } from "recoil";
import { authenticationState } from "../state/AuthState";
import { createNewUserInFirebase } from "../firebase/createNewUserInFirebase";
import { User, getAuth } from "firebase/auth";
import { firestoreState } from "../state/FirestoreState";
import { Firestore } from "firebase/firestore";
import { userExists } from "../firebase/userExists";
import { getUser } from "../firebase/getUser";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/helpers/cookie";
import { createNewPickDocInFirebase } from "../firebase/createNewPicksUserInFirebase";

export const useUser = () => {
  const [authState, setAuthState] = useRecoilState(authenticationState);
  const navigate = useNavigate();
  const { db } = useRecoilValue(firestoreState) as { db: Firestore };

  const signInUser = async ({
    firebaseAuthUser,
  }: {
    firebaseAuthUser: User;
  }) => {
    const userExist = await userExists({ userId: firebaseAuthUser.uid, db });

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
    const user = await getUser({ userId: firebaseAuthUserId, db });

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
