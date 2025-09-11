import { authenticationState } from "../state/AuthState";
import { useSetRecoilState } from "recoil";
import { getAuth, signOut } from "firebase/auth";
import { setCookie } from "../utils/helpers/cookie";
import { ReactComponent as LogoutIcon } from "../assets/icons/logout.svg";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";

export const JoinLeaguePage = () => {
  const setAuthState = useSetRecoilState(authenticationState);
  const { addUserToLeague } = useUser();

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const league = params.get("league");
    const key = params.get("key");

    if (league && key) {
      addUserToLeague({ leagueId: league, key: key });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      setCookie(import.meta.env.VITE_COOKIE, "", 365);
      setAuthState({ signedIn: false, authUser: null, user: null });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 px-5 text-center">
      <h1>
        This account is not linked to any league. You must be sent a link by
        your league's administrator to join. 🤪
      </h1>
      <LogoutIcon onClick={handleSignOut} />
    </div>
  );
};
