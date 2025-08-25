import { User as firebaseAuthUser } from "firebase/auth";
import { User } from "../../../types/Firebase";

export const createUserObjectFromGoogleUser = ({
  uid,
  email,
  photoURL,
}: firebaseAuthUser): User => {
  return {
    username: email ?? "",
    color: "",
    iconCharacter: "",
    id: uid,
    photoURL: photoURL ?? null,
    email: email ?? "",
  };
};
