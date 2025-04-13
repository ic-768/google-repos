import { Typography, CircularProgress } from "@mui/material";
import useFetchRepos from "../hooks/useFetchRepos";
import RepoList from "../components/RepoList";
import PopularRepoList from "../components/RepoList/PopularRepoList";
import { Repo } from "../types/repo";
import PaginatedContent from "../components/ui/pagination/PaginatedContent";
import SearchBar from "../components/ui/SearchBar";
import { useRepoSearch } from "../hooks/useRepoSearch";

export default function IndexPage() {
  const { data: repositories = [], isFetching, error } = useFetchRepos();

  const {
    searchTerm,
    debouncedSearchTerm,
    filteredRepos,
    sortedPopularRepos,
    sortedUnpopularRepos,
    handleSearchChange,
  } = useRepoSearch(repositories);

  const pageContent = isFetching ? (
    <CircularProgress />
  ) : (
    <>
      {sortedPopularRepos.length > 0 && (
        <>
          <Typography variant="h5">Popular Repositories</Typography>
          <PopularRepoList repos={sortedPopularRepos} />
        </>
      )}

      {sortedUnpopularRepos.length > 0 && (
        <>
          <Typography variant="h5">Other Repositories</Typography>
          <PaginatedContent
            items={sortedUnpopularRepos}
            renderItems={(paginatedItems: Repo[]) => (
              <RepoList repos={paginatedItems} />
            )}
          />
        </>
      )}

      {filteredRepos.length === 0 && (
        <Typography>
          No repositories found matching "{debouncedSearchTerm}"
        </Typography>
      )}
    </>
  );

  return (
    <div className="p-6 flex flex-col gap-8 items-center w-full max-w-7xl">
      <Typography variant="h4">GitHub Repositories</Typography>
      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeHolder="Search repositories..."
      />
      {pageContent}
    </div>
  );
}
