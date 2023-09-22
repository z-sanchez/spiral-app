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
import { WeekPicks } from "../types/Picks";

export const usePicks = () => {
  const [userPicksStateData, setPicks] = useRecoilState(userPicksState);
  const { db } = useRecoilValue(firestoreState) as { db: Firestore };
  const { user } = useRecoilValue(authenticationState) as { user: User };
  const { currentWeeksGames, currentWeekId } = useGameSchedule();
  const { picks, record, roi, groupPicks } = userPicksStateData;
  const weekPicks = picks.find((week) => week.id === currentWeekId);
  const currentWeekPicks: WeekPicks | false =
    picks.find((week) => week.id === currentWeekId) || false;

  const getNumberOfPicksMissing = () => {
    const gamesEligibleForPicks = currentWeeksGames.filter(
      ({ completed, date }) => !completed && new Date() < new Date(date)
    );

    if (!weekPicks) return gamesEligibleForPicks.length;

    return (
      weekPicks?.games.filter((game) => {
        return (
          game.pick === NO_PICK &&
          gamesEligibleForPicks.find(({ id }) => id === game.id)
        );
      }).length || 0
    );
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

    setPicks({ ...userPicksStateData, picks: updatedPicks });
    updateUserPicks(user.id, updatedPicks, db);
  };

  const getUserRank = (): number => {
    let userScores = structuredClone(groupPicks).map(
      ({ record }) => record.wins
    );

    userScores = userScores
      .filter((score, index) => userScores.indexOf(score) === index)
      .sort((a, b) => b - a);
    return (
      userScores.findIndex(
        (score) => score === userPicksStateData.record.wins
      ) + 1
    );
  };

  return {
    makePick,
    picks,
    allTimeRecord: record,
    roi,
    getNumberOfPicksMissing,
    getCurrentWeekRecord,
    currentWeekPicks,
    getUserRank,
  };
};
