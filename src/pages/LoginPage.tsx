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
import { useEffect } from "react";

const LoginPage = () => {
  const [authState, setAuthState] = useRecoilState(authenticationState);
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

  console.log({ authState });
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <h1>This is the login page</h1>
      <button onClick={handleSignIn}>Sign In Here</button>
    </div>
  );
};

export { LoginPage };
