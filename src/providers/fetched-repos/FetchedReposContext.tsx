import { createContext } from "react";

import { Repo } from "../../types/repo";

type FetchedReposContextType = {
  repos: Repo[];
  isFetching: boolean;
  error?: Error;
};

export const FetchedReposContext = createContext<FetchedReposContextType>({
  repos: [],
  isFetching: false,
  error: undefined,
});
