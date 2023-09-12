import { atom } from "recoil";

export const authenticationState = atom({
  key: "authenticationState",
  default: { signedIn: false, authUser: {}, user: {} },
});
