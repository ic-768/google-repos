import { Typography, CircularProgress } from "@mui/material";

import useFetchRepos from "../hooks/useFetchRepos";
import { categorizeRepos, sortRepos } from "../lib/functions";
import RepoList from "../components/RepoList";
import PopularRepoList from "../components/RepoList/PopularRepoList";
import { Repo } from "../types/repo";
import PaginatedContent from "../components/ui/pagination/PaginatedContent";
import { useState } from "react";
import ToggleOptions from "../components/ui/ToggleOptions";

export default function IndexPage() {
  // TODO show an error toast if there is an error
  const { data: repositories = [], isFetching, error } = useFetchRepos();
  const [sort, setSort] = useState<"stars" | "alphabetic">("stars");

  const { unpopularRepos, popularRepos } = categorizeRepos(repositories);

  const sortedPopularRepos = sortRepos(popularRepos, sort);
  const sortedUnpopularRepos = sortRepos(unpopularRepos, sort);

  const pageContent = isFetching ? (
    <CircularProgress />
  ) : (
    <>
      <ToggleOptions
        value={sort}
        setValue={setSort}
        options={[
          { label: "Sort by Stars", value: "stars" },
          { label: "Sort A–Z", value: "alphabetic" },
        ]}
      />
      <PopularRepoList repos={sortedPopularRepos} />
      <PaginatedContent
        items={sortedUnpopularRepos}
        renderItems={(paginatedItems: Repo[]) => (
          <RepoList repos={paginatedItems} />
        )}
      />
    </>
  );

  return (
    <div className="p-6 flex flex-col gap-8 items-center">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        GitHub Repositories
      </Typography>
      {pageContent}
    </div>
  );
}
