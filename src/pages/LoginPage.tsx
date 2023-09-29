import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { getCookie } from "../utils/helpers/cookie";
import { Spinner } from "../components/Spinner";
import { ReactComponent as FieldGoalPost } from "../assets/icons/field-goal-post.svg";
import { Tabs } from "../components/Tabs";
import { FormTextField } from "../components/Form/FormTextField";
import { FormButton } from "../components/Form/FormButton";
import GoogleButton from "react-google-button";

const tabs = [
  { text: "Sign In", active: true, id: "signIn" },
  { text: "Sign Up", active: false, id: "signUp" },
];

const LoginPage = () => {
  const [tabData, setTabData] = useState(tabs);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorBannerText, setErrorBannerText] = useState("");
  const { signInUser, signInUserWithCookie, userStateLoading } = useUser();
  const [spinner, setSpinner] = useState(true);
  const firebaseAuth = getAuth();
  const activeTab = tabData.find((tab) => tab.active)?.id;

  useEffect(() => {
    const cookieValid = getCookie(import.meta.env.VITE_COOKIE);

    if (cookieValid && !userStateLoading) {
      signInUserWithCookie({ firebaseAuthUserId: cookieValid });
    }

    if (!cookieValid) {
      setSpinner(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStateLoading]);

  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    setSpinner(true);

    signInWithPopup(firebaseAuth, provider).then((result) => {
      if (result?.user) {
        const user = JSON.parse(JSON.stringify(result.user));
        signInUser({ firebaseAuthUser: { ...user } });
      } else {
        setErrorBannerText("Bad Email or Password");
      }
    });
  };

  const handleCreateAccount = () => {
    setSpinner(true);

    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        signInUser({ firebaseAuthUser: { ...user } });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log({ errorCode, errorMessage });
        setSpinner(false);
        setErrorBannerText("Bad Email or Password");
      });
  };

  const handleSignInWithEmailAndPassword = () => {
    setSpinner(true);

    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        signInUser({ firebaseAuthUser: { ...user } });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        setSpinner(false);
        setErrorBannerText("Bad Email or Password");
      });
  };

  const renderSignInPage = () => {
    return (
      <div className="flex w-full justify-start flex-col items-center py-10 px-8">
        <FormTextField
          placeholderText="Email"
          value={email}
          type="email"
          label="Email"
          onBlur={(newValue) => setEmail(newValue)}
        ></FormTextField>
        <FormTextField
          type="password"
          placeholderText="Password"
          value={password}
          label="Password"
          onBlur={(newValue) => setPassword(newValue)}
        ></FormTextField>
        <FormButton onClick={handleSignInWithEmailAndPassword} text="Sign In" />
        <p className="text-gray-400 my-5">or</p>
        <GoogleButton onClick={handleSignInWithGoogle} />
      </div>
    );
  };

  const renderSignUpPage = () => {
    return (
      <div className="flex w-full justify-start flex-col items-center py-10 px-8">
        <FormTextField
          placeholderText="Email"
          value={email}
          type="email"
          label="Email"
          onBlur={(newValue) => setEmail(newValue)}
        ></FormTextField>
        <FormTextField
          type="password"
          placeholderText="Password"
          value={password}
          label="Password"
          onBlur={(newValue) => setPassword(newValue)}
        ></FormTextField>
        <FormButton onClick={handleCreateAccount} text="Sign In" />
      </div>
    );
  };

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      {spinner || userStateLoading ? (
        <Spinner />
      ) : (
        <div className="h-full flex w-full flex-col py-10">
          <div className="w-full py-10 flex justify-center items-center">
            <FieldGoalPost className="h-8 w-8" />
            <h1 className="font-bold text-3xl text-gray-800">Spiral</h1>
          </div>
          <Tabs
            tabs={tabData}
            onTabChange={(activeTabId) => {
              setErrorBannerText("");
              setTabData((prevTabData) => {
                return prevTabData.map((tab) => {
                  return { ...tab, active: tab.id === activeTabId };
                });
              });
            }}
          />

          <div
            onClick={() => setErrorBannerText("")}
            className={
              "flex justify-center w-full transition-all" +
              (errorBannerText ? " bg-red-500" : "")
            }
          >
            <p className="font-sm py-1 text-white m-0 p-0">
              {errorBannerText ? errorBannerText : ""}
            </p>
          </div>

          {activeTab === "signIn" ? renderSignInPage() : renderSignUpPage()}
        </div>
      )}
    </div>
  );
};

export { LoginPage };
