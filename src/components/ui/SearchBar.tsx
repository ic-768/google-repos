import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeHolder,
}: SearchBarProps) {
  return (
    <div className="w-full max-w-md">
      <TextField
        fullWidth
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        slotProps={{
          input: {
            startAdornment: <SearchIcon />,
          },
        }}
      />
    </div>
  );
}
