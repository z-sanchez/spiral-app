import { User as firebaseAuthUser } from "firebase/auth";
import { UserObject } from "../../../types/Firebase";

export const createUserObjectFromGoogleUser = ({
  uid,
  email,
  photoURL,
}: firebaseAuthUser): UserObject => {
  return {
    username: email ?? "",
    color: "",
    iconCharacter: "",
    id: uid,
    photoUrl: photoURL ?? "",
    email: email ?? "",
  };
};
