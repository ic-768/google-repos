import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface SortToggleProps {
  sort: "stars" | "alphabetic";
  setSort: (value: "stars" | "alphabetic") => void;
}

export default function SortToggle({ sort, setSort }: SortToggleProps) {
  return (
    <ToggleButtonGroup
      value={sort}
      exclusive
      onChange={(_, newValue) => {
        setSort(newValue);
      }}
      size="small"
    >
      <ToggleButton value="stars">Sort by Stars</ToggleButton>
      <ToggleButton value="alphabetic">Sort A–Z</ToggleButton>
    </ToggleButtonGroup>
  );
}
