import { User as firebaseAuthUser } from "firebase/auth";
import { UserObject } from "../../../types/Firebase";

export const createUserObjectFromGoogleUser = ({
  uid,
  email,
  photoURL,
}: firebaseAuthUser): UserObject => {
  return {
    username: "",
    color: "",
    iconCharacter: "",
    id: uid,
    photoUrl: photoURL ?? "",
    email: email ?? "",
    groupGameData: [
      {
        groupId: "sanchez-group",
        record: { wins: 0, loses: 0, ties: 0 },
        roi: 0,
        picks: [],
      },
    ],
  };
};
