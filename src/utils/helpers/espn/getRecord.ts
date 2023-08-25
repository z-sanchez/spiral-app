import { Record } from "../../../types/Record";

export const getRecord = (teamRecord: string): Record => {
  const recordStringDeconstructed = teamRecord?.split("-");

  if (!recordStringDeconstructed || !teamRecord)
    return {
      wins: 0,
      loses: 0,
      ties: 0,
    };

  if (recordStringDeconstructed.length > 2) {
    return {
      wins: Number(recordStringDeconstructed[0]),
      loses: Number(recordStringDeconstructed[2]),
      ties: Number(recordStringDeconstructed[1]),
    };
  }

  //address ties
  return {
    wins: Number(recordStringDeconstructed[0]),
    loses: Number(recordStringDeconstructed[1]),
    ties: 0,
  };
};
