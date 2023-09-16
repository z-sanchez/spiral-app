import { UserObject } from "../../types/Firebase";
import { User } from "../../types/User";

export const transformFirebaseUserToAppUser = ({
  username,
  color,
  iconCharacter,
  id,
  photoUrl,
}: UserObject): User => {
  return {
    username,
    color,
    iconCharacter,
    id,
    photoURL: photoUrl,
  };
};
