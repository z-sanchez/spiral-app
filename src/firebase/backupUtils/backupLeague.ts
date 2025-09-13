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
  const userPicks: SeasonPicks[] = [];

  if (league) {
    await Promise.all(
      league.userIds.map(async (id) => {
        users.push(
          (await getFromFirebase({
            documentId: id,
            collectionName: FIREBASE_COLLECTIONS.USERS,
            db,
          })) as User
        );

        userPicks.push(
          (await getFromFirebase({
            documentId: id,
            collectionName: FIREBASE_COLLECTIONS.PICKS,
            db,
          })) as SeasonPicks
        );
      })
    );
  }

  return JSON.stringify({ league, users, picks: userPicks });
};

export const uploadLeagueBackup = async ({
  leagueData,
  userPicks,
  users,
  db,
}: {
  leagueData: League;
  userPicks: SeasonPicks[];
  users: User[];
  db: Firestore;
}): Promise<void> => {
  addToFirebase({
    firebaseEntity: leagueData,
    documentId: leagueData.id,
    collectionName: FIREBASE_COLLECTIONS.LEAGUES,
    db,
  });

  await Promise.all([
    ...userPicks.map(async (pick) => {
      await addToFirebase({
        firebaseEntity: pick,
        documentId: pick.id,
        collectionName: FIREBASE_COLLECTIONS.PICKS,
        db,
      });
    }),
    ...users.map(async (user) => {
      await addToFirebase({
        firebaseEntity: user,
        documentId: user.id,
        collectionName: FIREBASE_COLLECTIONS.USERS,
        db,
      });
    }),
  ]);
};
