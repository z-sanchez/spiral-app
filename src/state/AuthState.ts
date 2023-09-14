import { atom } from "recoil";
import { User } from "../types/User";
import { User as firebaseUser } from "firebase/auth";

const defaultAuthState: {
  signedIn: boolean;
  authUser: object | firebaseUser;
  user: object | User;
} = {
  signedIn: false,
  authUser: {},
  user: {},
};

export const authenticationState = atom({
  key: "authenticationState",
  default: defaultAuthState,
});
