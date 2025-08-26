import { atom } from "recoil";
import { User as FirebaseUser } from "firebase/auth";
import { User } from "../types/Firebase";

const defaultAuthState: {
  signedIn: boolean;
  authUser: FirebaseUser | null;
  user: User | null;
} = {
  signedIn: false,
  authUser: null,
  user: null,
};

export const authenticationState = atom({
  key: "authenticationState",
  default: defaultAuthState,
});
