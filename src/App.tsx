import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../index.css";
import IndexPage from "./components/pages";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <IndexPage />
    </QueryClientProvider>
  );
}

export default App;
