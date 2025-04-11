import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Repo } from "../types/repo";
import { Chip, ChipProps, Link } from "@mui/material";
import { Code, Star } from "@mui/icons-material";
import ExpandMoreButton from "./ui/ExpandMoreButton";

interface RepoCardProps {
  repo: Repo;
  color?: ChipProps["color"];
}

/**
 * Expandable Repo Card
 */
export default function RepoCard({ repo, color }: RepoCardProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded((e) => !e);
  };

  // TODO clean up CSS

  return (
    <div className="relative">
      <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
        <CardContent className="pb-0">
          <div className="flex justify-between items-start mb-2">
            <Typography
              variant="h6"
              component="h3"
              className="font-medium text-gray-800"
            >
              {repo.name}
            </Typography>
            <Chip
              icon={<Star className="text-yellow-500" />}
              label={repo.stargazers_count}
              color={color}
              size="small"
              className="ml-2"
            />
          </div>
          <div className="flex">
            {repo.language && (
              <Chip
                icon={<Code className="text-blue-500" fontSize="small" />}
                label={repo.language}
                size="small"
                variant="outlined"
                className="text-xs"
              />
            )}
            <ExpandMoreButton
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              className="mt-1"
            >
              <ExpandMoreIcon />
            </ExpandMoreButton>
          </div>
        </CardContent>
      </Card>

      {expanded && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-0 shadow-xl rounded-lg overflow-hidden">
          <CardContent>
            {repo.description && (
              <div className="mb-4">
                <Typography variant="subtitle2" className="font-medium mb-1">
                  Description
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {repo.description}
                </Typography>
              </div>
            )}
            <Typography variant="subtitle2" className="font-medium mb-1">
              Repository URL
            </Typography>
            <Link
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm break-all"
            >
              {repo.html_url}
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
