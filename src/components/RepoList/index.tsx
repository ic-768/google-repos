import { ChipProps } from "@mui/material";
import { Repo } from "../../types/repo";
import RepoCard from "../RepoCard";

interface RepoListProps {
  repos: Repo[];
  color?: ChipProps["color"];
}

export default function RepoList({ repos, color = "default" }: RepoListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 auto-rows-fr">
      {repos.map((repo) => (
        <div key={repo.id} className="h-full">
          <RepoCard repo={repo} color={color} />
        </div>
      ))}
    </div>
  );
}
