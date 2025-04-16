import { ChangeEvent, useState } from "react";

import { useDebounce } from "../hooks/useDebounce";
import { categorizeRepos, sortRepos } from "../lib/functions";
import { Repo } from "../types/repo";
import { RepoSortingOptions } from "../types/sorting";

/**
 * A hook that manages categorizing / searching / sorting for repositories.
 * @returns An object containing:
 *  - searchTerm: The current search term.
 *  - debouncedSearchTerm: The debounced search term.
 *  - filteredRepos: The filtered list of repositories.
 *  - sortedPopularRepos: The sorted list of popular repositories.
 *  - sortedUnpopularRepos: The sorted list of unpopular repositories.
 *  - handleSearchChange: Function to handle search term changes.
 */
export const useRepoSearch = (repositories: Repo[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [sorting, setSorting] = useState<RepoSortingOptions>("stars");

  const filteredRepos = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  const { unpopularRepos, popularRepos } = categorizeRepos(filteredRepos);
  const sortedPopularRepos = sortRepos(popularRepos, sorting);
  const sortedUnpopularRepos = sortRepos(unpopularRepos, sorting);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return {
    searchTerm,
    debouncedSearchTerm,
    filteredRepos,
    sortedPopularRepos,
    sortedUnpopularRepos,
    handleSearchChange,
    sorting,
    setSorting,
  };
};
