import { Card, CardContent, Chip, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";
import { Repo } from "../../types/repo";

interface RepoListProps {
  repos: Repo[];
  color: string;
}

export default function RepoList({ repos, color }: RepoListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {repos.map((repo) => (
        <Card key={repo.id}>
          <CardContent>
            <Typography variant="h6" component="h3">
              {repo.name}
            </Typography>
            <Chip
              icon={<Star />}
              label={repo.stargazers_count}
              color={color}
              size="small"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
