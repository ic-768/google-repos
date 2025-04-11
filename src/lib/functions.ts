import { Repo } from "../types/repo";

/**
 * Categorize repositories into popular and unpopular.
 */
export function categorizeRepos(repositories: Repo[]) {
  const [unpopularRepos, popularRepos] = repositories.reduce<Repo[][]>(
    ([unpopular, popular], repo) => {
      if (repo.stargazers_count > 1000) {
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
