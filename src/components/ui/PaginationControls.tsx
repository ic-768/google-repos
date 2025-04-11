import {
  Typography,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  PaginationProps,
  BaseSelectProps,
} from "@mui/material";

interface PaginationControlsProps {
  page: number;
  handlePageChange: PaginationProps["onChange"];
  handlePageSizeChange: BaseSelectProps<number>["onChange"];
  totalPageNum: number;
  pageSize: number;
  firstDisplayedItem: number;
  lastDisplayedItem: number;
  totalNumItems: number;
}
export default function PaginationControls({
  page,
  handlePageChange,
  handlePageSizeChange,
  totalPageNum,
  pageSize,
  firstDisplayedItem,
  lastDisplayedItem,
  totalNumItems,
}: PaginationControlsProps) {
  const paginationText = `Showing ${firstDisplayedItem + 1}-${Math.min(lastDisplayedItem, totalNumItems)} of ${totalNumItems} items`;

  return (
    <div className="flex">
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
      </div>
      <FormControl>
        <Select
          labelId="page-size-label"
          value={pageSize}
          onChange={handlePageSizeChange}
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
