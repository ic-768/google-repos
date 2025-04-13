import { ChangeEvent, useState } from "react";
import { Typography, CircularProgress } from "@mui/material";
import useFetchRepos from "../hooks/useFetchRepos";
import { categorizeRepos, sortRepos } from "../lib/functions";
import RepoList from "../components/RepoList";
import PopularRepoList from "../components/RepoList/PopularRepoList";
import { Repo } from "../types/repo";
import PaginatedContent from "../components/ui/pagination/PaginatedContent";
import { useDebounce } from "../hooks/useDebounce";
import SearchBar from "../components/ui/SearchBar";

export default function IndexPage() {
  const { data: repositories = [], isFetching, error } = useFetchRepos();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredRepos = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  const { unpopularRepos, popularRepos } = categorizeRepos(filteredRepos);

  const sortedPopularRepos = sortRepos(popularRepos, "stars");
  const sortedUnpopularRepos = sortRepos(unpopularRepos, "alphabetic");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const pageContent = isFetching ? (
    <CircularProgress />
  ) : (
    <>
      {sortedPopularRepos.length > 0 && (
        <>
          <Typography variant="h5" component="h2" gutterBottom>
            Popular Repositories
          </Typography>
          <PopularRepoList repos={sortedPopularRepos} />
        </>
      )}

      {sortedUnpopularRepos.length > 0 && (
        <>
          <Typography variant="h5" component="h2" gutterBottom>
            Other Repositories
          </Typography>
          <PaginatedContent
            items={sortedUnpopularRepos}
            renderItems={(paginatedItems: Repo[]) => (
              <RepoList repos={paginatedItems} />
            )}
          />
        </>
      )}

      {filteredRepos.length === 0 && (
        <Typography variant="body1">
          No repositories found matching "{debouncedSearchTerm}"
        </Typography>
      )}
    </>
  );

  return (
    <div className="p-6 flex flex-col gap-8 items-center w-full max-w-6xl mx-auto">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        GitHub Repositories
      </Typography>
      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeHolder="Search repositories..."
      />
      {pageContent}
    </div>
  );
}
