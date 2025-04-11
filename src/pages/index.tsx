import { Typography, CircularProgress } from "@mui/material";

import useFetchRepos from "../hooks/useFetchRepos";
import { categorizeRepos } from "../lib/functions";
import RepoList from "../components/RepoList";
import PopularRepoList from "../components/RepoList/PopularRepoList";
import { Repo } from "../types/repo";
import PaginatedContent from "../components/ui/pagination/PaginatedContent";

export default function IndexPage() {
  const { data: repositories = [], isFetching, error } = useFetchRepos();

  const { unpopularRepos, popularRepos } = categorizeRepos(repositories);

  return (
    <div className="p-6 flex flex-col gap-8 items-center">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        GitHub Repositories
      </Typography>
      {isFetching && <CircularProgress />}
      <PopularRepoList repos={popularRepos} />

      <PaginatedContent
        items={unpopularRepos}
        renderItems={(paginatedItems: Repo[]) => (
          <RepoList repos={paginatedItems} />
        )}
      />
    </div>
  );
}
