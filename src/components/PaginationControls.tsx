import {
  Typography,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function PaginationControls({
  page,
  handlePageChange,
  handlePageSizeChange,
  totalPageNum,
  pageSize,
  firstDisplayedItem,
  lastDisplayedItem,
  numUnpopularRepos,
}) {
  const paginationText = `Showing ${firstDisplayedItem + 1}-${Math.min(lastDisplayedItem, numUnpopularRepos)} of ${numUnpopularRepos} repositories`;

  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination
        count={totalPageNum}
        page={page}
        onChange={handlePageChange}
        color="primary"
        showFirstButton
        showLastButton
      />
      <Typography color="textSecondary" align="center">
        {paginationText}
      </Typography>
      <FormControl>
        <InputLabel id="page-size-label">Items per page</InputLabel>
        <Select
          labelId="page-size-label"
          value={pageSize}
          onChange={handlePageSizeChange}
          label="Items per page"
          variant="outlined"
          size="small"
        >
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={16}>16</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
