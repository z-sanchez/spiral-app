import Container from "./components/Container";
// import { AppRoutes } from "./Routes";
import { QueryClientProvider, QueryClient } from "react-query";
// Required for side-effects
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_CONFIGURATION } from "./utils/constants";
import { useRecoilState } from "recoil";
import { firestoreState } from "./state/FirestoreState";
import { logUserPicks } from "./firebase/logUserPicks";

const queryClient = new QueryClient();

function App() {
  const [firestoreStateData, setFirestoreData] = useRecoilState(firestoreState);

  // Initialize Firebase
  const app = initializeApp(FIREBASE_CONFIGURATION);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  if (!firestoreStateData.db) {
    logUserPicks(db);
    setFirestoreData({ db });
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <h1>Testing</h1>
        {/* <AppRoutes /> */}
      </Container>
    </QueryClientProvider>
  );
}

export default App;
