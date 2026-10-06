import { useRecoilValue } from "recoil";
import { firestoreState } from "../state/FirestoreState";
import { Firestore } from "firebase/firestore";
import { AllTimeStandings } from "../types/Firebase";
import { useQuery } from "react-query";
import {
  LEAGUE_STANDING_POLL_TIME,
  REACT_QUERY_CACHE_TIME,
} from "../utils/constants";
import { authenticationState } from "../state/AuthState";
import {
  getLeagueDataFromFirebase,
  LeagueWithUserDetails,
} from "../firebase/getLeagueDataFromFirebase";
import { UserStanding } from "../types/Firebase";

const patchLeagueData = (
  league: LeagueWithUserDetails | null | undefined,
  currentWeekId: string,
) => {
  if (!league) return null;

  const standingsForThisWeek = league.computedWeekStandings[currentWeekId];
  const allTimeStandings = league.allTimeStandings;

  const updatedStandingsForThisWeek: UserStanding[] = standingsForThisWeek.map(
    (standing) => ({
      // new fields
      gamesBack: 0.5,
      streak: { count: 2, type: "win" },
      ...standing,
    }),
  );

  const updatedStandingsAllTime: AllTimeStandings = allTimeStandings.map(
    (standing) => ({
      // new fields
      gamesBack: 0.5,
      streak: { count: 2, type: "win" },
      ...standing,
    }),
  );

  league.computedWeekStandings[currentWeekId] = updatedStandingsForThisWeek;
  //@ts-expect-error this is being replaced later
  league.allTimeStandings = updatedStandingsAllTime;

  return league;
};

export const useLeague = ({ currentWeekId }: { currentWeekId: string }) => {
  const { db } = useRecoilValue(firestoreState) as { db: Firestore };
  const user = useRecoilValue(authenticationState).user;

  if (!user) throw new Error("No user found in useLeague hook");

  const { isLoading, data: leagueUnpatched } = useQuery(
    "useLeague",
    async () => {
      return (await getLeagueDataFromFirebase({
        db,
        leagueId: user.leagueId!,
      })) as LeagueWithUserDetails | null;
    },
    {
      staleTime: LEAGUE_STANDING_POLL_TIME, // 10 min fresh window
      cacheTime: REACT_QUERY_CACHE_TIME, // keep inactive cache for 60 min
      refetchInterval: LEAGUE_STANDING_POLL_TIME, // refresh every 10 min while mounted
      refetchOnMount: true, // fetch on mount only if stale
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  //TODO: Adding fields API is not yet implemented, remove this once implemented
  const league = patchLeagueData(leagueUnpatched, currentWeekId);
  console.log(leagueUnpatched);

  const userAllTimeStanding = league?.allTimeStandings.find(
    (standing) => standing.id === user.id,
  );

  const userAllTimeRecord = userAllTimeStanding?.record;

  const userAllTimeRank = userAllTimeStanding?.rank;

  const userWeekStanding = league?.computedWeekStandings[currentWeekId]?.find(
    (standing) => standing.id === user.id,
  );

  const userCurrentWeekRecord = userWeekStanding?.record;

  const userCurrentWeekRank = userWeekStanding?.rank;

  const currentWeekStandings =
    league?.computedWeekStandings[currentWeekId]?.map((standing) => {
      const user = league?.leagueUserData.find((u) => u.id === standing.id);
      return {
        ...standing,
        name: user?.username || "Unknown User",
        color: user?.color || "",
      };
    }) ||
    league?.leagueUserData.map((user) => ({
      id: user.id,
      name: user.username,
      color: user.color,
      record: { wins: 0, losses: 0 },
      rank: 0,
    })) ||
    [];

  return {
    isLoading,
    league,
    userAllTimeRecord,
    userCurrentWeekRank,
    userCurrentWeekRecord,
    userAllTimeRank,
    allTimeStandings:
      (league?.allTimeStandings as LeagueWithUserDetails["allTimeStandings"]) ||
      [],
    currentWeekStandings:
      (currentWeekStandings as LeagueWithUserDetails["currentWeekStandings"]) ||
      [],
  };
};
