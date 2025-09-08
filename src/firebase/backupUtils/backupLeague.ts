import { Firestore } from "firebase/firestore";
import { getFromFirebase } from "../getFromFirebase";
import { addToFirebase } from "../addToFirebase";
import { FIREBASE_COLLECTIONS } from "../../utils/constants";
import { League } from "../../types/Firebase";

export const backupLeague = async ({
  leagueId,
  db,
}: {
  leagueId: string;
  db: Firestore;
}): Promise<string> => {
  const league = await getFromFirebase({
    documentId: leagueId,
    collectionName: "leagues",
    db,
  });

  return JSON.stringify(league);
};

export const uploadLeagueBackup = async ({
  leagueData,
  db,
}: {
  leagueData: League;
  db: Firestore;
}): Promise<void> => {
  addToFirebase({
    firebaseEntity: leagueData,
    documentId: "1CgEQaLpYa8t0mj0IaSc",
    collectionName: FIREBASE_COLLECTIONS.LEAGUES,
    db,
  });
};
