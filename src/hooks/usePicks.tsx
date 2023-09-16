import { useRecoilState, useRecoilValue } from "recoil";
import { firestoreState } from "../state/FirestoreState";
import { Firestore } from "firebase/firestore";
import { useGameSchedule } from "./useGameSchedule";
import { updatePicks } from "../utils/helpers/updatePicks";
import { userPicksState } from "../state/UserPicksState";
import { updateUserPicks } from "../firebase/updateUserPicks";
import { authenticationState } from "../state/AuthState";
import { User } from "../types/User";
import { NO_PICK } from "../utils/constants";
import { Record } from "../types/Record";

export const usePicks = () => {
  const [{ picks, allTimeRecord, roi }, setPicks] =
    useRecoilState(userPicksState);
  const { db } = useRecoilValue(firestoreState) as { db: Firestore };
  const { user } = useRecoilValue(authenticationState) as { user: User };
  const { currentWeeksGames, currentWeekId } = useGameSchedule();

  const getNumberOfPicksMissing = (): number => {
    const weekPicks = picks.find((week) => week.id === currentWeekId);

    if (!weekPicks) return currentWeeksGames.length;

    return weekPicks?.games.filter((game) => game.pick === NO_PICK).length || 0;
  };

  const getCurrentWeekRecord = (): Record => {
    return (
      picks.find((weekPicks) => weekPicks.id === currentWeekId)?.record || {
        wins: 0,
        loses: 0,
        ties: 0,
      }
    );
  };

  const makePick = (gameId: string, pick: string) => {
    const updatedPicks = updatePicks({
      picks,
      weekId: currentWeekId,
      gameId,
      weekGames: currentWeeksGames,
      pick,
    });

    setPicks({ allTimeRecord, picks: updatedPicks, roi });
    updateUserPicks(user.id, updatedPicks, db);
  };

  return {
    makePick,
    picks,
    allTimeRecord,
    roi,
    getNumberOfPicksMissing,
    getCurrentWeekRecord,
  };
};
