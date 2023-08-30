import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { useRecoilState } from "recoil";
import { authenticationState } from "../state/AuthState";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [authState, setAuthState] = useRecoilState(authenticationState);
  const [spinner, setSpinner] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();

  getRedirectResult(auth).then((result) => {
    if (result?.user) {
      const user = JSON.parse(JSON.stringify(result.user));
      setAuthState({ ...user, signedIn: true });
    }
  });

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  useEffect(() => {
    if (authState.signedIn) navigate("/");
  }, [authState, navigate]);

  onAuthStateChanged(auth, (user) => {
    setSpinner(false);
  });

  console.log({ authState });
  return spinner ? (
    <p>loading</p>
  ) : (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <h1>This is the login page</h1>
      <button onClick={handleSignIn}>Sign In Here</button>
    </div>
  );
};

export { LoginPage };
