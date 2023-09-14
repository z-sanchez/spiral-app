import { useRecoilState, useRecoilValue } from "recoil";
import { firestoreState } from "../state/FirestoreState";
import { Firestore } from "firebase/firestore";
import { useGameSchedule } from "./useGameSchedule";
import { updatePicks } from "../utils/helpers/updatePicks";
import { userPicksState } from "../state/UserPicksState";
import { updateUserPicks } from "../firebase/updateUserPicks";
import { authenticationState } from "../state/AuthState";
import { User } from "../types/User";

export const usePicks = () => {
  const [{ picks }, setPicks] = useRecoilState(userPicksState);
  const { db } = useRecoilValue(firestoreState) as { db: Firestore };
  const { user } = useRecoilValue(authenticationState) as { user: User };
  const { currentWeeksGames, currentWeekId } = useGameSchedule();

  const makePick = (gameId: string, pick: string) => {
    const updatedPicks = updatePicks({
      picks,
      weekId: currentWeekId,
      gameId,
      weekGames: currentWeeksGames,
      pick,
    });

    setPicks({ picks: updatedPicks });
    updateUserPicks(user.id, updatedPicks, db);
  };

  return {
    makePick,
    picks,
  };
};
