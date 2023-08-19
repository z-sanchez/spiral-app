import Container from "./components/Container";
import { router } from "./Routes";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
