import { Firestore } from "firebase/firestore";
import { League, User } from "../types/Firebase";
import { FIREBASE_COLLECTIONS } from "../utils/constants";
import { getFromFirebase } from "./getFromFirebase";

export type LeagueWithUserDetails = League & {
  allTimeStandings: (League["allTimeStandings"][number] & {
    name: string;
    color: string;
  })[];
  currentWeekStandings: (League["currentWeekStandings"][number] & {
    name: string;
    color: string;
  })[];
  leagueUserData: {
    id: string;
    username: string;
    color: string;
  }[];
};

export const getLeagueDataFromFirebase = async ({
  db,
  leagueId,
}: {
  db: Firestore;
  leagueId: string;
}): Promise<LeagueWithUserDetails | null> => {
  const league = (await getFromFirebase({
    db,
    documentId: leagueId,
    collectionName: FIREBASE_COLLECTIONS.LEAGUES,
  })) as League | null;

  if (!league) return null;

  const users = league?.userIds
    ? ((await Promise.all(
        league.userIds.map(async (userId) => {
          return (await getFromFirebase({
            db,
            documentId: userId,
            collectionName: FIREBASE_COLLECTIONS.USERS,
          })) as User | null;
        }),
      )) as User[])
    : [];

  return {
    ...league,
    allTimeStandings:
      league?.allTimeStandings.map((standing) => {
        const user = users.find((u) => u.id === standing.id);
        return {
          ...standing,
          name: user?.username || "Unknown User",
          color: user?.color || "",
        };
      }) || [],
    currentWeekStandings:
      league?.currentWeekStandings.map((standing) => {
        const user = users.find((u) => u.id === standing.id);
        return {
          ...standing,
          name: user?.username || "Unknown User",
          color: user?.color || "",
        };
      }) || [],
    leagueUserData: users.map((user) => ({
      id: user.id,
      username: user.username,
      color: user.color,
    })),
  };
};
