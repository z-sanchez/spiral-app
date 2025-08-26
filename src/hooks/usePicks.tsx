import { updatePicks } from "../utils/helpers/updatePicks";
import { authenticationState } from "../state/AuthState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { updateUserPicks } from "../firebase/updateUserPicks";
import { firestoreState } from "../state/FirestoreState";
import { Firestore } from "firebase/firestore";
import { notificationState } from "../state/NotificationState";
import { getUserPicks } from "../firebase/getUserPicks";
import { useQuery } from "react-query";
import { useEffect } from "react";

export const usePicks = () => {
  const setNotificationState = useSetRecoilState(notificationState);
  const { db } = useRecoilValue(firestoreState) as { db: Firestore };
  const { user } = useRecoilValue(authenticationState);

  const { data: userPicks, refetch: refetchPicks } = useQuery(
    "useWeekPicks",
    () => {
      if (!user) return null;
      return getUserPicks({ db, userObject: user });
    },
    { enabled: true }
  );

  useEffect(() => {
    refetchPicks();
  }, [refetchPicks]);

  const numberOfPicksMissing = 0;

  const makePick = (weekId: string, gameId: string, pick: string) => {
    if (!user || userPicks === null || userPicks === undefined) return;

    const updatedPicks = updatePicks({
      picks: userPicks,
      weekId,
      gameId,
      pick,
    });

    updateUserPicks(user.id, updatedPicks, db).then((result) => {
      refetchPicks();
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
          });
    });
  };

  return {
    makePick,
    picks: [],
    allTimeRecord: { wins: 0, loses: 0, ties: 0 },
    roi: 0,
    numberOfPicksMissing,
    userPicks,
  };
};
