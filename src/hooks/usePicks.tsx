import { updatePicks } from "../utils/helpers/updatePicks";
import { authenticationState } from "../state/AuthState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { firestoreState } from "../state/FirestoreState";
import { Firestore } from "firebase/firestore";
import { notificationState } from "../state/NotificationState";
import { useQuery, useQueryClient } from "react-query";
import { getFromFirebase } from "../firebase/getFromFirebase";
import {
  FIREBASE_COLLECTIONS,
  REACT_QUERY_CACHE_TIME,
  USER_PICK_POLL_TIME,
} from "../utils/constants";
import { SeasonPicks } from "../types/Picks";
import { updateInFirebase } from "../firebase/updateInFirebase";

export const usePicks = ({ weekId }: { weekId?: string }) => {
  const setNotificationState = useSetRecoilState(notificationState);
  const queryClient = useQueryClient();
  const { db } = useRecoilValue(firestoreState) as { db: Firestore };
  const { user } = useRecoilValue(authenticationState);
  const picksQueryKey = ["useWeekPicks", user?.id];

  const {
    data: userPicks,
    refetch: refetchPicks,
    isLoading,
  } = useQuery(
    picksQueryKey,
    async () => {
      if (!user) return null;
      return (await getFromFirebase({
        db,
        documentId: user.id,
        collectionName: FIREBASE_COLLECTIONS.PICKS,
      })) as SeasonPicks | null;
    },
    {
      enabled: !!user,
      staleTime: USER_PICK_POLL_TIME, // 10 min fresh window
      cacheTime: REACT_QUERY_CACHE_TIME, // keep inactive cache for 60 min
      refetchOnMount: true, // fetch on mount only if stale
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  const currentWeekPicks = !weekId ? null : userPicks?.picks[weekId] || null;

  const numberOfPicksMadeThisWeek = Object.keys(currentWeekPicks || {}).length;

  const makePick = async (weekId: string, gameId: string, pick: string) => {
    if (!user) return false;

    // get the previous picks from the query cache
    const previousPicks = queryClient.getQueryData<SeasonPicks | null>(
      picksQueryKey,
    );

    if (previousPicks === null || previousPicks === undefined) return false;

    const updatedPicks = updatePicks({
      picks: previousPicks,
      weekId,
      gameId,
      pick,
    });

    // cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries(picksQueryKey);

    // Optimistically update to the new value
    queryClient.setQueryData<SeasonPicks | null>(picksQueryKey, updatedPicks);

    return await updateInFirebase({
      documentId: user.id,
      collectionName: FIREBASE_COLLECTIONS.PICKS,
      updatedDocFields: updatedPicks,
      db,
    })
      .then(async (result) => {
        if (!result?.success) {
          // If the mutation fails, use the previous value
          queryClient.setQueryData<SeasonPicks | null>(
            picksQueryKey,
            previousPicks,
          );

          setNotificationState({
            show: true,
            backgroundColor: "rgb(244 63 94)",
            message: "Pick Failed",
          });

          return false;
        }

        // If the mutation succeeds, refetch the picks to ensure we have the latest data
        await refetchPicks();
        setNotificationState({
          show: true,
          backgroundColor: "rgb(34 197 94)",
          message: "Pick Made Successfully",
        });

        return true;
      })
      .catch(() => {
        // If the mutation fails, use the previous value
        queryClient.setQueryData<SeasonPicks | null>(
          picksQueryKey,
          previousPicks,
        );

        setNotificationState({
          show: true,
          backgroundColor: "rgb(244 63 94)",
          message: "Pick Failed",
        });

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
