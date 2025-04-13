import { Typography, CircularProgress } from "@mui/material";
import useFetchRepos from "../../hooks/useFetchRepos";
import PaginatedContent from "../../components/ui/pagination/PaginatedContent";
import SearchBar from "../../components/ui/SearchBar";
import { useRepoSearch } from "../../hooks/useRepoSearch";
import PopularRepoList from "../../components/repositories/RepoList/PopularRepoList";
import RepoList from "../../components/repositories/RepoList";
import { Repo } from "../../types/repo";

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

  const showNoResults =
    filteredRepos.length === 0 && debouncedSearchTerm !== "";

  return (
    <div className="p-6 flex flex-col gap-8 items-center w-full max-w-7xl">
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
          <PopularReposSection repos={sortedPopularRepos} />
          <OtherReposSection repos={sortedUnpopularRepos} />
          <NoResultsMessage
            searchTerm={debouncedSearchTerm}
            show={showNoResults}
          />
        </>
      )}
    </div>
  );
}

const PopularReposSection = ({ repos }: { repos: Repo[] }) => {
  if (repos.length === 0) return null;

  return (
    <>
      <Typography variant="h5">Popular Repositories</Typography>
      <PopularRepoList repos={repos} />
    </>
  );
};

const OtherReposSection = ({ repos }: { repos: Repo[] }) => {
  if (repos.length === 0) return null;

  return (
    <>
      <Typography variant="h5">Other Repositories</Typography>
      <PaginatedContent
        items={repos}
        renderItems={(paginatedItems) => <RepoList repos={paginatedItems} />}
      />
    </>
  );
};

interface NoResultsMessageProps {
  searchTerm: string;
  show: boolean;
}
const NoResultsMessage = ({ searchTerm, show }: NoResultsMessageProps) => {
  if (!show) return null;

  return <Typography>No repositories found matching "{searchTerm}"</Typography>;
};
