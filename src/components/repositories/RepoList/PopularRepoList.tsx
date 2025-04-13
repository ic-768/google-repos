import { useState } from "react";
import RepoList from ".";
import { Repo } from "../../../types/repo";

export default function PopularRepoList({ repos }: { repos: Repo[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleShowMore = () => {
    setIsExpanded((prev) => !prev);
  };

  const initialVisible = 5;
  const numVisibleRepos = isExpanded ? repos.length : initialVisible;
  const buttonText = isExpanded ? "Show Less" : "Show More";

  return (
    <div className="w-full">
      <RepoList repos={repos.slice(0, numVisibleRepos)} color="primary" />
      <button onClick={handleToggleShowMore} className="mt-4 text-blue-500">
        {buttonText}
      </button>
    </div>
  );
}
