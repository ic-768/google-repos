import { use } from "react";

import { FetchedReposContext } from "./FetchedReposContext";

export const useFetchedRepos = () => {
  const context = use(FetchedReposContext);

  return context;
};
