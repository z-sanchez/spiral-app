import { useRecoilValue } from "recoil";
import { firestoreState } from "../state/FirestoreState";
import { Firestore } from "firebase/firestore";
import { useQuery } from "react-query";
import { GAME_SCHEDULE_POLL_TIME } from "../utils/constants";
import { League } from "../types/Firebase";
import { authenticationState } from "../state/AuthState";
import { getLeagueDataFromFirebase } from "../firebase/getLeagueDataFromFirebase";

export const useLeague = () => {
  const { db } = useRecoilValue(firestoreState) as { db: Firestore };
  const user = useRecoilValue(authenticationState).user;

  if (!user) throw new Error("No user found in useLeague hook");

  const { isLoading, data: league } = useQuery(
    "useLeague",
    async () => {
      return (await getLeagueDataFromFirebase({
        db,
        leagueId: user.leagueId!,
      })) as League | null;
    },
    { refetchInterval: GAME_SCHEDULE_POLL_TIME, refetchOnWindowFocus: false }
  );

  const userAllTimeStanding = league?.allTimeStandings.find(
    (standing) => standing.id === user.id
  );

  const userAllTimeRecord = userAllTimeStanding?.record;

  const userAllTimeRank = userAllTimeStanding?.rank;

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
    userAllTimeRank,
    allTimeStandings: league?.allTimeStandings || [],
    currentWeekStandings: league?.currentWeekStandings || [],
  };
};
