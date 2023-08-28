import Container from "./components/Container";
import { router } from "./Routes";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_CONFIGURATION } from "./utils/constants";
import { collection, addDoc } from "firebase/firestore";

const queryClient = new QueryClient();

function App() {
  // Initialize Firebase
  const app = initializeApp(FIREBASE_CONFIGURATION);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  console.log({ db });

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
