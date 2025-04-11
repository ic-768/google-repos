import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IndexPage from "./pages";
import "../index.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <IndexPage />
    </QueryClientProvider>
  );
}

export default App;
