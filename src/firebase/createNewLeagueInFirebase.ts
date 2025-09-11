import { Firestore } from "firebase/firestore";
import { League } from "../types/Firebase";
import { addToFirebase } from "./addToFirebase";
import { FIREBASE_COLLECTIONS } from "../utils/constants";

export const createDefaultLeagueObject = ({
  leagueName,
  leagueId,
}: {
  leagueName: string;
  leagueId: string;
}): League => ({
  id: leagueId,
  name: leagueName,
  userIds: [],
  currentWeekStandings: [],
  allTimeStandings: [],
  previousWeekStandings: {},
  lastUpdatedWeek: "",
  lastCompletedWeek: "",
  lastUpdatedAt: new Date().toISOString(),
  key: `${Date.now()}`,
});

export const createNewLeagueInFirebase = async ({
  leagueName,
  db,
}: {
  leagueName: string;
  db: Firestore;
}) => {
  const leagueId = `league_${Date.now()}`;
  const league = createDefaultLeagueObject({ leagueName, leagueId });

  addToFirebase({
    firebaseEntity: league,
    documentId: league.id,
    collectionName: FIREBASE_COLLECTIONS.LEAGUES,
    db,
  });
};
