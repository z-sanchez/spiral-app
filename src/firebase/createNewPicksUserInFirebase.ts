import { Firestore } from "firebase/firestore";
import { League, User } from "../types/Firebase";
import { createDefaultPicksObject } from "../utils/helpers/firebase/picks";
import { addToFirebase } from "./addToFirebase";
import { FIREBASE_COLLECTIONS } from "../utils/constants";
import { updateInFirebase } from "./updateInFirebase";
import { getFromFirebase } from "./getFromFirebase";

export const createNewPickDocInFirebase = async ({
  user,
  db,
}: {
  user: User;
  db: Firestore;
}) => {
  const defaultPickObject = createDefaultPicksObject(user);

  addToFirebase({
    firebaseEntity: defaultPickObject,
    documentId: user.id,
    collectionName: FIREBASE_COLLECTIONS.PICKS,
    db,
  });

  const savedLeague = (await getFromFirebase({
    documentId: "1CgEQaLpYa8t0mj0IaSc",
    collectionName: FIREBASE_COLLECTIONS.LEAGUES,
    db,
  })) as League;

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

  updateInFirebase({
    updatedDocFields: { ...updatedLeague },
    documentId: "1CgEQaLpYa8t0mj0IaSc",
    collectionName: FIREBASE_COLLECTIONS.LEAGUES,
    db,
  });
};
