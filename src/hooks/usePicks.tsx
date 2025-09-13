import { updatePicks } from "../utils/helpers/updatePicks";
import { authenticationState } from "../state/AuthState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { firestoreState } from "../state/FirestoreState";
import { Firestore } from "firebase/firestore";
import { notificationState } from "../state/NotificationState";
import { useQuery } from "react-query";
import { useState } from "react";
import { getFromFirebase } from "../firebase/getFromFirebase";
import { FIREBASE_COLLECTIONS, USER_PICK_POLL_TIME } from "../utils/constants";
import { SeasonPicks } from "../types/Picks";
import { updateInFirebase } from "../firebase/updateInFirebase";

export const usePicks = ({ weekId }: { weekId?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const setNotificationState = useSetRecoilState(notificationState);
  const { db } = useRecoilValue(firestoreState) as { db: Firestore };
  const { user } = useRecoilValue(authenticationState);
  const [optimisticPickCount, setOptimisticPickCount] = useState(0);

  const { data: userPicks } = useQuery(
    ["useWeekPicks", user?.id],
    async () => {
      if (!user) return null;

      setIsLoading(true);
      const userPicks = (await getFromFirebase({
        db,
        documentId: user.id,
        collectionName: FIREBASE_COLLECTIONS.PICKS,
      })) as SeasonPicks | null;

      setIsLoading(false);
      return userPicks;
    },
    {
      refetchInterval: USER_PICK_POLL_TIME,
      refetchOnWindowFocus: false,
      enabled: !!user?.id, // ⛔ prevents initial fetch with undefined user
    }
  );

  const currentWeekPicks = !weekId ? null : userPicks?.picks[weekId] || null;

  const numberOfPicksMadeThisWeek =
    Object.keys(currentWeekPicks || {}).length + optimisticPickCount;

  const makePick = async (weekId: string, gameId: string, pick: string) => {
    if (!user || userPicks === null || userPicks === undefined) return false;

    const isNewPick = !currentWeekPicks?.[gameId];

    const updatedPicks = updatePicks({
      picks: userPicks,
      weekId,
      gameId,
      pick,
    });

    return await updateInFirebase({
      documentId: user.id,
      collectionName: FIREBASE_COLLECTIONS.PICKS,
      updatedDocFields: updatedPicks,
      db,
    })
      .then((result) => {
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

        if (isNewPick) {
          setOptimisticPickCount(optimisticPickCount + 1);
        }

        return result.success;
      })
      .catch(() => {
        return false;
      });
  };

  return {
    makePick,
    numberOfPicksMadeThisWeek,
    currentWeekPicks,
    userPicks,
    isLoading,
  };
};
