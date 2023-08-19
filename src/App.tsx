import Container from "./components/Container";
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
