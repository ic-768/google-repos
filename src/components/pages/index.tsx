import { useEffect } from "react";
import { toast } from "react-toastify";
import { CircularProgress, Typography } from "@mui/material";

import useFetchRepos from "../../hooks/useFetchRepos";
import { useRepoSearch } from "../../hooks/useRepoSearch";
import RepoList from "../repositories/RepoList";
import PopularRepoList from "../repositories/RepoList/PopularRepoList";
import PaginatedContent from "../ui/pagination/PaginatedContent";
import SearchBar from "../ui/SearchBar";
import ToggleOptions from "../ui/ToggleOptions";

export default function IndexPage() {
  const { data: repositories = [], isFetching, error } = useFetchRepos();

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong while fetching repositories.");
    }
  }, [error]);

  const {
    searchTerm,
    debouncedSearchTerm,
    filteredRepos,
    sortedPopularRepos,
    sortedUnpopularRepos,
    handleSearchChange,
    sorting,
    setSorting,
  } = useRepoSearch(repositories);

  const noResults = filteredRepos.length === 0 && debouncedSearchTerm !== "";

  const hasPopularRepos = sortedPopularRepos.length > 0;
  const hasUnpopularRepos = sortedUnpopularRepos.length > 0;

  return (
    <main className="flex w-full max-w-7xl flex-col items-center gap-8 p-6">
      <Typography variant="h4">GitHub Repositories</Typography>

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeHolder="Search repositories..."
      />

      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          <ToggleOptions
            value={sorting}
            setValue={setSorting}
            options={[
              { label: "stars", value: "stars" },
              { label: "alphabetic", value: "alphabetic" },
            ]}
          />

          {hasPopularRepos && (
            <>
              <Typography variant="h5">Popular Repositories</Typography>
              <PopularRepoList repos={sortedPopularRepos} />
            </>
          )}

          {hasUnpopularRepos && (
            <>
              <Typography variant="h5">Other Repositories</Typography>
              <PaginatedContent
                items={sortedUnpopularRepos}
                renderItems={(paginatedItems) => (
                  <RepoList repos={paginatedItems} />
                )}
              />
            </>
          )}

          {noResults && (
            <Typography>
              No repositories found matching &quot;{searchTerm}&quot;
            </Typography>
          )}
        </>
      )}
    </main>
  );
}
