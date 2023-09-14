import { User as firebaseAuthUser } from "firebase/auth";
import { User } from "../../../types/User";

export const createUserObjectFromGoogleUser = ({
  uid,
  photoURL,
}: firebaseAuthUser): User => {
  return {
    username: "",
    color: "",
    iconCharacter: "",
    id: uid,
    record: { wins: 0, loses: 0, ties: 0 },
    roi: 0,
    picks: [],
    photoURL: photoURL ?? "",
  };
};