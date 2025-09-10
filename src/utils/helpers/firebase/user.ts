import { User as firebaseAuthUser } from "firebase/auth";
import { User } from "../../../types/Firebase";

export const createUserObjectFromGoogleUser = ({
  uid,
  email,
  photoURL,
}: firebaseAuthUser): User => {
  return {
    username: email ?? "",
    color: "rgba(179, 35, 164, 1)",
    iconCharacter: "",
    id: uid,
    photoURL: photoURL ?? null,
    email: email ?? "",
  };
};
