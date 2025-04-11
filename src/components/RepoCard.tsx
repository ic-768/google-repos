import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Repo } from "../types/repo";
import { Chip, ChipProps } from "@mui/material";
import { Star } from "@mui/icons-material";
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
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
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
      <ExpandMoreButton
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMoreButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        alfjasdlkfjad alsdjas kljf lk
      </Collapse>
    </Card>
  );
}
