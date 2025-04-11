import { useQuery } from "@tanstack/react-query";
import { fetchGoogleRepos } from "../api/repos";
import { cacheTimeLong } from "../lib/constants";

export default function useFetchRepos() {
  return useQuery({
    queryKey: ["repos"],
    queryFn: () => fetchGoogleRepos(),
    staleTime: cacheTimeLong,
  });
}
