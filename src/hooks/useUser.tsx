import { useRecoilState, useRecoilValue } from "recoil";
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
      const newUser = createUserObjectFromGoogleUser(firebaseAuthUser);
      await createNewUserInFirebase({ newUser, db });
      setAuthState({
        signedIn: true,
        authUser: { ...firebaseAuthUser },
        user: newUser,
      });
      navigate("/");
    }

    const user = await getUser({ userId: firebaseAuthUser.uid, db });

    setAuthState({
      signedIn: true,
      authUser: { ...firebaseAuthUser },
      user,
    });
    setCookie(SPIRAL_COOKIE_NAME, firebaseAuthUser.uid, 365);
    navigate("/");
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

    navigate("/");
  };

  return {
    authState,
    signInUser,
    signInUserWithCookie,
  };
};
