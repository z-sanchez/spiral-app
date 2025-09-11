import { Firestore } from "firebase/firestore";
import { League, User } from "../types/Firebase";
import { createDefaultPicksObject } from "../utils/helpers/firebase/picks";
import { addToFirebase } from "./addToFirebase";
import { FIREBASE_COLLECTIONS } from "../utils/constants";
import { updateInFirebase } from "./updateInFirebase";
import { getFromFirebase } from "./getFromFirebase";
import { SeasonPicks } from "../types/Picks";

export const createNewPickDocInFirebase = async ({
  user,
  db,
  leagueId,
  leagueKey,
}: {
  user: User;
  db: Firestore;
  leagueId: string;
  leagueKey: string;
}) => {
  const savedLeague = (await getFromFirebase({
    documentId: leagueId,
    collectionName: FIREBASE_COLLECTIONS.LEAGUES,
    db,
  })) as League;

  if (!savedLeague || savedLeague.key !== leagueKey) return;

  const defaultPickObject: SeasonPicks = createDefaultPicksObject(user);

  addToFirebase({
    firebaseEntity: defaultPickObject,
    documentId: user.id,
    collectionName: FIREBASE_COLLECTIONS.PICKS,
    db,
  });

  const updatedLeague: League = {
    ...savedLeague,
    userIds: [...savedLeague.userIds, user.id],
    currentWeekStandings: [
      ...savedLeague.currentWeekStandings,
      {
        id: user.id,
        name: user.username,
        record: { wins: 0, losses: 0, ties: 0 },
        winningPercentage: 0,
        rank: 0,
        color: user.color,
      },
    ],
    allTimeStandings: [
      ...savedLeague.allTimeStandings,
      {
        id: user.id,
        name: user.username,
        record: { wins: 0, losses: 0, ties: 0 },
        winningPercentage: 0,
        gamesBack: 0,
        rank: 0,
        emblemStatus: [],
        color: user.color,
      },
    ],
  };

  const updatedUser: User = {
    ...user,
    leagueId,
  };

  updateInFirebase({
    updatedDocFields: { ...updatedLeague },
    documentId: leagueId,
    collectionName: FIREBASE_COLLECTIONS.LEAGUES,
    db,
  });

  updateInFirebase({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    updatedDocFields: { ...updatedUser },
    documentId: user.id,
    collectionName: FIREBASE_COLLECTIONS.USERS,
    db,
  });

  return leagueId;
};
