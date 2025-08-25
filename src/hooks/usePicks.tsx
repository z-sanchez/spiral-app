import { WeekPicks } from "../types/Picks";

export const usePicks = () => {
  // const setNotificationState = useSetRecoilState(notificationState);
  // const { db } = useRecoilValue(firestoreState) as { db: Firestore };

  const currentWeekPicks: WeekPicks | false = false;

  const getNumberOfPicksMissing = () => {
    return 0;
    // const gamesEligibleForPicks = currentWeeksGames.filter(
    //   ({ completed, date }) => !completed && new Date() < new Date(date)
    // );

    // if (!weekPicks) return gamesEligibleForPicks.length;

    // return (
    //   weekPicks?.games.filter((game) => {
    //     return (
    //       game.pick === NO_PICK &&
    //       gamesEligibleForPicks.find(({ id }) => id === game.id)
    //     );
    //   }).length || 0
    // );
  };

  const makePick = (gameId: string, pick: string) => {
    console.log({ gameId, pick });
    // const updatedPicks = updatePicks({
    //   picks,
    //   weekId: currentWeekId,
    //   gameId,
    //   weekGames: currentWeeksGames,
    //   pick,
    // });

    // updateUserPicks(user.id, updatedPicks, db).then((result) =>
    //   result?.success
    //     ? setNotificationState({
    //         show: true,
    //         backgroundColor: "rgb(34 197 94)",
    //         message: "Pick Made Successfully",
    //       })
    //     : setNotificationState({
    //         show: true,
    //         backgroundColor: "rgb(244 63 94)",
    //         message: "Pick Failed",
    //       })
    // );
  };

  return {
    makePick,
    picks: [],
    allTimeRecord: { wins: 0, loses: 0, ties: 0 },
    roi: 0,
    getNumberOfPicksMissing,
    currentWeekPicks,
  };
};
