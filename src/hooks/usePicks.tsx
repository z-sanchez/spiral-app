import { updatePicks } from "../utils/helpers/updatePicks";
import { authenticationState } from "../state/AuthState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { firestoreState } from "../state/FirestoreState";
import { Firestore } from "firebase/firestore";
import { notificationState } from "../state/NotificationState";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { getFromFirebase } from "../firebase/getFromFirebase";
import { FIREBASE_COLLECTIONS } from "../utils/constants";
import { SeasonPicks } from "../types/Picks";
import { updateInFirebase } from "../firebase/updateInFirebase";

export const usePicks = ({ weekId }: { weekId?: string }) => {
  const setNotificationState = useSetRecoilState(notificationState);
  const { db } = useRecoilValue(firestoreState) as { db: Firestore };
  const { user } = useRecoilValue(authenticationState);

  const { data: userPicks, refetch: refetchPicks } = useQuery(
    "useWeekPicks",
    async () => {
      if (!user) return null;
      return (await getFromFirebase({
        db,
        documentId: user.id,
        collectionName: FIREBASE_COLLECTIONS.PICKS,
      })) as SeasonPicks | null;
    },
    { enabled: true }
  );

  useEffect(() => {
    refetchPicks();
  }, [refetchPicks]);

  const currentWeekPicks = !weekId ? null : userPicks?.picks[weekId] || null;

  const numberOfPicksMadeThisWeek = Object.keys(currentWeekPicks || {}).length;

  const makePick = (weekId: string, gameId: string, pick: string) => {
    if (!user || userPicks === null || userPicks === undefined) return;

    const updatedPicks = updatePicks({
      picks: userPicks,
      weekId,
      gameId,
      pick,
    });

    updateInFirebase({
      documentId: user.id,
      collectionName: FIREBASE_COLLECTIONS.PICKS,
      updatedDocFields: updatedPicks,
      db,
    }).then((result) => {
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
    numberOfPicksMadeThisWeek,
    currentWeekPicks,
    userPicks,
  };
};
