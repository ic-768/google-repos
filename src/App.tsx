import { ToastContainer } from "react-toastify";

import IndexPage from "./components/pages";
import { FetchedReposProvider } from "./providers/fetched-repos/FetchedReposProvider";

import "../index.css";

function App() {
  return (
    <FetchedReposProvider>
      <ToastContainer />
      <IndexPage />
    </FetchedReposProvider>
  );
}

export default App;
