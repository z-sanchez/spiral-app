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

const queryClient = new QueryClient();

function App() {
  const [firestoreStateData, setFirestoreData] = useRecoilState(firestoreState);

  if (import.meta.env.VITE_USE_MOCK_DATA) {
    console.log("USING MOCK DATA");
  }

  // Initialize Firebase
  const app = initializeApp(FIREBASE_CONFIGURATION);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  if (!firestoreStateData.db) {
    setFirestoreData({ db });
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <AppRoutes />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
