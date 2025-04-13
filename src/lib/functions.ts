import { Repo } from "../types/repo";
import { RepoSortingOptions } from "../types/sorting";

const REPO_POPULARITY_THRESHOLD = 1000;

/**
 * Categorize repositories into popular and unpopular.
 */
export function categorizeRepos(repositories: Repo[]) {
  const [unpopularRepos, popularRepos] = repositories.reduce<Repo[][]>(
    ([unpopular, popular], repo) => {
      if (repo.stargazers_count > REPO_POPULARITY_THRESHOLD) {
        popular.push(repo);
      } else {
        unpopular.push(repo);
      }
      return [unpopular, popular];
    },
    [[], []],
  );

  return { unpopularRepos, popularRepos };
}

/**
 * Sort repositories either alphabetically or by stars.
 * Default: alphabetically
 * @param repos Repos to sort
 * @param mode Sort mode
 */
export function sortRepos(
  repos: Repo[],
  mode: RepoSortingOptions = "alphabetic",
) {
  return mode === "alphabetic"
    ? repos.sort()
    : repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
}
