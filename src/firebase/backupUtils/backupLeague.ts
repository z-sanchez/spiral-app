import { Firestore } from "firebase/firestore";
import { getFromFirebase } from "../getFromFirebase";
import { addToFirebase } from "../addToFirebase";
import { FIREBASE_COLLECTIONS } from "../../utils/constants";
import { League, User } from "../../types/Firebase";
import { SeasonPicks } from "../../types/Picks";

export const backupLeague = async ({
  leagueId,
  db,
}: {
  leagueId: string;
  db: Firestore;
}): Promise<string> => {
  const league = (await getFromFirebase({
    documentId: leagueId,
    collectionName: "leagues",
    db,
  })) as League;

  const users: User[] = [];

  if (league) {
    await Promise.all(
      league.userIds.map(async (id) => {
        users.push(
          (await getFromFirebase({
            documentId: id,
            collectionName: FIREBASE_COLLECTIONS.PICKS,
            db,
          })) as User
        );
      })
    );
  }

  return JSON.stringify({ league, users });
};

export const uploadLeagueBackup = async ({
  leagueData,
  userPicks,
  db,
}: {
  leagueData: League;
  userPicks: SeasonPicks[];
  db: Firestore;
}): Promise<void> => {
  addToFirebase({
    firebaseEntity: leagueData,
    documentId: leagueData.id,
    collectionName: FIREBASE_COLLECTIONS.LEAGUES,
    db,
  });

  await Promise.all(
    userPicks.map(async (pick) => {
      addToFirebase({
        firebaseEntity: pick,
        documentId: pick.id,
        collectionName: FIREBASE_COLLECTIONS.PICKS,
        db,
      });
    })
  );
};
