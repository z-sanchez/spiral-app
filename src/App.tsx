import Container from "./components/Container";
import { HomePage } from "./pages/HomePage";
import { ScorePage } from "./pages/ScorePage";
import { router } from "./Routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
