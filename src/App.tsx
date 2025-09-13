import Container from "./components/Container";
import { AppRoutes } from "./Routes";
import { QueryClientProvider, QueryClient } from "react-query";
// Required for side-effects
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_CONFIGURATION } from "./utils/constants";
import { useRecoilState } from "recoil";
import { firestoreState } from "./state/FirestoreState";
import { useEffect } from "react";
import { backupLeague } from "./firebase/backupUtils/backupLeague";
import { uploadLeagueBackup } from "./firebase/backupUtils/backupLeague";
import testingLeague from "./prod-env-backup-sep-13.json";

const queryClient = new QueryClient();

function App() {
  const [firestoreStateData, setFirestoreData] = useRecoilState(firestoreState);

  // Initialize Firebase
  const app = initializeApp(FIREBASE_CONFIGURATION);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  if (!firestoreStateData.db) {
    // backupLeague({ leagueId: "", db }).then((data) =>
    //   console.log(data)
    // );
    // uploadLeagueBackup({
    //   leagueData: testingLeague.league,
    //   userPicks: testingLeague.picks,
    //   users: testingLeague.users,
    //   db,
    // });
    setFirestoreData({ db });
  }

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Container>{/* <AppRoutes /> */}</Container>
    </QueryClientProvider>
  );
}

export default App;
