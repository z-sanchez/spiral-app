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
import {
  calculateUserAllTimeRank,
  calculateUserWeekRank,
  getAllTimeGroupScores,
  getRankingNotificationData,
  getWeekGroupScores,
  sortGroupScores,
} from "../utils/helpers/rankCalculators";
import { RankingNotifications } from "../types/RankingNotifications";
import { getWeekId } from "../utils/helpers/espn/getWeekId";

export const usePicks = () => {
  const setNotificationState = useSetRecoilState(notificationState);
  const [userPicksStateData, setPicks] = useRecoilState(userPicksState);
  const { db } = useRecoilValue(firestoreState) as { db: Firestore };
  const { user } = useRecoilValue(authenticationState) as { user: User };
  const {
    currentWeeksGames,
    currentWeekId,
    currentWeekNumber,
    currentYearNumber,
  } = useGameSchedule();

  console.log({ userPicksStateData, currentWeekId });
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
    return calculateUserAllTimeRank(userPicksStateData.groupPicks, record.wins);
  };

  const getGroupWeekWinsRanked = (): number[] => {
    const usersWeekRecords = getWeekGroupScores(groupPicks, currentWeekId);
    const userScores = sortGroupScores(usersWeekRecords);

    return userScores;
  };

  const getGroupAllTimeWinsRanked = (): number[] => {
    const usersWeekRecords = getAllTimeGroupScores(groupPicks);
    const userScores = sortGroupScores(usersWeekRecords);

    return userScores;
  };

  const getUserWeekRank = (): number => {
    return calculateUserWeekRank(
      groupPicks,
      getCurrentWeekRecord().wins,
      currentWeekId
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
      rankingNotifications?: RankingNotifications;
    }[] = [];

    const previousWeekNumber = currentWeekNumber - 1;
    const previousWeekId = getWeekId({
      seasontype: 2,
      week: previousWeekNumber,
      year: currentYearNumber,
    });

    getGroupWeekWinsRanked().forEach((winNumber, index) => {
      groupPicks.forEach((groupUser) => {
        const week = groupUser.picks.find(({ id }) => id === currentWeekId);

        if (week?.record.wins === winNumber && week) {
          const rankingNotifications = getRankingNotificationData(
            previousWeekId,
            currentWeekId,
            groupUser.id,
            groupPicks
          );
          groupOrdered.push({
            record: week.record,
            rank: index + 1,
            iconCharacter: groupUser.username[0].toUpperCase(),
            username: groupUser.username,
            color: groupUser.color ?? "#A855F7",
            id: groupUser.id,
            photoURL: "",
            rankingNotifications,
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
      rankingNotifications?: RankingNotifications;
    }[] = [];

    const previousWeekNumber =
      currentWeekNumber !== 1 ? currentWeekNumber - 1 : currentWeekNumber;
    const previousWeekId = getWeekId({
      seasontype: 2,
      week: previousWeekNumber,
      year: currentYearNumber,
    });

    getGroupAllTimeWinsRanked().forEach((winNumber, index) => {
      groupPicks.forEach((groupUser) => {
        if (groupUser?.record.wins === winNumber) {
          const rankingNotifications = getRankingNotificationData(
            previousWeekId,
            currentWeekId,
            groupUser.id,
            groupPicks
          );
          groupOrdered.push({
            record: groupUser.record,
            rank: index + 1,
            iconCharacter: groupUser.username[0].toUpperCase(),
            username: groupUser.username,
            color: groupUser.color ?? "#A855F7",
            id: groupUser.id,
            photoURL: "",
            rankingNotifications,
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
