import { UserObject } from "../../types/Firebase";
import { Picks } from "../../types/Picks";
import { Record } from "../../types/Record";
import { User } from "../../types/User";

export const transformFirebaseUserToAppUser = ({
  username,
  color,
  iconCharacter,
  id,
  groupGameData,
  photoUrl,
}: UserObject): User => {
  const { roi, picks, record } = groupGameData?.find(
    ({ groupId }) => groupId === "sanchez-group"
  ) as {
    groupId: string;
    roi: number;
    record: Record;
    picks: Picks;
  };

  return {
    username,
    color,
    iconCharacter,
    id,
    photoURL: photoUrl,
    roi,
    record,
    picks,
  };
};
