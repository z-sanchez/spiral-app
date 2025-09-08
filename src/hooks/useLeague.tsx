import { useRecoilValue } from "recoil";
import { firestoreState } from "../state/FirestoreState";
import { Firestore } from "firebase/firestore";
import { useQuery } from "react-query";
import { getFromFirebase } from "../firebase/getFromFirebase";
import {
  FIREBASE_COLLECTIONS,
  GAME_SCHEDULE_POLL_TIME,
} from "../utils/constants";
import { League } from "../types/Firebase";
import { authenticationState } from "../state/AuthState";

export const useLeague = () => {
  const { db } = useRecoilValue(firestoreState) as { db: Firestore };
  const user = useRecoilValue(authenticationState).user;

  if (!user) throw new Error("No user found in useLeague hook");

  const { isLoading, data: league } = useQuery(
    "useLeague",
    async () => {
      return (await getFromFirebase({
        db,
        documentId: "1CgEQaLpYa8t0mj0IaSc",
        collectionName: FIREBASE_COLLECTIONS.LEAGUES,
      })) as League | null;
    },
    { refetchInterval: GAME_SCHEDULE_POLL_TIME }
  );

  const userAllTimeStanding = league?.allTimeStandings.find(
    (standing) => standing.id === user.id
  );

  const userAllTimeRecord = userAllTimeStanding?.record;

  const userWeekStanding = league?.currentWeekStandings.find(
    (standing) => standing.id === user.id
  );

  const userCurrentWeekRecord = userWeekStanding?.record;

  const userCurrentWeekRank = userWeekStanding?.rank;

  return {
    isLoading,
    league,
    userAllTimeRecord,
    userCurrentWeekRank,
    userCurrentWeekRecord,
  };
};
