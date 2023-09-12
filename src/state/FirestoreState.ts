import { Firestore } from "firebase/firestore";
import { atom } from "recoil";

const firestoreStateDefault: { db: null | Firestore } = {
  db: null,
};

export const firestoreState = atom({
  key: "firestoreState",
  default: firestoreStateDefault,
  dangerouslyAllowMutability: true,
});
