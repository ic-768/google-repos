import { useQuery } from "@tanstack/react-query";
import { fetchGoogleRepos } from "../api/repos";
import { cacheTimeLong } from "../lib/constants";

/**
 * Hook to fetch the list of Google repositories from the GitHub API.
 * I've set it to cache the results for 24 hours so I don't call the API needlessly, but in a real world scenario the duration would probably be much shorter.
 */
export default function useFetchRepos() {
  return useQuery({
    queryKey: ["repos"],
    queryFn: () => fetchGoogleRepos(),
    staleTime: cacheTimeLong,
  });
}
