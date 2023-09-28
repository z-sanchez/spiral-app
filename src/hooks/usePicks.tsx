import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
import { notificationState } from "../state/NotificationState";

export const usePicks = () => {
  const setNotificationState = useSetRecoilState(notificationState);
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
    updateUserPicks(user.id, updatedPicks, db).then((result) =>
      result?.success
        ? setNotificationState({
            show: true,
            backgroundColor: "rgb(34 197 94)",
            message: "Pick Made Successfully",
          })
        : setNotificationState({
            show: true,
            backgroundColor: "rgb(244 63 94)",
            message: "Pick Failed",
          })
    );
  };

  const getUserAllTimeRank = (): number => {
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

  const getGroupWeekWinsRanked = (): number[] => {
    const usersWeekRecords = structuredClone(groupPicks).map(({ picks }) => {
      return picks.find(({ id }) => id === currentWeekId)?.record
        .wins as number;
    });

    const userScores: number[] = usersWeekRecords
      .filter((score, index) => usersWeekRecords.indexOf(score) === index)
      .sort((a, b) => b - a);

    return userScores;
  };

  const getGroupAllTimeWinsRanked = (): number[] => {
    const usersWeekRecords = structuredClone(groupPicks).map(({ record }) => {
      return record.wins as number;
    });

    const userScores: number[] = usersWeekRecords
      .filter((score, index) => usersWeekRecords.indexOf(score) === index)
      .sort((a, b) => b - a);

    return userScores;
  };

  const getUserWeekRank = (): number => {
    const usersWeekRecords = structuredClone(groupPicks).map(({ picks }) => {
      const groupRecord = picks.find(({ id }) => id === currentWeekId);
      return groupRecord?.record.wins as number;
    });

    const userScores: number[] = usersWeekRecords
      .filter((score, index) => usersWeekRecords.indexOf(score) === index)
      .sort((a, b) => b - a);

    return (
      userScores.findIndex(
        (rankNumber) => rankNumber === weekPicks?.record.wins
      ) + 1
    );
  };

  const getGroupUsersRankedByCurrentWeek = () => {
    const groupOrdered: {
      record: Record;
      rank: number;
      iconCharacter: string;
      username: string;
      color: string;
      id: string;
      photoURL: string;
    }[] = [];

    getGroupWeekWinsRanked().forEach((winNumber, index) => {
      groupPicks.forEach((groupUser) => {
        const week = groupUser.picks.find(({ id }) => id === currentWeekId);

        if (week?.record.wins === winNumber) {
          groupOrdered.push({
            record: week.record,
            rank: index + 1,
            iconCharacter: groupUser.username[0].toUpperCase(),
            username: groupUser.username,
            color: "#A855F7",
            id: groupUser.id,
            photoURL: "",
          });
        }
      });
    });

    return groupOrdered;
  };

  const getGroupUsersRankedByAllTime = () => {
    const groupOrdered: {
      record: Record;
      rank: number;
      iconCharacter: string;
      username: string;
      color: string;
      id: string;
      photoURL: string;
    }[] = [];

    getGroupAllTimeWinsRanked().forEach((winNumber, index) => {
      groupPicks.forEach((groupUser) => {
        if (groupUser?.record.wins === winNumber) {
          groupOrdered.push({
            record: groupUser.record,
            rank: index + 1,
            iconCharacter: groupUser.username[0].toUpperCase(),
            username: groupUser.username,
            color: "#A855F7",
            id: groupUser.id,
            photoURL: "",
          });
        }
      });
    });

    return groupOrdered;
  };

  return {
    makePick,
    picks,
    allTimeRecord: record,
    roi,
    getNumberOfPicksMissing,
    getCurrentWeekRecord,
    currentWeekPicks,
    getUserWeekRank,
    getGroupWeekWinsRanked,
    getUserAllTimeRank,
    getGroupUsersRankedByCurrentWeek,
    getGroupUsersRankedByAllTime,
  };
};
