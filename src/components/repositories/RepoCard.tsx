import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chip, ChipProps, Link } from "@mui/material";
import { Code, Star } from "@mui/icons-material";
import { useState } from "react";
import { Repo } from "../../types/repo";
import ExpandMoreButton from "../ui/ExpandMoreButton";

interface RepoCardProps {
  repo: Repo;
  color?: ChipProps["color"];
}

/**
 * Expandable Repo Card
 */
export default function RepoCard({ repo, color }: RepoCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded((e) => !e);
  };

  return (
    <div className="relative h-full">
      <Card className="h-full">
        <CardContent>
          <div className="flex justify-between items-start gap-2">
            <Typography variant="h6">{repo.name}</Typography>
            <Chip
              icon={<Star />}
              label={repo.stargazers_count}
              color={color}
              size="small"
            />
          </div>
          <div className="flex items-center">
            {repo.language && (
              <Chip
                icon={<Code />}
                label={repo.language}
                size="small"
                variant="outlined"
              />
            )}
            <ExpandMoreButton
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="expand"
              className="!absolute right-0 bottom-4"
            >
              <ExpandMoreIcon />
            </ExpandMoreButton>
          </div>
        </CardContent>
      </Card>

      {expanded && (
        <Card className="absolute z-10 rounded-b-lg">
          <CardContent className="flex flex-col gap-2">
            {repo.description && (
              <Typography variant="body2">{repo.description}</Typography>
            )}
            <Link
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {repo.html_url}
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
