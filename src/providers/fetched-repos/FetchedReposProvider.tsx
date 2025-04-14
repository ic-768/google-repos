import { ReactNode, useEffect, useState } from "react";

import { fetchGoogleRepos } from "../../api/repos";
import { Repo } from "../../types/repo";
import { FetchedReposContext } from "./FetchedReposContext";

export const FetchedReposProvider = ({ children }: { children: ReactNode }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const loadRepos = async () => {
      setIsFetching(true);
      setError(undefined);
      try {
        const data = await fetchGoogleRepos();
        setRepos(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
          setError(err);
        } else {
          console.log(err);
        }
      } finally {
        setIsFetching(false);
      }
    };

    // don't call loadRepos if we already have repos ( caching )
    if (!repos.length) {
      loadRepos();
    }
  }, [repos]);

  return (
    <FetchedReposContext value={{ repos, isFetching, error }}>
      {children}
    </FetchedReposContext>
  );
};
