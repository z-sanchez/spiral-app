import { useRecoilValue } from "recoil";
import { authenticationState } from "../state/AuthState";

import { firestoreState } from "../state/FirestoreState";
import { Firestore } from "firebase/firestore";
import { useGameSchedule } from "./useGameSchedule";

export const usePicks = () => {
  const authState = useRecoilValue(authenticationState);
  const { db } = useRecoilValue(firestoreState) as { db: Firestore };
  const { currentWeeksGames, currentWeekId } = useGameSchedule();

  console.log({ currentWeeksGames, currentWeekId });

  const makePick = (gameId: string, pick: string) => {
    console.log({ gameId, pick });
  };

  return {
    authState,
    makePick,
  };
};
