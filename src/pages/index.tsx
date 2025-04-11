import { Typography, CircularProgress } from "@mui/material";

import useFetchRepos from "../hooks/useFetchRepos";
import { usePageNavigation } from "../hooks/usePageNavigation";
import { categorizeRepos } from "../lib/functions";
import RepoList from "../components/RepoList";
import PopularRepoList from "../components/RepoList/PopularRepoList";
import PaginationControls from "../components/ui/PaginationControls";

export default function IndexPage() {
  const { data: repositories = [], isFetching, error } = useFetchRepos();

  const {
    page,
    handlePageChange,
    handlePageSizeChange,
    totalPageNum,
    pageSize,
    firstDisplayedItem,
    lastDisplayedItem,
  } = usePageNavigation({
    defaultPageSize: 8,
    totalResults: repositories.length,
  });

  const { unpopularRepos, popularRepos } = categorizeRepos(repositories);

  const paginatedUnpopularRepos = unpopularRepos.slice(
    firstDisplayedItem,
    lastDisplayedItem,
  );

  const numUnpopularRepos = unpopularRepos.length;

  return (
    <div className="p-6 flex flex-col gap-8 items-center">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        GitHub Repositories
      </Typography>
      {isFetching && <CircularProgress />}
      <PopularRepoList repos={popularRepos} />
      <RepoList repos={paginatedUnpopularRepos} />
      <PaginationControls
        totalNumItems={numUnpopularRepos}
        page={page}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
        totalPageNum={totalPageNum}
        pageSize={pageSize}
        firstDisplayedItem={firstDisplayedItem}
        lastDisplayedItem={lastDisplayedItem}
      />
    </div>
  );
}
