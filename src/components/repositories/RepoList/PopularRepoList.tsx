import { useState } from "react";

import { Repo } from "../../../types/repo";
import RepoList from ".";

const NUM_INITIAL_VISIBLE_REPOS = 5;

export default function PopularRepoList({ repos }: { repos: Repo[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleShowMore = () => {
    setIsExpanded((prev) => !prev);
  };

  const numVisibleRepos = isExpanded ? repos.length : NUM_INITIAL_VISIBLE_REPOS;
  const buttonText = isExpanded ? "Show Less" : "Show More";

  return (
    <div className="w-full">
      <RepoList repos={repos.slice(0, numVisibleRepos)} color="primary" />
      {repos.length > NUM_INITIAL_VISIBLE_REPOS && (
        <button onClick={handleToggleShowMore} className="mt-4 text-blue-500">
          {buttonText}
        </button>
      )}
    </div>
  );
}
